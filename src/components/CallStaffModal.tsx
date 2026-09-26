import React, { useState } from 'react';
import { 
  BellRing, 
  X, 
  CheckCircle2, 
  UserCheck, 
  Sparkles,
  HelpCircle,
  Smartphone,
  CreditCard,
  Building2
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface CallStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceNeeds = [
  'Hỗ trợ cài đặt Sinh trắc học CCCD (QĐ 2345)',
  'Mở tài khoản thanh toán & Phát hành thẻ mới',
  'Mở khóa tài khoản / Cấp lại mật khẩu iPay',
  'Tư vấn gửi Tiết kiệm cộng lãi suất',
  'Tư vấn hồ sơ vay vốn mua nhà / ô tô / kinh doanh',
  'Hỗ trợ thủ tục nộp / rút tiền mặt tại quầy',
  'Yêu cầu khác'
];

export const CallStaffModal: React.FC<CallStaffModalProps> = ({ isOpen, onClose }) => {
  const [selectedNeed, setSelectedNeed] = useState<string>(serviceNeeds[0]);
  const [deskNumber, setDeskNumber] = useState<string>('Bàn Kiosk Tương Tác 01');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCall = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={handleReset}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleCall} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-100 text-[#ED1C24]">
                <BellRing className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Mời Giao Dịch Viên Hỗ Trợ
                </h3>
                <p className="text-xs text-slate-500">
                  Gửi tín hiệu trực tiếp đến nhân viên phụ trách quầy
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Nhu cầu hỗ trợ của Quý khách:
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {serviceNeeds.map((need, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedNeed(need)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                      selectedNeed === need
                        ? 'bg-blue-50 border-[#004890] text-[#004890] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{need}</span>
                    {selectedNeed === need && <span className="w-2 h-2 rounded-full bg-[#004890]"></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Vị trí của Quý khách tại phòng giao dịch:
              </label>
              <select
                value={deskNumber}
                onChange={(e) => setDeskNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="Bàn Kiosk Tương Tác 01">Bàn Kiosk Tương Tác 01</option>
                <option value="Bàn Kiosk Tương Tác 02">Bàn Kiosk Tương Tác 02</option>
                <option value="Khu vực Ghế chờ Trung tâm">Khu vực Ghế chờ Trung tâm</option>
                <option value="Quầy Giao dịch Khách hàng Ưu tiên">Quầy Giao dịch Khách hàng Ưu tiên</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-[#ED1C24] to-[#C1121F] hover:from-[#C1121F] hover:to-[#9B0D18] text-white font-extrabold text-sm transition shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
            >
              Gửi yêu cầu hỗ trợ ngay
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                Đã Thông Báo Giao Dịch Viên!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Hệ thống đã điều phối Giao dịch viên đến vị trí <strong>{deskNumber}</strong> để hỗ trợ Quý khách:
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-[#004890] font-bold">
              "{selectedNeed}"
            </div>

            <p className="text-[11px] text-slate-400">
              Quý khách vui lòng ngồi tại chỗ, nhân viên sẽ có mặt sau khoảng 30 - 60 giây. Xin cảm ơn Quý khách!
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              Đã hiểu, quay lại màn hình chính
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
