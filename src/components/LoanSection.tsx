import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Home, 
  Car, 
  Briefcase, 
  UserCheck, 
  Sparkles, 
  Calendar, 
  Percent, 
  FileText, 
  Printer, 
  Download, 
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { formatCurrencyVND, formatCompactVND } from '../utils/formatters';

interface ScheduleRow {
  month: number;
  startingBalance: number;
  principal: number;
  interest: number;
  totalMonthly: number;
  endingBalance: number;
}

export const LoanSection: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('home');
  const [loanAmount, setLoanAmount] = useState<number>(500_000_000);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [preferentialRate, setPreferentialRate] = useState<number>(5.8);
  const [preferentialMonths, setPreferentialMonths] = useState<number>(12);
  const [normalRate, setNormalRate] = useState<number>(8.5);
  const [calcMethod, setCalcMethod] = useState<'reducing_balance' | 'equal_payment'>('reducing_balance');

  // Table pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Selected Loan product
  const activeProduct = useMemo(() => {
    return (
      contentData.loanSection.loanProducts.find((p) => p.id === selectedProductId) ||
      contentData.loanSection.loanProducts[0]
    );
  }, [selectedProductId]);

  // Amortization Schedule Calculation
  const scheduleData = useMemo(() => {
    const rows: ScheduleRow[] = [];
    let currentBalance = loanAmount;
    let totalInterest = 0;

    if (calcMethod === 'reducing_balance') {
      const fixedMonthlyPrincipal = loanAmount / termMonths;

      for (let m = 1; m <= termMonths; m++) {
        const annualRate = m <= preferentialMonths ? preferentialRate : normalRate;
        const monthlyRate = annualRate / 100 / 12;
        const interestPayment = currentBalance * monthlyRate;
        const principalPayment = Math.min(fixedMonthlyPrincipal, currentBalance);
        const totalMonthly = principalPayment + interestPayment;
        const endingBalance = Math.max(0, currentBalance - principalPayment);

        totalInterest += interestPayment;

        rows.push({
          month: m,
          startingBalance: currentBalance,
          principal: principalPayment,
          interest: interestPayment,
          totalMonthly,
          endingBalance
        });

        currentBalance = endingBalance;
      }
    } else {
      // Equal payment (Annuity) formula
      // Note: for varying rate, simplify by calculating segment annuity or standard annuity on current rate
      const annualRate = preferentialRate / 100;
      const monthlyRate = annualRate / 12;
      const factor = Math.pow(1 + monthlyRate, termMonths);
      const fixedMonthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);

      for (let m = 1; m <= termMonths; m++) {
        const currentAnnualRate = m <= preferentialMonths ? preferentialRate : normalRate;
        const currentMonthlyRate = currentAnnualRate / 100 / 12;
        const interestPayment = currentBalance * currentMonthlyRate;
        const principalPayment = Math.min(fixedMonthlyPayment - interestPayment, currentBalance);
        const totalMonthly = principalPayment + interestPayment;
        const endingBalance = Math.max(0, currentBalance - principalPayment);

        totalInterest += interestPayment;

        rows.push({
          month: m,
          startingBalance: currentBalance,
          principal: principalPayment,
          interest: interestPayment,
          totalMonthly,
          endingBalance
        });

        currentBalance = endingBalance;
      }
    }

    const firstMonthPayment = rows[0] ? rows[0].totalMonthly : 0;
    const firstMonthPrincipal = rows[0] ? rows[0].principal : 0;
    const firstMonthInterest = rows[0] ? rows[0].interest : 0;
    const totalPayment = loanAmount + totalInterest;

    return {
      rows,
      totalInterest,
      totalPayment,
      firstMonthPayment,
      firstMonthPrincipal,
      firstMonthInterest
    };
  }, [
    loanAmount,
    termMonths,
    preferentialRate,
    preferentialMonths,
    normalRate,
    calcMethod
  ]);

  // Paginated rows for display
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return scheduleData.rows.slice(startIndex, startIndex + rowsPerPage);
  }, [scheduleData.rows, currentPage]);

  const totalPages = Math.ceil(scheduleData.rows.length / rowsPerPage);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
          <Calculator className="w-3.5 h-3.5 text-amber-600" />
          <span>TÍNH NĂNG 5: BẢNG TÍNH LỊCH TRẢ NỢ KHOẢN VAY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.loanSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.loanSection.subtitle}
        </p>
      </div>

      {/* Loan Product Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {contentData.loanSection.loanProducts.map((p) => {
          const isSelected = selectedProductId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setPreferentialRate(p.defaultRate);
              }}
              className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#004890] text-white border-[#004890] shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider opacity-80">Gói Vay</p>
                <h4 className="text-sm font-bold mt-1 line-clamp-1">{p.name}</h4>
              </div>
              <p className={`text-xs font-black mt-2 ${isSelected ? 'text-amber-300' : 'text-[#004890]'}`}>
                Từ {p.defaultRate}%/năm
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Form & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters input */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {/* Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Phương thức trả nợ:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contentData.loanSection.calculationMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCalcMethod(m.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    calcMethod === m.id
                      ? 'bg-blue-50/70 border-[#004890] text-[#004890] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold">{m.name}</span>
                    {m.recommended && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase">
                        Khuyên dùng
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount Input & Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Số tiền muốn vay (VNĐ):
              </label>
              <span className="text-base font-black text-[#004890]">
                {formatCurrencyVND(loanAmount)}
              </span>
            </div>

            <input
              type="range"
              min="50000000"
              max="10000000000"
              step="50000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004890]"
            />

            <div className="flex flex-wrap gap-2 pt-1">
              {[200_000_000, 500_000_000, 1_000_000_000, 2_000_000_000, 5_000_000_000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLoanAmount(amt)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    loanAmount === amt
                      ? 'bg-[#004890] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {formatCompactVND(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* Term in Months Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Thời gian vay vốn:
              </label>
              <span className="text-sm font-extrabold text-[#004890]">
                {termMonths} tháng ({Math.floor(termMonths / 12)} năm {termMonths % 12 > 0 ? `${termMonths % 12} th` : ''})
              </span>
            </div>

            <input
              type="range"
              min="12"
              max={activeProduct.maxTerm || 360}
              step="12"
              value={termMonths}
              onChange={(e) => {
                setTermMonths(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004890]"
            />

            <div className="flex flex-wrap gap-2 pt-1">
              {[12, 24, 36, 60, 120, 240, 360].map((t) => {
                if (t > activeProduct.maxTerm) return null;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTermMonths(t);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      termMonths === t
                        ? 'bg-[#004890] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t >= 12 ? `${t / 12} Năm` : `${t} Tháng`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rates Config */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Lãi suất ưu đãi (%/năm):
              </label>
              <input
                type="number"
                step="0.1"
                value={preferentialRate}
                onChange={(e) => setPreferentialRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-[#004890] focus:ring-2 focus:ring-[#004890]/20"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Thời gian ưu đãi (tháng):
              </label>
              <input
                type="number"
                min="0"
                max={termMonths}
                value={preferentialMonths}
                onChange={(e) => setPreferentialMonths(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#004890]/20"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Lãi suất sau ưu đãi (%/năm):
              </label>
              <input
                type="number"
                step="0.1"
                value={normalRate}
                onChange={(e) => setNormalRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#004890]/20"
              />
            </div>
          </div>
        </div>

        {/* Right Side: High-impact KPI Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-[#002D5A] via-[#004890] to-[#006BB3] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                Ước Tính Nghĩa Vụ Trả Nợ
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold text-white">
                {termMonths} Tháng
              </span>
            </div>

            {/* First Month Payment */}
            <div className="space-y-1">
              <p className="text-xs text-sky-200 font-medium">Số tiền trả tháng đầu tiên (gốc + lãi):</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                {formatCurrencyVND(scheduleData.firstMonthPayment)}
              </h3>
              <p className="text-[11px] text-sky-200/80">
                Gốc: {formatCurrencyVND(scheduleData.firstMonthPrincipal)} • Lãi: {formatCurrencyVND(scheduleData.firstMonthInterest)}
              </p>
            </div>

            {/* Total Balance Breakdown */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-200">
                <span>Số tiền gốc vay:</span>
                <span className="font-bold text-white">{formatCurrencyVND(loanAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>Tổng tiền lãi phải trả:</span>
                <span className="font-bold text-amber-300">{formatCurrencyVND(scheduleData.totalInterest)}</span>
              </div>
              <div className="border-t border-white/15 pt-2 flex items-center justify-between text-sm">
                <span className="font-extrabold text-white">Tổng gốc và lãi:</span>
                <span className="font-black text-white">{formatCurrencyVND(scheduleData.totalPayment)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-2xl bg-white text-[#004890] hover:bg-slate-100 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>In bảng kế hoạch</span>
              </button>
              <button
                onClick={() => alert('Quý khách vui lòng liên hệ trực tiếp Giao dịch viên tại quầy để được nộp hồ sơ thẩm định và phê duyệt khoản vay!')}
                className="flex-1 py-3 rounded-2xl bg-[#ED1C24] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Đăng ký vay vốn</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#004890] shrink-0 mt-0.5" />
            <p>
              Bảng tính chỉ mang tính chất tham khảo dựa trên lãi suất giả định. Lãi suất và các điều khoản cụ thể sẽ căn cứ theo Hợp đồng tín dụng được VietinBank ký kết với Quý khách.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Monthly Amortization Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Bảng Tiến Độ Trả Nợ Chi Tiết Từng Kỳ
            </h3>
            <p className="text-xs text-slate-500">
              Hiển thị phân bổ chi tiết số tiền gốc, tiền lãi và dư nợ còn lại qua từng tháng
            </p>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Trang trước
            </button>
            <span className="text-xs font-bold text-slate-600">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Trang sau
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-extrabold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Kỳ trả</th>
                <th className="py-3 px-3">Dư nợ đầu kỳ</th>
                <th className="py-3 px-3 text-[#004890]">Tiền gốc trả</th>
                <th className="py-3 px-3 text-[#ED1C24]">Tiền lãi trả</th>
                <th className="py-3 px-3 font-black">Tổng trả / tháng</th>
                <th className="py-3 px-3 text-right">Dư nợ cuối kỳ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedRows.map((row) => (
                <tr key={row.month} className="hover:bg-blue-50/40 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    Tháng {row.month}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {formatCurrencyVND(row.startingBalance)}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#004890]">
                    {formatCurrencyVND(row.principal)}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#ED1C24]">
                    {formatCurrencyVND(row.interest)}
                  </td>
                  <td className="py-3 px-3 font-black text-slate-900 bg-slate-50/50">
                    {formatCurrencyVND(row.totalMonthly)}
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-600">
                    {formatCurrencyVND(row.endingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
