import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import { WishMessage, WishRow } from '../types';
import confetti from 'canvas-confetti';
import { Send, Heart, CheckCircle2, MessageSquare, User, Sparkles } from 'lucide-react';
import { BurgundyCallaLily, WhitePaperFlower3D } from './FloralDecor';
import { fadeSoft, fadeUp, fadeUpTitle, viewportRepeat } from './motion/Reveal';
import { supabase } from '../lib/supabaseClient';

function formatRelativeTime(iso: string): string {
  const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} giờ trước`;
  return `${Math.floor(diffHour / 24)} ngày trước`;
}

export function RSVPSection({ prefillName }: { prefillName?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    wishes: '',
    attendance: 'yes' as 'yes' | 'no' | 'maybe',
    companions: '0',
    invitedBy: 'both' as 'groom' | 'bride' | 'both',
  });

  const [wishesList, setWishesList] = useState<WishMessage[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill the guest's name when they open a personalized invite link.
  useEffect(() => {
    if (prefillName) {
      setFormData((prev) => (prev.name ? prev : { ...prev, name: prefillName }));
    }
  }, [prefillName]);

  // Load the shared guestbook wall from Supabase and keep it live across all visitors.
  useEffect(() => {
    let isMounted = true;
    const likedIds: string[] = JSON.parse(localStorage.getItem('liked_wish_ids') || '[]');

    supabase
      .from('wishes')
      .select('id, author, side, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (error) console.error('Failed to load wishes from Supabase:', error);
        if (!isMounted || error || !data) return;
        const mapped: WishMessage[] = (data as WishRow[]).map((row) => ({
          id: row.id,
          author: row.author,
          side: row.side,
          message: row.message,
          time: formatRelativeTime(row.created_at),
          likes: likedIds.includes(row.id) ? 1 : 0,
          isLiked: likedIds.includes(row.id),
        }));
        setWishesList(mapped);
      });

    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          const row = payload.new as WishRow;
          setWishesList((prev) => {
            if (prev.some((w) => w.id === row.id)) return prev;
            const newWish: WishMessage = {
              id: row.id,
              author: row.author,
              side: row.side,
              message: row.message,
              time: formatRelativeTime(row.created_at),
              likes: 0,
              isLiked: false,
            };
            return [newWish, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#7A121D', '#DDA7A5', '#EADBC8', '#D4AF37'],
      });
    } catch (e) {
      // Ignored
    }

    const name = formData.name.trim();
    const message = formData.wishes.trim() || 'Chúc hai bạn trăm năm hạnh phúc!';

    const [rsvpResult, wishResult] = await Promise.all([
      supabase.from('rsvps').insert({
        name,
        wishes: formData.wishes.trim(),
        attendance: formData.attendance,
        companions: formData.companions,
        invited_by: formData.invitedBy,
      }),
      supabase.from('wishes').insert({
        author: name,
        side: formData.invitedBy,
        message,
      }),
    ]);

    if (rsvpResult.error) console.error('Failed to save RSVP to Supabase:', rsvpResult.error);
    if (wishResult.error) console.error('Failed to save wish to Supabase:', wishResult.error);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleLike = (id: string) => {
    setWishesList((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = !w.isLiked;
          return {
            ...w,
            isLiked,
            likes: isLiked ? w.likes + 1 : Math.max(0, w.likes - 1),
          };
        }
        return w;
      })
    );

    const likedIds: string[] = JSON.parse(localStorage.getItem('liked_wish_ids') || '[]');
    const nextLikedIds = likedIds.includes(id)
      ? likedIds.filter((likedId) => likedId !== id)
      : [...likedIds, id];
    localStorage.setItem('liked_wish_ids', JSON.stringify(nextLikedIds));
  };

  return (
    <section id="rsvp-section" className="relative w-full py-10 px-4">
      {/* Decorative Calla Lily */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeSoft(0.2)}
        className="absolute top-2 right-2 pointer-events-none transform rotate-12 opacity-85"
      >
        <BurgundyCallaLily size={65} />
      </motion.div>

      <div className="max-w-md mx-auto">
        {/* RSVP Card with refined paper styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUp(0, 24)}
          className="bg-white/90 backdrop-blur-xs rounded-3xl p-6 md:p-8 border border-[#7A121D]/20 shadow-lg relative overflow-hidden"
        >

          <div className="text-center mb-6">
            <h3 className="font-script text-4xl md:text-5xl text-[#7A121D]">
              Xác Nhận Tham Dự
            </h3>
            <p className="text-xs text-[#55383C] leading-relaxed mt-2 font-medium">
              {WEDDING_DATA.quotes.rsvpHeader}
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#7A121D]/10 text-[#7A121D] rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#7A121D]">
                Cảm Ơn Bạn Rất Nhiều!
              </h4>
              <p className="text-xs text-[#55383C] max-w-xs mx-auto leading-relaxed">
                Lời chúc và phản hồi của bạn đã được gửi đến cô dâu Hạ Vy & chú rể Tuấn An. Rất mong được gặp bạn trong ngày trọng đại!
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    wishes: '',
                    attendance: 'yes',
                    companions: '0',
                    invitedBy: 'both',
                  });
                }}
                className="text-xs font-semibold text-[#7A121D] underline hover:text-[#550C14] pt-2"
              >
                Gửi thêm phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Tên của bạn */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="Tên của bạn *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-xs text-[#2D1217] placeholder:text-[#8C7377] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40 transition-all"
                />
              </div>

              {/* Gửi lời chúc đến cô dâu chú rể */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Gửi lời chúc đến cô dâu chú rể..."
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-xs text-[#2D1217] placeholder:text-[#8C7377] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40 transition-all resize-none"
                />
              </div>

              {/* Xác nhận tham dự? */}
              <div>
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-xs text-[#2D1217] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40 transition-all cursor-pointer"
                >
                  <option value="yes">Xác nhận tham dự: Chắc chắn tôi sẽ đến</option>
                  <option value="maybe">Xác nhận tham dự: Chưa chắc chắn (sẽ báo sau)</option>
                  <option value="no">Xác nhận tham dự: Rất tiếc không thể đến</option>
                </select>
              </div>

              {/* Bạn có tham dự cùng ai khác không? */}
              <div>
                <select
                  value={formData.companions}
                  onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-xs text-[#2D1217] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40 transition-all cursor-pointer"
                >
                  <option value="0">Bạn có tham dự cùng ai không: Đi một mình</option>
                  <option value="1">Tham dự cùng 1 người (+1 người)</option>
                  <option value="2">Tham dự cùng 2 người (+2 người)</option>
                  <option value="family">Tham dự cùng cả gia đình</option>
                </select>
              </div>

              {/* Bạn là khách mời của ai? */}
              <div>
                <select
                  value={formData.invitedBy}
                  onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#7A121D]/20 text-xs text-[#2D1217] focus:outline-none focus:ring-2 focus:ring-[#7A121D]/40 transition-all cursor-pointer"
                >
                  <option value="both">Bạn là khách mời của ai: Bạn chung cả hai</option>
                  <option value="groom">Bạn là khách mời của: Chú Rể (Tuấn An)</option>
                  <option value="bride">Bạn là khách mời của: Cô Dâu (Hạ Vy)</option>
                </select>
              </div>

              {/* Button XÁC NHẬN */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 mt-2 rounded-xl bg-[#7A121D] hover:bg-[#600D16] active:scale-[0.98] text-white font-display text-sm font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>ĐANG GỬI...</span>
                ) : (
                  <div>
                    <span>XÁC NHẬN</span>
                  </div>
                )}
              </button>
            </form>
          )}

        </motion.div>

        {/* Sổ Lưu Bút Online - Guestbook Display */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUp(0.1)}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-[#7A121D] flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Sổ Lưu Bút ({wishesList.length})
            </h4>
            <span className="text-[11px] text-[#8C7377]">Lời chúc gửi gắm</span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {wishesList.length === 0 ? (
              <p className="text-center text-xs text-[#8C7377] italic py-6">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
              </p>
            ) : (
              wishesList.map((wish, idx) => (
              <motion.div
                key={wish.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportRepeat}
                variants={fadeUp(Math.min(idx * 0.06, 0.3), 14)}
                className="bg-white/80 rounded-2xl p-3.5 border border-[#7A121D]/10 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#7A121D]/10 text-[#7A121D] flex items-center justify-center font-bold text-xs">
                      {wish.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#2D1217] block">
                        {wish.author}
                      </span>
                      <span className="text-[10px] text-[#8C7377] block">
                        {wish.side === 'groom' ? 'Nhà trai' : wish.side === 'bride' ? 'Nhà gái' : 'Bạn chung'} • {wish.time}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(wish.id)}
                    className="flex items-center gap-1 text-[11px] text-[#7A121D] hover:bg-[#7A121D]/5 px-2 py-1 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        wish.isLiked ? 'fill-[#7A121D] text-[#7A121D]' : 'text-[#8C7377]'
                      }`}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>

                <p className="text-xs text-[#55383C] pl-9 italic leading-relaxed">
                  "{wish.message}"
                </p>
              </motion.div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
