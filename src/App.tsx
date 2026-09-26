/**
 * VietinBank Customer Counter Interaction Web App (Kiosk Tương Tác Quầy)
 * Features:
 * 1. Giải đáp thắc mắc khách hàng (FAQ & Smart Interactive Assistant)
 * 2. Tải App VietinBank iPay (QR Download & Onboarding)
 * 3. Thử thách Game (Lucky Wheel with GSAP & Smart Financial Quiz)
 * 4. Tính lãi tiền gửi (Savings Calculator)
 * 5. Lịch trả nợ khoản vay (Loan Amortization Schedule)
 * 6. Sản phẩm dịch vụ nổi bật (Featured Products Showcase)
 * 7. Điểm giao dịch (Branch & R-ATM 24/7 Locator)
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FaqSection } from './components/FaqSection';
import { IpaySection } from './components/IpaySection';
import { GameSection } from './components/GameSection';
import { SavingsSection } from './components/SavingsSection';
import { LoanSection } from './components/LoanSection';
import { ProductsSection } from './components/ProductsSection';
import { BranchesSection } from './components/BranchesSection';
import { CallStaffModal } from './components/CallStaffModal';
import { ProductInquiryModal } from './components/ProductInquiryModal';
import { Footer } from './components/Footer';
import { BellRing, ChevronUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('faq');
  const [isCallStaffOpen, setIsCallStaffOpen] = useState<boolean>(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<any | null>(null);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-800 font-sans selection:bg-[#004890] selection:text-white">
      {/* Top Fixed Header with Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onCallStaff={() => setIsCallStaffOpen(true)}
      />

      {/* Main Kiosk Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Hero Banner (Always accessible at top or on overview) */}
        <HeroBanner onSelectTab={handleSelectTab} />

        {/* Dynamic Section rendering based on activeTab */}
        <div className="transition-all duration-300">
          {activeTab === 'faq' && (
            <FaqSection onCallStaff={() => setIsCallStaffOpen(true)} />
          )}

          {activeTab === 'ipay' && (
            <IpaySection />
          )}

          {activeTab === 'game' && (
            <GameSection />
          )}

          {activeTab === 'savings' && (
            <SavingsSection />
          )}

          {activeTab === 'loan' && (
            <LoanSection />
          )}

          {activeTab === 'products' && (
            <ProductsSection
              onSelectProduct={(prod) => setSelectedProductForInquiry(prod)}
            />
          )}

          {activeTab === 'branches' && (
            <BranchesSection />
          )}
        </div>
      </main>

      {/* Floating Kiosk Quick Action Button (Gọi nhân viên) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsCallStaffOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-linear-to-r from-[#ED1C24] to-[#C1121F] hover:from-[#C1121F] hover:to-[#9B0D18] text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-500/30 active:scale-95 transition-all cursor-pointer group"
          title="Mời Giao dịch viên hỗ trợ trực tiếp tại quầy"
        >
          <BellRing className="w-4 h-4 animate-bounce" />
          <span className="hidden md:inline">Mời Giao dịch viên hỗ trợ</span>
          <span className="md:hidden">Gọi nhân viên</span>
        </button>
      </div>

      {/* Modals */}
      <CallStaffModal
        isOpen={isCallStaffOpen}
        onClose={() => setIsCallStaffOpen(false)}
      />

      <ProductInquiryModal
        product={selectedProductForInquiry}
        onClose={() => setSelectedProductForInquiry(null)}
      />

      {/* Bottom Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
