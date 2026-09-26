import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Smartphone, 
  Trophy, 
  PiggyBank, 
  Calculator, 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  Clock, 
  BellRing,
  Maximize2,
  Minimize2,
  Menu,
  X
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onCallStaff: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Trophy: <Trophy className="w-4 h-4" />,
  PiggyBank: <PiggyBank className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
};

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onCallStaff }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isKioskMode, setIsKioskMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsKioskMode(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsKioskMode(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top utility bar for Kiosk & Branch info */}
      <div className="bg-[#002D5A] text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-sky-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Điểm giao dịch số VietinBank • Sẵn sàng phục vụ
            </span>
            <span className="hidden md:inline-block text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>{currentDate} - {currentTime}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="tel:1900558868" 
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-sky-200 hover:text-white transition"
            >
              <PhoneCall className="w-3 h-3 text-[#ED1C24]" />
              <span>Hotline 24/7: <strong className="text-white">1900 558 868</strong></span>
            </a>
            <button
              onClick={toggleFullScreen}
              className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition"
              title="Chế độ Kiosk Toàn Màn Hình"
            >
              {isKioskMode ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span className="text-[11px]">{isKioskMode ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo and Slogan */}
        <div 
          onClick={() => onSelectTab('faq')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src={contentData.brand.logoAsset} 
            alt="VietinBank" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-102"
          />
          <div className="hidden sm:block border-l border-slate-300 pl-3">
            <p className="text-xs font-bold text-[#004890] tracking-wide uppercase">Kiosk Quầy Giao Dịch</p>
            <p className="text-[11px] text-slate-500 font-medium">Chạm trải nghiệm dịch vụ</p>
          </div>
        </div>

        {/* Right actions: Staff Call Button & Mobile Menu */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onCallStaff}
            className="flex items-center gap-2 bg-linear-to-r from-[#ED1C24] to-[#C1121F] hover:from-[#C1121F] hover:to-[#9B0D18] text-white px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer animate-none"
          >
            <BellRing className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">Mời Giao dịch viên hỗ trợ</span>
            <span className="sm:hidden">Gọi nhân viên</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary 7 Navigation Tabs */}
      <div className="bg-slate-50/90 border-t border-slate-200/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-2 flex items-center gap-1.5 py-1.5 min-w-max">
          {contentData.navigation.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#004890] text-white shadow-sm shadow-[#004890]/25'
                    : 'text-slate-700 hover:text-[#004890] hover:bg-white'
                }`}
              >
                <span className={isActive ? 'text-sky-300' : 'text-[#004890]'}>
                  {iconMap[item.icon] || <Sparkles className="w-4 h-4" />}
                </span>
                <span>{item.shortTitle}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-[#ED1C24]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chọn tính năng tương tác</p>
          {contentData.navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === item.id
                  ? 'bg-[#004890] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === item.id ? 'text-sky-300' : 'text-[#004890]'}>
                  {iconMap[item.icon]}
                </span>
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-[#ED1C24] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
