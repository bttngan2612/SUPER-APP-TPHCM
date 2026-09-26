import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  CreditCard, 
  Crown, 
  ShieldCheck, 
  Tag, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface ProductsSectionProps {
  onSelectProduct: (product: any) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return contentData.productsSection.items;
    }
    return contentData.productsSection.items.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#004890] text-xs font-bold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>TÍNH NĂNG 6: SẢN PHẨM & DỊCH VỤ NỔI BẬT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {contentData.productsSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {contentData.productsSection.subtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {contentData.productsSection.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-[#004890] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#004890] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Product Visual Asset */}
              <div className="relative bg-slate-100 p-4 border-b border-slate-100 overflow-hidden flex items-center justify-center h-48">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#ED1C24] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  {prod.tag}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#004890] transition">
                    {prod.title}
                  </h3>
                  <p className="text-xs font-bold text-[#009FE3] mt-1">
                    {prod.highlight}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prod.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Đặc quyền nổi bật:
                  </p>
                  <ul className="space-y-1.5">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectProduct(prod)}
                className="w-full py-3 rounded-2xl bg-blue-50 hover:bg-[#004890] text-[#004890] hover:text-white font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>{prod.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
