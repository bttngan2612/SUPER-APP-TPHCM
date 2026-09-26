import React, { useState, useRef } from 'react';
import { 
  Trophy, 
  RotateCw, 
  Gift, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  QrCode,
  Tag,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import contentData from '../data/contentData.json';

interface PrizeItem {
  id: number;
  text: string;
  color: string;
  textColor: string;
  voucherCode: string;
  type: string;
  desc: string;
}

export const GameSection: React.FC = () => {
  const [activeGameMode, setActiveGameMode] = useState<'wheel' | 'quiz'>('wheel');
  
  // Wheel State
  const wheelRef = useRef<SVGGElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [prizesHistory, setPrizesHistory] = useState<Array<PrizeItem & { uniqueCode: string; wonAt: string }>>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const wheelPrizes: PrizeItem[] = contentData.gameSection.wheelPrizes;
  const numSegments = wheelPrizes.length;
  const segmentAngle = 360 / numSegments;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random prize index
    const prizeIndex = Math.floor(Math.random() * numSegments);
    const selectedPrize = wheelPrizes[prizeIndex];

    // Calculate rotation: Target angle so the needle at top (270 deg or 0 deg offset) lands on the segment
    const spins = 5; // 5 full revolutions
    // In SVG coordinate: 0 is right, 90 is bottom, 180 is left, 270 is top
    // With pointer at top (270 deg or -90 deg):
    const targetSegmentCenter = prizeIndex * segmentAngle + segmentAngle / 2;
    const targetAngle = 360 * spins + (360 - targetSegmentCenter + 270) % 360;
    const finalRotation = currentRotation + targetAngle;

    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: finalRotation,
        duration: 4.5,
        ease: 'power4.out',
        transformOrigin: '50% 50%',
        onComplete: () => {
          setIsSpinning(false);
          setCurrentRotation(finalRotation);
          setWonPrize(selectedPrize);
          triggerConfetti();

          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          const fullCode = `${selectedPrize.voucherCode}-${randomSuffix}`;

          setPrizesHistory((prev) => [
            {
              ...selectedPrize,
              uniqueCode: fullCode,
              wonAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
            },
            ...prev
          ]);
        }
      });
    }
  };

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Quiz handlers
  const currentQuiz = contentData.gameSection.quizQuestions[currentQuizIndex];

  const handleSelectQuizAnswer = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(idx);
    setIsAnswerSubmitted(true);

    if (idx === currentQuiz.correctIndex) {
      setQuizScore((prev) => prev + 1);
      triggerConfetti();
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < contentData.gameSection.quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      triggerConfetti();
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold border border-red-200">
          <Trophy className="w-3.5 h-3.5 text-[#ED1C24]" />
          <span>TÍNH NĂNG 3: THỬ THÁCH GAME TƯƠNG TÁC</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.gameSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.gameSection.subtitle}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs gap-1.5">
          <button
            onClick={() => setActiveGameMode('wheel')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeGameMode === 'wheel'
                ? 'bg-[#004890] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            <span>Vòng Quay May Mắn</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500 text-white font-black">
              100% Trúng
            </span>
          </button>

          <button
            onClick={() => setActiveGameMode('quiz')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeGameMode === 'quiz'
                ? 'bg-[#004890] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Thử Tài Tinh Tường Tài Chính</span>
          </button>
        </div>
      </div>

      {/* GAME MODE 1: LUCKY WHEEL */}
      {activeGameMode === 'wheel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          {/* Wheel Graphic Column */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              {/* Outer Golden/Brand Ring */}
              <div className="absolute inset-0 rounded-full border-8 border-[#004890] shadow-2xl shadow-blue-900/20 bg-slate-900 flex items-center justify-center">
                {/* Decorative border lights */}
                {[...Array(16)].map((_, i) => {
                  const angle = (i * 360) / 16;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 47 * Math.cos(rad);
                  const y = 50 + 47 * Math.sin(rad);
                  return (
                    <div
                      key={i}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className={`absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                        i % 2 === 0 ? 'bg-amber-400 animate-ping' : 'bg-white'
                      }`}
                    />
                  );
                })}
              </div>

              {/* The Spinning Wheel Canvas/SVG */}
              <svg
                viewBox="0 0 400 400"
                className="w-[90%] h-[90%] z-10 drop-shadow-md select-none"
              >
                <g ref={wheelRef} style={{ transformOrigin: '200px 200px' }}>
                  {wheelPrizes.map((prize, idx) => {
                    const startAngle = idx * segmentAngle;
                    const endAngle = startAngle + segmentAngle;

                    const rad1 = ((startAngle - 90) * Math.PI) / 180;
                    const rad2 = ((endAngle - 90) * Math.PI) / 180;

                    const x1 = 200 + 190 * Math.cos(rad1);
                    const y1 = 200 + 190 * Math.sin(rad1);
                    const x2 = 200 + 190 * Math.cos(rad2);
                    const y2 = 200 + 190 * Math.sin(rad2);

                    const pathData = `M 200,200 L ${x1},${y1} A 190,190 0 0,1 ${x2},${y2} Z`;
                    const textAngle = startAngle + segmentAngle / 2;

                    return (
                      <g key={prize.id}>
                        <path
                          d={pathData}
                          fill={prize.color}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        {/* Text inside segment */}
                        <g transform={`rotate(${textAngle} 200 200)`}>
                          <text
                            x="200"
                            y="75"
                            fill={prize.textColor}
                            fontSize="11"
                            fontWeight="800"
                            textAnchor="middle"
                            fontFamily="'Plus Jakarta Sans', sans-serif"
                            className="select-none uppercase tracking-tight"
                          >
                            {prize.text.length > 20 ? prize.text.slice(0, 18) + '...' : prize.text}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Top Pointer Needle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-lg pointer-events-none">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-[#ED1C24]" />
              </div>

              {/* Center Spin Button / Hub */}
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="absolute z-20 w-20 h-20 rounded-full bg-linear-to-b from-white to-slate-100 border-4 border-[#004890] shadow-xl flex flex-col items-center justify-center group active:scale-95 transition disabled:opacity-90 cursor-pointer"
              >
                <RotateCw
                  className={`w-5 h-5 text-[#ED1C24] transition-transform ${
                    isSpinning ? 'animate-spin' : 'group-hover:rotate-180'
                  }`}
                />
                <span className="text-[11px] font-black text-[#004890] uppercase mt-0.5">
                  {isSpinning ? 'QUAY...' : 'QUAY'}
                </span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Chạm vào nút <strong className="text-[#004890]">QUAY</strong> ở giữa để khởi động vòng quay
            </p>
          </div>

          {/* Right Side: Winner Banner & Prize Card */}
          <div className="lg:col-span-6 space-y-6">
            {wonPrize ? (
              <div className="bg-linear-to-br from-red-50 to-blue-50 p-6 rounded-3xl border-2 border-red-300 shadow-lg space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-500 text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      Chúc mừng Quý khách!
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Quý khách đã trúng thưởng
                    </h3>
                  </div>
                </div>

                {/* Prize Details Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-black text-[#004890]">
                      {wonPrize.text}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      Quà tại quầy
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{wonPrize.desc}</p>

                  {/* Coupon Code & Barcode */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Mã phiếu quà tặng (QR / Code):</p>
                      <p className="text-sm font-mono font-bold text-slate-900 tracking-wider">
                        {prizesHistory[0]?.uniqueCode || wonPrize.voucherCode}
                      </p>
                    </div>
                    <button
                      onClick={() => copyVoucher(prizesHistory[0]?.uniqueCode || wonPrize.voucherCode)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#004890] text-xs font-bold transition cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-100/60 rounded-xl text-xs text-[#004890] font-medium leading-relaxed">
                  💡 <strong>Cách nhận quà:</strong> Quý khách chỉ cần đọc mã phiếu quà tặng trên hoặc chụp lại màn hình đưa cho Giao dịch viên tại quầy để nhận quà trực tiếp!
                </div>

                <button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="w-full py-3 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Quay thêm lượt nữa</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#004890] text-white">
                    <Gift className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Cơ cấu giải thưởng hấp dẫn
                    </h3>
                    <p className="text-xs text-slate-500">
                      Hàng ngàn quà tặng hữu ích trao tay ngay tại quầy hôm nay
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {wheelPrizes.map((p) => (
                    <div key={p.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="font-semibold text-slate-800 line-clamp-1">{p.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white rounded-2xl border border-blue-200 space-y-2">
                  <p className="text-xs font-bold text-[#004890]">Lưu ý khi tham gia:</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Áp dụng cho tất cả khách hàng đến giao dịch tại quầy.</li>
                    <li>Mỗi khách hàng được nhận quà tặng tương ứng sau khi hoàn tất giao dịch.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Won prizes list */}
            {prizesHistory.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Lịch sử quà đã nhận ({prizesHistory.length}):
                </p>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {prizesHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#ED1C24]" />
                        <span className="font-bold text-slate-800">{item.text}</span>
                      </div>
                      <span className="font-mono text-slate-500 font-semibold">{item.uniqueCode}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GAME MODE 2: SMART FINANCE QUIZ */}
      {activeGameMode === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Quiz progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold text-[#004890] uppercase tracking-wider">
                  Câu hỏi {currentQuizIndex + 1} / {contentData.gameSection.quizQuestions.length}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#004890]">
                  Điểm hiện tại: {quizScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#004890] h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuizIndex + 1) / contentData.gameSection.quizQuestions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentQuiz.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQuiz.options.map((opt, idx) => {
                  const isSelected = selectedAnswerIndex === idx;
                  const isCorrect = idx === currentQuiz.correctIndex;

                  let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-50 border-red-500 text-red-900';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    💡 <strong>Giải thích:</strong> {currentQuiz.explanation}
                  </p>
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3 rounded-xl bg-[#004890] hover:bg-[#003875] text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{currentQuizIndex + 1 === contentData.gameSection.quizQuestions.length ? 'Xem kết quả' : 'Câu hỏi tiếp theo'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  Hoàn Thành Thử Thách!
                </h3>
                <p className="text-sm text-slate-600">
                  Quý khách đã trả lời đúng <strong className="text-[#004890]">{quizScore}</strong> / {contentData.gameSection.quizQuestions.length} câu hỏi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-[#004890] font-semibold max-w-md mx-auto">
                🎉 Quý khách đạt danh hiệu <strong>"Khách Hàng Thông Thái VietinBank"</strong>. Vui lòng nhận 1 phần quà lưu niệm trực tiếp tại quầy giao dịch!
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Chơi lại</span>
                </button>
                <button
                  onClick={() => setActiveGameMode('wheel')}
                  className="px-5 py-2.5 rounded-xl bg-[#004890] hover:bg-[#00356c] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Quay Thưởng May Mắn</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
