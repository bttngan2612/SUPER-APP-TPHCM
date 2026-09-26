import React, { useState, useMemo } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  HelpCircle, 
  Check, 
  Smartphone,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { formatCurrencyVND, formatCompactVND } from '../utils/formatters';

const quickAmounts = [
  50_000_000,
  100_000_000,
  200_000_000,
  500_000_000,
  1_000_000_000,
  2_000_000_000
];

export const SavingsSection: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(100_000_000);
  const [selectedTerm, setSelectedTerm] = useState<string>('12');
  const [channel, setChannel] = useState<'online' | 'counter'>('online');
  const [method, setMethod] = useState<'end_term' | 'monthly' | 'prepaid'>('end_term');

  const currentRatePackage = useMemo(() => {
    return (
      contentData.savingsSection.ratePackages.find((pkg) => pkg.term === selectedTerm) ||
      contentData.savingsSection.ratePackages[4]
    );
  }, [selectedTerm]);

  const activeInterestRate = useMemo(() => {
    return channel === 'online' ? currentRatePackage.onlineRate : currentRatePackage.counterRate;
  }, [channel, currentRatePackage]);

  // Calculations
  const calculationResult = useMemo(() => {
    const termMonths = parseInt(selectedTerm, 10);
    const annualRate = activeInterestRate / 100;
    
    // Standard banking formula: Amount * (annualRate) * (months / 12)
    let interestEarned = 0;
    let monthlyInterest = 0;

    if (method === 'end_term') {
      interestEarned = depositAmount * annualRate * (termMonths / 12);
      monthlyInterest = interestEarned / termMonths;
    } else if (method === 'monthly') {
      // Monthly payout rate slightly discounted by ~0.1% in typical banking
      const effectiveRate = annualRate * 0.985;
      interestEarned = depositAmount * effectiveRate * (termMonths / 12);
      monthlyInterest = interestEarned / termMonths;
    } else if (method === 'prepaid') {
      // Prepaid interest received upfront
      const effectiveRate = annualRate * 0.97;
      interestEarned = depositAmount * effectiveRate * (termMonths / 12);
      monthlyInterest = interestEarned / termMonths;
    }

    const totalAtMaturity = depositAmount + interestEarned;
    const onlineDifference = depositAmount * ((currentRatePackage.onlineRate - currentRatePackage.counterRate) / 100) * (termMonths / 12);

    return {
      interestEarned,
      totalAtMaturity,
      monthlyInterest,
      onlineDifference
    };
  }, [depositAmount, selectedTerm, activeInterestRate, method, currentRatePackage]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
          <span>TÍNH NĂNG 4: TÍNH LÃI TIỀN GỬI TIẾT KIỆM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.savingsSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.savingsSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs & Options */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {/* Channel selector (Online vs Counter) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Hình thức gửi tiết kiệm:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannel('online')}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  channel === 'online'
                    ? 'bg-blue-50/70 border-[#004890] text-[#004890] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-5 h-5 text-[#009FE3]" />
                  <div>
                    <p className="text-sm font-bold">Gửi Online qua iPay</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">+0.3% Lãi suất ưu đãi</p>
                  </div>
                </div>
                {channel === 'online' && <Check className="w-4 h-4 text-[#004890]" />}
              </button>

              <button
                type="button"
                onClick={() => setChannel('counter')}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  channel === 'counter'
                    ? 'bg-blue-50/70 border-[#004890] text-[#004890] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-bold">Gửi tại Quầy giao dịch</p>
                    <p className="text-[11px] text-slate-400">Nhận sổ tiết kiệm vật lý</p>
                  </div>
                </div>
                {channel === 'counter' && <Check className="w-4 h-4 text-[#004890]" />}
              </button>
            </div>
          </div>

          {/* Deposit Amount Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Số tiền gửi tiết kiệm (VNĐ):
              </label>
              <span className="text-base font-black text-[#004890]">
                {formatCurrencyVND(depositAmount)}
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="5000000"
                max="5000000000"
                step="5000000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004890]"
              />
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDepositAmount(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    depositAmount === amt
                      ? 'bg-[#004890] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {formatCompactVND(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* Term Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kỳ hạn gửi tiết kiệm:
              </label>
              <span className="text-xs font-semibold text-slate-500">
                Lãi suất: <strong className="text-[#004890] font-bold">{activeInterestRate}%/năm</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {contentData.savingsSection.ratePackages.map((pkg) => {
                const isSelected = selectedTerm === pkg.term;
                const rate = channel === 'online' ? pkg.onlineRate : pkg.counterRate;
                return (
                  <button
                    key={pkg.term}
                    type="button"
                    onClick={() => setSelectedTerm(pkg.term)}
                    className={`p-3 rounded-2xl border text-center transition relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#004890] text-white border-[#004890] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {pkg.popular && (
                      <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-[#ED1C24]'
                      }`}>
                        Phổ biến
                      </span>
                    )}
                    <p className="text-xs font-bold">{pkg.label}</p>
                    <p className={`text-sm font-extrabold mt-0.5 ${isSelected ? 'text-sky-200' : 'text-[#004890]'}`}>
                      {rate}%
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Hình thức nhận lãi:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {contentData.savingsSection.methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id as any)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    method === m.id
                      ? 'bg-blue-50/70 border-[#004890] text-[#004890]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs font-bold">{m.name}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Calculation Results Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-[#002D5A] via-[#004890] to-[#006BB3] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                Kết Quả Dự Toán
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold text-white">
                {selectedTerm} Tháng ({activeInterestRate}%/năm)
              </span>
            </div>

            {/* Big Highlight: Interest Earned */}
            <div className="space-y-1">
              <p className="text-xs text-sky-200 font-medium">Tiền lãi thực nhận ước tính:</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                {formatCurrencyVND(calculationResult.interestEarned)}
              </h3>
              <p className="text-[11px] text-sky-200/80">
                (Tương đương ~ {formatCurrencyVND(calculationResult.monthlyInterest)} / tháng)
              </p>
            </div>

            {/* Total at Maturity */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-200">
                <span>Số tiền gốc ban đầu:</span>
                <span className="font-bold text-white">{formatCurrencyVND(depositAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-200">
                <span>Tiền lãi dự tính:</span>
                <span className="font-bold text-amber-300">+{formatCurrencyVND(calculationResult.interestEarned)}</span>
              </div>
              <div className="border-t border-white/15 pt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">Tổng tiền khi đáo hạn:</span>
                <span className="text-base font-black text-white">{formatCurrencyVND(calculationResult.totalAtMaturity)}</span>
              </div>
            </div>

            {/* Online Advantage Benefit Notice */}
            {channel === 'online' && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-xs text-emerald-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Lợi ích gửi Online iPay:</p>
                  <p className="text-emerald-100">
                    Quý khách nhận thêm <strong className="text-white">+{formatCurrencyVND(calculationResult.onlineDifference)}</strong> tiền lãi so với mở sổ tại quầy!
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                alert('Quý khách vui lòng quét mã tải VietinBank iPay ở Tab 2 hoặc thông báo cho Giao dịch viên tại quầy để mở sổ tiết kiệm ngay!');
              }}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm transition shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Mở sổ tiết kiệm ngay tại quầy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ info box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#004890]" />
              Quy tắc tính lãi tiền gửi VietinBank:
            </p>
            <p>
              • Tiền lãi = (Số tiền gửi × Lãi suất (%/năm) × Số ngày gửi thực tế) / 365 ngày.
            </p>
            <p>
              • Khi đến ngày đáo hạn, nếu Quý khách không tất toán, hệ thống sẽ tự động quay vòng gốc và lãi sang kỳ hạn mới tương ứng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
