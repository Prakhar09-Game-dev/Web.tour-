import React, { useState } from 'react';
import type { GalleryItem } from '../types.js';

interface GalleryViewProps {
  items: GalleryItem[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Vehicles', 'Varanasi', 'Pilgrimage'];
  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          REAL FLEET & DESTINATION ASSETS
        </span>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] mb-3">
          Vimal Tour & Travellers Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          Authentic vehicle photographs, Varanasi heritage ghats, and spiritual moments captured along sacred pilgrim trails.
        </p>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0d1c32] text-white shadow-sm'
                  : 'bg-white text-[#44474d] border border-[#e2e2e2] hover:bg-[#f3f3f4]'
              }`}
            >
              {cat === 'All' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden border border-[#e2e2e2] shadow-xs group"
          >
            <div
              className="h-64 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url('${item.imageUrl}')` }}
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-headline font-bold text-sm text-[#0d1c32]">
                  {item.title}
                </h3>
                <span className="text-[10px] font-bold text-[#735c00] bg-[#fed65b]/30 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-[#44474d] leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
