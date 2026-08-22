import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RSVPRow } from '../types';

// Cast avoids depending on a vite-env.d.ts ambient declaration for import.meta.env.
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
const ADMIN_PASSWORD = env.VITE_ADMIN_PASSWORD ?? '';
const ADMIN_SESSION_KEY = 'admin_authed';

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

function RSVPListTab() {
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-[#7A121D] border-b border-[#7A121D]/20">
            <th className="py-2 pr-4 font-semibold">Tên</th>
            <th className="py-2 pr-4 font-semibold">Tham dự</th>
            <th className="py-2 pr-4 font-semibold">Số người</th>
            <th className="py-2 pr-4 font-semibold">Khách của</th>
            <th className="py-2 pr-4 font-semibold">Lời chúc</th>
            <th className="py-2 pr-4 font-semibold">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#7A121D]/10">
              <td className="py-2 pr-4 whitespace-nowrap">{row.name}</td>
              <td className="py-2 pr-4 whitespace-nowrap">{ATTENDANCE_LABEL[row.attendance]}</td>
              <td className="py-2 pr-4 whitespace-nowrap">{row.companions}</td>
              <td className="py-2 pr-4 whitespace-nowrap">{SIDE_LABEL[row.invited_by]}</td>
              <td className="py-2 pr-4 max-w-xs">{row.wishes || '-'}</td>
              <td className="py-2 pr-4 whitespace-nowrap text-[#8C7377]">
                {new Date(row.created_at).toLocaleString('vi-VN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <h1 className="font-display text-2xl font-bold text-[#7A121D] mb-6">Quản Trị</h1>

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
            Tổng Quan
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
            Danh Sách RSVP
          </button>
        </div>

        <div role="tabpanel">
          {activeTab === 'overview' ? null : <RSVPListTab />}
        </div>
      </div>
    </main>
  );
}
