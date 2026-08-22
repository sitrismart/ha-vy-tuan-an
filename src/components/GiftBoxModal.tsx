import React, { useState } from 'react';
import { BANK_ACCOUNTS } from '../data/weddingData';
import { Gift, Copy, Check, X, QrCode, Heart } from 'lucide-react';

export function GiftBoxModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (accountNumber: string, id: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#FAF6F0] rounded-3xl p-6 border border-[#7A121D]/20 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#7A121D]/10 hover:bg-[#7A121D]/20 text-[#7A121D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#7A121D]/10 text-[#7A121D] flex items-center justify-center mx-auto mb-2">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-script text-4xl text-[#7A121D]">
            Hộp Mừng Cưới
          </h3>
          <p className="text-xs text-[#6A4D53] mt-1 italic">
            Gửi gắm yêu thương và lời chúc phúc từ xa đến cô dâu chú rể
          </p>
        </div>

        {/* Bank Cards */}
        <div className="space-y-4">
          {BANK_ACCOUNTS.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-[#7A121D]/15 shadow-xs flex flex-col items-center text-center"
            >
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#7A121D] mb-2">
                {acc.title}
              </span>

              {/* QR Code Container */}
              <div className="w-36 h-36 bg-white p-2 rounded-xl border border-gray-200 shadow-inner mb-3 flex items-center justify-center">
                <img
                  src={acc.qrCodeUrl}
                  alt={`Mã QR ${acc.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full text-xs space-y-1 text-[#4A3B32]">
                <p>
                  <span className="text-[#8C7377]">Chủ TK:</span> <strong>{acc.name}</strong>
                </p>
                <p>
                  <span className="text-[#8C7377]">Ngân hàng:</span> <strong>{acc.bankName}</strong>
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-[#8C7377]">STK:</span>
                  <span className="font-mono font-bold text-sm text-[#7A121D] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#7A121D]/20">
                    {acc.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, `acc_${idx}`)}
                    className="p-1 rounded bg-[#7A121D]/10 hover:bg-[#7A121D]/20 text-[#7A121D] transition-colors"
                    title="Sao chép số tài khoản"
                  >
                    {copiedId === `acc_${idx}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-[#8C7377] mt-4">
          Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất đối với chúng mình!
        </p>
      </div>
    </div>
  );
}
