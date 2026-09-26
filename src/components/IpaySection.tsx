import React, { useState } from 'react';
import { 
  Smartphone, 
  QrCode, 
  Download, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Plane, 
  Star, 
  CheckCircle2, 
  Send,
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';
import contentData from '../data/contentData.json';

const highlightIcons: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-sky-500" />,
  Plane: <Plane className="w-5 h-5 text-indigo-500" />,
};

export const IpaySection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setPhoneNumber('');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#004890] text-xs font-bold border border-blue-200">
          <Smartphone className="w-3.5 h-3.5 text-[#009FE3]" />
          <span>TÍNH NĂNG 2: TẢI APP VIETINBANK IPAY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.ipaySection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.ipaySection.subtitle}
        </p>
      </div>

      {/* Main Download Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
        {/* Left Side: QR Code & Download Links */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-wider">
              Quét mã tức thì
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#004890]">
              Quét mã QR để tải ngay ứng dụng
            </h3>
            <p className="text-sm text-slate-600">
              Sử dụng Camera trên điện thoại hoặc Zalo để quét mã và cài đặt siêu ứng dụng VietinBank iPay Mobile.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-linear-to-br from-slate-50 to-blue-50/50 border border-slate-200">
            <div className="relative p-2 bg-white rounded-2xl shadow-md border border-slate-200/80 group">
              <img
                src={contentData.ipaySection.qrCodeImage}
                alt="QR Tải App VietinBank iPay"
                className="w-44 h-44 object-contain transition-transform group-hover:scale-102"
              />
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#004890] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                Hỗ trợ iOS & Android
              </span>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-extrabold text-slate-900 text-sm ml-1">
                  {contentData.ipaySection.rating} / 5.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {contentData.ipaySection.reviewsCount} • {contentData.ipaySection.downloadCount}
              </p>

              {/* Store Badges / Direct Links */}
              <div className="flex flex-wrap sm:flex-col gap-2 pt-1">
                <a
                  href={contentData.ipaySection.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải trên App Store (iOS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href={contentData.ipaySection.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải trên Google Play</span>
                  <ExternalLink className="w-3 h-3 text-sky-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Send Link via SMS/Phone */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Hoặc nhận link tải qua tin nhắn SMS miễn phí:
            </label>
            <form onSubmit={handleSendLink} className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại nhận link..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/20 text-xs sm:text-sm outline-none bg-white"
              />
              <button
                type="submit"
                disabled={!phoneNumber.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004890] hover:bg-[#00356c] disabled:bg-slate-300 text-white text-xs font-bold transition cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </form>
            {sentSuccess && (
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                Đã gửi đường link tải iPay tới số điện thoại của Quý khách!
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Phone Mockup & App Interface Highlights */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative max-w-xs group">
            <img
              src={contentData.ipaySection.mockupImage}
              alt="VietinBank iPay Mobile Interface"
              className="w-72 h-auto object-contain drop-shadow-2xl transition-transform group-hover:scale-101"
            />
            {/* Floating feature pills */}
            <div className="absolute -top-3 -right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2 animate-bounce">
              <span className="p-1 rounded-lg bg-emerald-100 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] font-bold text-slate-500">FacePay 2345</p>
                <p className="text-xs font-extrabold text-[#004890]">Bảo mật sinh trắc học</p>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2">
              <span className="p-1 rounded-lg bg-red-100 text-[#ED1C24]">
                <Zap className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] font-bold text-slate-500">Chuyển tiền 24/7</p>
                <p className="text-xs font-extrabold text-[#ED1C24]">Miễn phí trọn đời</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentData.ipaySection.highlights.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#004890] hover:shadow-md transition group"
          >
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 w-fit mb-3 transition">
              {highlightIcons[item.icon] || <Sparkles className="w-5 h-5 text-[#004890]" />}
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#004890] transition">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 4 Steps to Open Online Account (eKYC) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Quy trình mở tài khoản eKYC trong 2 phút
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Không cần giấy tờ phức tạp, kích hoạt và giao dịch ngay tức thì
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
            100% Online & Định danh tức thì
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentData.ipaySection.onboardingSteps.map((stepItem, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-blue-50/70 border-[#004890] shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center ${
                  activeStep === idx ? 'bg-[#004890] text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {stepItem.step}
                </span>
                <span className="text-[11px] font-bold text-slate-400">Bước {idx + 1}</span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm mb-1">
                {stepItem.title}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {stepItem.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
