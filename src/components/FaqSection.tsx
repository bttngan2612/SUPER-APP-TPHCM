import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Bot,
  UserCheck,
  PhoneCall
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface FaqSectionProps {
  onCallStaff: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onCallStaff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  
  // Custom query assistant state
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiAnswers, setAiAnswers] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: 'Tôi muốn đổi số điện thoại đăng ký nhận mã OTP thì làm thế nào?',
      a: 'Để bảo vệ an toàn tối đa cho tài khoản, việc thay đổi Số điện thoại nhận OTP bắt buộc phải thực hiện trực tiếp tại quầy giao dịch VietinBank. Quý khách vui lòng xuất trình CCCD gắn chip gốc cho Giao dịch viên để được hỗ trợ cập nhật trong 2 phút.',
      time: 'Vừa xong'
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = useMemo(() => {
    return contentData.faqSection.faqs.filter((faq) => {
      const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsSubmitting(true);
    const userQ = customQuestion;
    setCustomQuestion('');

    setTimeout(() => {
      let simulatedAnswer = '';
      const qLower = userQ.toLowerCase();

      if (qLower.includes('phí') || qLower.includes('biểu phí')) {
        simulatedAnswer = 'VietinBank hiện áp dụng chính sách 0đ phí trọn đời cho toàn bộ giao dịch chuyển tiền trong và ngoài hệ thống trên VietinBank iPay, miễn phí mở tài khoản số đẹp theo SĐT và miễn phí duy trì số dư tối thiểu!';
      } else if (qLower.includes('mất thẻ') || qLower.includes('khóa thẻ')) {
        simulatedAnswer = 'Nếu không may bị thất lạc thẻ, Quý khách hãy mở ngay VietinBank iPay > Chọn Dịch vụ Thẻ > Chọn "Khóa thẻ khẩn cấp" chỉ trong 3 giây. Hoặc thông báo ngay cho Giao dịch viên tại quầy để được khóa và cấp thẻ mới thay thế.';
      } else if (qLower.includes('lãi suất') || qLower.includes('tiết kiệm')) {
        simulatedAnswer = 'Biểu lãi suất tiết kiệm VietinBank hiện nay dao động từ 2.0% đến 5.3%/năm tùy kỳ hạn. Đặc biệt, gửi tiết kiệm trực tuyến qua VietinBank iPay được cộng thêm tới 0.3%/năm so với gửi tại quầy. Mời Quý khách dùng tính năng "Tính lãi tiền gửi" ở thanh menu trên!';
      } else if (qLower.includes('hạn mức') || qLower.includes('chuyển khoản')) {
        simulatedAnswer = 'Hạn mức chuyển khoản thông thường sau khi xác thực sinh trắc học FacePay là 500 triệu đồng/lần và 3 tỷ đồng/ngày. Khách hàng VietinBank Premium có thể chuyển khoản lên tới 10 tỷ đồng/ngày.';
      } else {
        simulatedAnswer = `Cảm ơn Quý khách đã đặt câu hỏi: "${userQ}". Vấn đề này thuộc nghiệp vụ quầy giao dịch, Giao dịch viên VietinBank tại bàn sẵn sàng hỗ trợ trực tiếp và giải quyết ngay cho Quý khách. Xin vui lòng bấm nút "Mời Giao dịch viên hỗ trợ" bên dưới!`;
      }

      setAiAnswers((prev) => [
        {
          q: userQ,
          a: simulatedAnswer,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#004890] text-xs font-bold border border-blue-200">
          <HelpCircle className="w-3.5 h-3.5 text-[#ED1C24]" />
          <span>TÍNH NĂNG 1: GIẢI ĐÁP THẮC MẮC KHÁCH HÀNG</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.faqSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.faqSection.subtitle}
        </p>
      </div>

      {/* Search Bar & Filter Categories */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm câu hỏi: sinh trắc học, đổi mật khẩu, mở tài khoản, hạn mức..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/20 text-sm sm:text-base outline-none transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 bg-slate-100 rounded-md"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {contentData.faqSection.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#004890] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer gap-4 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-xl bg-blue-50 text-[#004890] group-hover:bg-[#004890] group-hover:text-white transition">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#004890] transition">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-50 text-slate-400 group-hover:text-slate-700">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 text-slate-700 text-sm leading-relaxed animate-in fade-in duration-200">
                    <p className="bg-slate-50 p-3.5 rounded-xl border-l-4 border-[#004890] text-slate-800 font-medium">
                      {faq.answer}
                    </p>

                    {faq.steps && faq.steps.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Các bước hướng dẫn chi tiết:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {faq.steps.map((step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#004890] text-white text-xs font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-medium text-slate-700">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-slate-700 font-bold">Không tìm thấy câu hỏi phù hợp với "{searchTerm}"</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Quý khách có thể đặt câu hỏi trong khung bên dưới hoặc nhờ Giao dịch viên tại quầy hỗ trợ ngay.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Smart Assistant Box (Khách hàng đặt câu hỏi tương tác) */}
      <div className="bg-linear-to-br from-white to-blue-50/60 p-6 rounded-3xl border border-blue-200/80 shadow-md space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#004890] text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Trợ Lý Giải Đáp Nhanh Tại Quầy</h3>
              <p className="text-xs text-slate-500">Nhập câu hỏi bất kỳ để nhận phản hồi tự động tức thì</p>
            </div>
          </div>
          <button
            onClick={onCallStaff}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-[#ED1C24] hover:bg-red-100 text-xs font-bold border border-red-200 transition cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Cần hỗ trợ trực tiếp</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Ví dụ: Lãi suất vay mua xe ô tô bao nhiêu? Làm sao đổi mã PIN thẻ ATM?..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/20 text-sm outline-none bg-white"
          />
          <button
            type="submit"
            disabled={isSubmitting || !customQuestion.trim()}
            className="flex items-center gap-2 bg-[#004890] hover:bg-[#003875] disabled:bg-slate-300 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-900/10 cursor-pointer transition active:scale-95"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi câu hỏi</span>
              </>
            )}
          </button>
        </form>

        {/* Quick query chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-medium">Gợi ý hỏi nhanh:</span>
          {[
            'Biểu phí chuyển tiền iPay?',
            'Hạn mức giao dịch FacePay?',
            'Thủ tục cấp lại mật khẩu?',
            'Gửi online có an toàn không?'
          ].map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCustomQuestion(prompt)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-[#004890] hover:text-[#004890] transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Recent Responses */}
        <div className="space-y-3 pt-2">
          {aiAnswers.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="text-[#004890] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Câu hỏi: {item.q}
                </span>
                <span className="text-slate-400">{item.time}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 bg-blue-50/60 p-3 rounded-xl leading-relaxed border-l-3 border-[#009FE3]">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
