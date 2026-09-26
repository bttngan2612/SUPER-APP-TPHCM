import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Smartphone, 
  Trophy, 
  PiggyBank, 
  Calculator, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface HeroBannerProps {
  onSelectTab: (tabId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#002D5A] via-[#004890] to-[#006BB3] text-white p-6 sm:p-8 md:p-10 shadow-xl border border-blue-900/40 mb-8">
      {/* Background ambient orbs & patterns */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/4 -bottom-20 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Greeting and Key Value Proposition */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            VietinBank Smart Kiosk • Trải nghiệm dịch vụ số
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Chào mừng Quý khách đến với <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-white to-sky-100">
              Ngân hàng số VietinBank
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-normal max-w-xl leading-relaxed">
            Khám phá 7 tiện ích tương tác ngay tại quầy: giải đáp thủ tục sinh trắc học, tính toán nhanh lãi tiết kiệm & khoản vay, quét mã tải iPay và tham gia vòng quay may mắn nhận quà.
          </p>

          {/* Quick value metric badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center">
              <p className="text-lg sm:text-xl font-extrabold text-white">0 VNĐ</p>
              <p className="text-[11px] text-sky-200 font-medium">Phí dịch vụ trọn đời</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center">
              <p className="text-lg sm:text-xl font-extrabold text-emerald-300">+0.3%</p>
              <p className="text-[11px] text-sky-200 font-medium">Lãi suất gửi online</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center">
              <p className="text-lg sm:text-xl font-extrabold text-[#FF6B6B]">100%</p>
              <p className="text-[11px] text-sky-200 font-medium">Bảo mật FacePay</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quick Launch Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelectTab('game')}
            className="flex flex-col justify-between p-4 rounded-2xl bg-linear-to-br from-red-600/90 to-red-800/90 hover:from-red-500 hover:to-red-700 text-left border border-red-400/40 shadow-lg group cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2.5 rounded-xl bg-white/20 text-white">
                <Trophy className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                Nhận quà
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-white group-hover:text-yellow-200 transition">Thử Thách Game</p>
              <p className="text-xs text-white/80 line-clamp-1">Vòng quay may mắn & Quiz</p>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('ipay')}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-left border border-white/20 backdrop-blur-md shadow-lg group cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2.5 rounded-xl bg-sky-500/30 text-sky-200">
                <Smartphone className="w-5 h-5 text-sky-300" />
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-200">
                Quét mã
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-white group-hover:text-sky-300 transition">Tải App iPay</p>
              <p className="text-xs text-slate-300 line-clamp-1">Mở tài khoản 2 phút</p>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('savings')}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-left border border-white/20 backdrop-blur-md shadow-lg group cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/30 text-emerald-200">
                <PiggyBank className="w-5 h-5 text-emerald-300" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition">Tính Lãi Tiền Gửi</p>
              <p className="text-xs text-slate-300 line-clamp-1">Tối ưu hóa lợi nhuận</p>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('loan')}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-left border border-white/20 backdrop-blur-md shadow-lg group cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/30 text-amber-200">
                <Calculator className="w-5 h-5 text-amber-300" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <p className="text-sm font-bold text-white group-hover:text-amber-300 transition">Lịch Trả Nợ Khoản Vay</p>
              <p className="text-xs text-slate-300 line-clamp-1">Lập kế hoạch tài chính</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
