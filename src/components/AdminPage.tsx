import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RSVPRow, InviteLinkRow } from '../types';

// Cast avoids depending on a vite-env.d.ts ambient declaration for import.meta.env.
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
const ADMIN_PASSWORD = env.VITE_ADMIN_PASSWORD ?? '';
const ADMIN_SESSION_KEY = 'admin_authed';

function toInviteSlug(name: string): string {
  const noDiacritics = name
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  return noDiacritics
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}

const ATTENDANCE_LABEL: Record<RSVPRow['attendance'], string> = {
  yes: 'Chắc chắn đến',
  maybe: 'Chưa chắc chắn',
  no: 'Không thể đến',
};

const SIDE_LABEL: Record<RSVPRow['invited_by'], string> = {
  groom: 'Nhà trai',
  bride: 'Nhà gái',
  both: 'Bạn chung',
};

function companionsLabel(companions: string): string {
  return companions === 'family' ? 'Cả gia đình' : companions;
}

function RSVPDetailModal({ row, onClose }: { row: RSVPRow; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-sm w-full border border-[#7A121D]/20 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-[#7A121D]">{row.name}</h3>
          <button
            onClick={onClose}
            className="text-[#8C7377] hover:text-[#7A121D] text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-[#8C7377] block text-xs mb-0.5">Khách mời của</span>
            <span className="text-[#2D1217]">{SIDE_LABEL[row.invited_by]}</span>
          </div>
          <div>
            <span className="text-[#8C7377] block text-xs mb-0.5">Số người tham dự cùng</span>
            <span className="text-[#2D1217]">{companionsLabel(row.companions)}</span>
          </div>
          <div>
            <span className="text-[#8C7377] block text-xs mb-0.5">Lời chúc</span>
            <span className="text-[#2D1217]">{row.wishes || '-'}</span>
          </div>
          <div>
            <span className="text-[#8C7377] block text-xs mb-0.5">Thời gian</span>
            <span className="text-[#2D1217]">{new Date(row.created_at).toLocaleString('vi-VN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RSVPListTab() {
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<RSVPRow | null>(null);

  useEffect(() => {
    supabase
      .from('rsvps')
      .select('id, name, wishes, attendance, companions, invited_by, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRows((data as RSVPRow[]) ?? []);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-sm text-[#8C7377] py-6 text-center">Đang tải...</p>;
  if (error) return <p className="text-sm text-red-600 py-6 text-center">Lỗi tải dữ liệu: {error}</p>;
  if (rows.length === 0) return <p className="text-sm text-[#8C7377] py-6 text-center">Chưa có ai điền form.</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-[#7A121D] border-b border-[#7A121D]/20">
              <th className="py-2 pr-4 font-semibold">Tên</th>
              <th className="py-2 pr-4 font-semibold">Xác nhận</th>
              <th className="py-2 pr-4 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#7A121D]/10">
                <td className="py-2 pr-4 max-w-35 truncate" title={row.name}>{row.name}</td>
                <td className="py-2 pr-4 whitespace-nowrap">{ATTENDANCE_LABEL[row.attendance]}</td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedRow(row)}
                    className="px-3 py-1 rounded-full border border-[#7A121D]/30 text-[#7A121D] text-xs font-semibold hover:bg-[#7A121D]/10 transition-colors"
                  >
                    Xem thêm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow && <RSVPDetailModal row={selectedRow} onClose={() => setSelectedRow(null)} />}
    </>
  );
}

function OverviewTab() {
  const [name, setName] = useState('');
  const [links, setLinks] = useState<InviteLinkRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('invite_links')
      .select('id, name, slug, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setLinks((data as InviteLinkRow[]) ?? []);
        setIsLoading(false);
      });
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsCreating(true);
    setError(null);

    const baseSlug = toInviteSlug(trimmed);
    const existingSlugs = new Set(links.map((link) => link.slug));
    let slug = baseSlug;
    let suffix = 2;
    while (existingSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const { data, error } = await supabase
      .from('invite_links')
      .insert({ name: trimmed, slug })
      .select('id, name, slug, created_at')
      .single();

    if (error) {
      setError(error.message);
    } else if (data) {
      setLinks((prev) => [data as InviteLinkRow, ...prev]);
      setName('');
    }
    setIsCreating(false);
  };

  const handleCopy = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug((current) => (current === slug ? null : current)), 1500);
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('invite_links').delete().eq('id', id);
    if (error) setError(error.message);
    else setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nhập tên khách mời (Ví dụ: Hạ Vy)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-10 px-4 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-sm text-[#2D1217] placeholder:text-[#8C7377] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40"
        />
        <button
          type="submit"
          disabled={isCreating || !name.trim()}
          className="h-10 px-5 rounded-xl bg-[#7A121D] hover:bg-[#600D16] disabled:opacity-50 text-white font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Tạo Link
        </button>
      </form>

      {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

      {isLoading ? (
        <p className="text-sm text-[#8C7377] py-6 text-center">Đang tải...</p>
      ) : links.length === 0 ? (
        <p className="text-sm text-[#8C7377] py-6 text-center">Chưa có link nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-[#7A121D] border-b border-[#7A121D]/20">
                <th className="py-2 pr-4 font-semibold">Tên</th>
                <th className="py-2 pr-4 font-semibold">Link</th>
                <th className="py-2 pr-4 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b border-[#7A121D]/10">
                  <td className="py-2 pr-4 max-w-35 truncate" title={link.name}>{link.name}</td>
                  <td className="py-2 pr-4 text-[#8C7377] break-all">
                    {window.location.origin}/{link.slug}
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(link.slug)}
                        className="px-3 py-1 rounded-full border border-[#7A121D]/30 text-[#7A121D] text-xs font-semibold hover:bg-[#7A121D]/10 transition-colors whitespace-nowrap"
                      >
                        {copiedSlug === link.slug ? 'Đã copy!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="px-3 py-1 rounded-full border border-red-600/30 text-red-600 text-xs font-semibold hover:bg-red-600/10 transition-colors whitespace-nowrap"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-white rounded-2xl p-6 border border-[#7A121D]/20 shadow-lg space-y-3"
      >
        <h1 className="font-display text-lg font-bold text-[#7A121D] text-center">Nhập mật khẩu</h1>
        <input
          type="password"
          autoFocus
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="w-full h-10 px-4 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-sm text-[#2D1217] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40"
        />
        {error && <p className="text-xs text-red-600">Sai mật khẩu.</p>}
        <button
          type="submit"
          className="w-full h-10 rounded-xl bg-[#7A121D] hover:bg-[#600D16] text-white font-semibold text-sm transition-colors"
        >
          Vào
        </button>
      </form>
    </main>
  );
}

export function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1');
  const [activeTab, setActiveTab] = useState<'overview' | 'rsvps'>('rsvps');

  if (!isAuthed) return <PasswordGate onSuccess={() => setIsAuthed(true)} />;

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-2xl font-bold text-[#7A121D] mb-6">Trang Quản Trị</h1>

        <div role="tablist" className="flex gap-2 border-b border-[#7A121D]/20 mb-6">
          <button
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#7A121D] text-[#7A121D]'
                : 'border-transparent text-[#8C7377] hover:text-[#7A121D]'
            }`}
          >
            Tạo Link Mời
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'rsvps'}
            onClick={() => setActiveTab('rsvps')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'rsvps'
                ? 'border-[#7A121D] text-[#7A121D]'
                : 'border-transparent text-[#8C7377] hover:text-[#7A121D]'
            }`}
          >
            Danh Sách Xác Nhận
          </button>
        </div>

        <div role="tabpanel">
          {activeTab === 'overview' ? <OverviewTab /> : <RSVPListTab />}
        </div>
      </div>
    </main>
  );
}
