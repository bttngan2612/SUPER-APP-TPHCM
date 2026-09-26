import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Navigation, 
  Ticket, 
  Users, 
  Building, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface BranchLocation {
  id: string;
  name: string;
  type: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  currentWaiting: number;
  estimatedWaitMin: number;
  isWorkingNow: boolean;
  mapUrl: string;
}

export const BranchesSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // E-ticket modal / state
  const [generatedTicket, setGeneratedTicket] = useState<{
    number: string;
    branchName: string;
    time: string;
    waitingCount: number;
  } | null>(null);

  const filteredLocations = useMemo(() => {
    return contentData.branchesSection.locations.filter((loc) => {
      const matchRegion = selectedRegion === 'all' || loc.region === selectedRegion;
      const matchType = selectedType === 'all' || loc.type === selectedType;
      const matchSearch =
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchTerm.toLowerCase());
      return matchRegion && matchType && matchSearch;
    });
  }, [selectedRegion, selectedType, searchTerm]);

  const handleTakeTicket = (loc: BranchLocation) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const prefix = loc.type === 'branch' ? 'A' : 'B';
    const ticketNo = `${prefix}-${randomNum}`;

    setGeneratedTicket({
      number: ticketNo,
      branchName: loc.name,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      waitingCount: loc.currentWaiting
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#004890] text-xs font-bold border border-blue-200">
          <MapPin className="w-3.5 h-3.5 text-[#004890]" />
          <span>TÍNH NĂNG 7: ĐIỂM GIAO DỊCH & MẠNG LƯỚI R-ATM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.branchesSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.branchesSection.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên chi nhánh, đường phố, quận huyện..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/20 text-sm outline-none bg-slate-50/50"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {contentData.branchesSection.regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedRegion === reg.id
                    ? 'bg-[#004890] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {contentData.branchesSection.types.map((tp) => (
              <button
                key={tp.id}
                onClick={() => setSelectedType(tp.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  selectedType === tp.id
                    ? 'bg-red-50 text-[#ED1C24] font-bold border border-red-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-[#004890] hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Type and Status badges */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  loc.type === 'ratm'
                    ? 'bg-amber-100 text-amber-900 font-extrabold'
                    : 'bg-blue-100 text-[#004890]'
                }`}>
                  {loc.type === 'branch' ? 'Chi nhánh chính' : loc.type === 'pgd' ? 'Phòng giao dịch' : 'Cây R-ATM 24/7'}
                </span>

                {/* Queue status */}
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {loc.type === 'ratm'
                    ? 'Sẵn sàng phục vụ 24/7'
                    : `${loc.currentWaiting} khách đang đợi (~${loc.estimatedWaitMin} phút)`}
                </span>
              </div>

              {/* Branch Title */}
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {loc.name}
              </h3>

              {/* Address & Hours */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#ED1C24] shrink-0 mt-0.5" />
                  <span className="leading-snug">{loc.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{loc.hours}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Hotline: <strong className="text-slate-800">{loc.phone}</strong></span>
                </p>
              </div>

              {/* Services tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {loc.services.map((svc, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleTakeTicket(loc)}
                className="flex-1 py-2.5 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Lấy số thứ tự điện tử</span>
              </button>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#004890] transition flex items-center justify-center"
                title="Xem chỉ đường trên bản đồ"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Electronic Ticket Modal */}
      {generatedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="inline-flex p-3 rounded-full bg-blue-50 text-[#004890]">
              <Ticket className="w-8 h-8 text-[#004890]" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                PHIẾU THỨ TỰ GIAO DỊCH ĐIỆN TỬ
              </span>
              <p className="text-xs font-semibold text-slate-600 mt-1">{generatedTicket.branchName}</p>
            </div>

            {/* Big Ticket Number */}
            <div className="py-4 px-6 rounded-2xl bg-linear-to-br from-slate-50 to-blue-50 border-2 border-dashed border-[#004890] space-y-1">
              <span className="text-xs font-bold text-slate-400">Số thứ tự của Quý khách</span>
              <h4 className="text-4xl font-black text-[#004890] tracking-wider">
                {generatedTicket.number}
              </h4>
              <p className="text-[11px] text-slate-500">
                Thời gian cấp phiếu: {generatedTicket.time}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Hiện có <strong>{generatedTicket.waitingCount}</strong> khách hàng trước Quý khách. Xin vui lòng chú ý loa và màn hình hiển thị tại quầy.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert(`Đã gửi thông tin số thứ tự ${generatedTicket.number} tới máy in và hệ thống quầy!`);
                  setGeneratedTicket(null);
                }}
                className="w-full py-3 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                In phiếu / Xác nhận
              </button>
              <button
                onClick={() => setGeneratedTicket(null)}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
