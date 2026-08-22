import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA, INITIAL_WISHES } from '../data/weddingData';
import { RSVPData, WishMessage } from '../types';
import confetti from 'canvas-confetti';
import { Send, Heart, CheckCircle2, MessageSquare, User, Sparkles } from 'lucide-react';
import { BurgundyCallaLily, WhitePaperFlower3D } from './FloralDecor';
import { fadeSoft, fadeUp, fadeUpTitle, viewportOnce } from './motion/Reveal';

export function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    wishes: '',
    attendance: 'yes' as 'yes' | 'no' | 'maybe',
    companions: '0',
    invitedBy: 'both' as 'groom' | 'bride' | 'both',
  });

  const [wishesList, setWishesList] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_WISHES;
      }
    }
    return INITIAL_WISHES;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      // Create new wish entry
      const newWish: WishMessage = {
        id: 'w_' + Date.now(),
        author: formData.name.trim(),
        side: formData.invitedBy,
        message: formData.wishes.trim() || 'Chúc hai bạn trăm năm hạnh phúc!',
        time: 'Vừa xong',
        likes: 1,
        isLiked: true,
      };

      const updatedWishes = [newWish, ...wishesList];
      setWishesList(updatedWishes);
      localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));

      // Save RSVP to storage
      const rsvpEntry: RSVPData = {
        id: 'rsvp_' + Date.now(),
        name: formData.name,
        wishes: formData.wishes,
        attendance: formData.attendance,
        companions: formData.companions,
        invitedBy: formData.invitedBy,
        createdAt: new Date().toISOString(),
      };

      const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      localStorage.setItem('wedding_rsvps', JSON.stringify([rsvpEntry, ...existingRSVPs]));

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
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
  };

  return (
    <section id="rsvp-section" className="relative w-full py-10 px-4">
      {/* Decorative Calla Lily */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
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
          viewport={viewportOnce}
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
                Lời chúc và phản hồi của bạn đã được gửi đến cô dâu Quỳnh Anh & chú rể Bá Kiên. Rất mong được gặp bạn trong ngày trọng đại!
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
                  <option value="groom">Bạn là khách mời của: Chú Rể (Bá Kiên)</option>
                  <option value="bride">Bạn là khách mời của: Cô Dâu (Quỳnh Anh)</option>
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
                  <>
                    <span>XÁC NHẬN</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </motion.div>

        {/* Sổ Lưu Bút Online - Guestbook Display */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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
            {wishesList.map((wish, idx) => (
              <motion.div
                key={wish.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
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
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
