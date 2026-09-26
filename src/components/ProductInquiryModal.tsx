import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  User, 
  MapPin, 
  FileText,
  Send,
  Building
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface ProductInquiryModalProps {
  product: any;
  onClose: () => void;
}

export const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({ product, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(contentData.branchesSection.locations[0].name);
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Header */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-100 text-[#ED1C24] uppercase tracking-wider">
                Đăng ký nhận tư vấn đặc quyền
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {product.title}
              </h3>
              <p className="text-xs font-semibold text-[#009FE3]">
                {product.highlight}
              </p>
            </div>

            {/* Product image thumbnail & brief */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-14 object-contain rounded-lg"
              />
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Họ và tên Quý khách:
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#004890] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Số điện thoại liên hệ (*):
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#004890] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Chi nhánh / Phòng giao dịch mong muốn:
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                >
                  {contentData.branchesSection.locations.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#004890] hover:bg-[#00356c] text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-blue-900/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Gửi đăng ký tư vấn ngay</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                Đăng Ký Thành Công!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Chuyên viên tư vấn VietinBank tại <strong>{selectedBranch}</strong> sẽ liên hệ với Quý khách qua số điện thoại <strong>{customerPhone}</strong> trong vòng 15 phút.
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-[#004890] font-bold">
              Mã đăng ký ưu tiên: VTB-REG-{Math.floor(10000 + Math.random() * 90000)}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              Hoàn tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
