import React from 'react';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  Globe, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Award
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#002D5A] text-slate-300 mt-16 border-t border-blue-900/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-blue-900/40">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={contentData.brand.logoAsset}
                alt="VietinBank"
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-bold text-white text-sm">
              {contentData.brand.fullName}
            </p>
            <p className="text-slate-400 leading-relaxed text-xs">
              Ngân hàng thương mại hàng đầu Việt Nam, cung cấp giải pháp tài chính toàn diện, ứng dụng công nghệ số hiện đại nâng tầm chất lượng cuộc sống.
            </p>
            <div className="flex items-center gap-2 pt-1 text-sky-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Chứng chỉ bảo mật thông tin chuẩn quốc tế PCI-DSS & ISO 27001</span>
            </div>
          </div>

          {/* Quick Navigation 7 Features */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-white font-bold text-xs uppercase tracking-wider">
              7 Tiện ích tại Quầy giao dịch
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {contentData.navigation.map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => onSelectTab(nav.id)}
                  className="text-left text-slate-300 hover:text-white hover:underline transition cursor-pointer py-1"
                >
                  • {nav.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-white font-bold text-xs uppercase tracking-wider">
              Thông tin liên hệ & Hỗ trợ
            </p>
            <div className="space-y-2 text-slate-300 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ED1C24] shrink-0 mt-0.5" />
                <span>Trụ sở chính: 108 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline 24/7: <strong className="text-white">1900 558 868</strong> / (024) 3941 8868</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Email: contact@vietinbank.vn</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Website: https://www.vietinbank.vn</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Mã Swift: <strong>ICBVVNVX</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-[11px]">
          <p>© 2026 Ngân hàng TMCP Công Thương Việt Nam (VietinBank). Bản quyền thuộc về VietinBank.</p>
          <p className="text-slate-400">Hệ thống Kiosk tương tác số phiên bản v3.4 • Sẵn sàng phục vụ</p>
        </div>
      </div>
    </footer>
  );
};
