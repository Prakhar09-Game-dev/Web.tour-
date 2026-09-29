import React from 'react';
import type { Vehicle } from '../types.js';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookNow: (vehicleId: string) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  onBookNow
}) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#e2e2e2] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="relative h-64 w-full bg-cover bg-center" style={{ backgroundImage: `url('${vehicle.imageUrl}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fed65b] text-[#0d1c32] px-2 py-0.5 rounded">
              {vehicle.type}
            </span>
            <h2 className="font-headline font-bold text-2xl text-white mt-1">
              {vehicle.name}
            </h2>
            <span className="text-xs text-[#b9c7e4]">{vehicle.model}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
            {vehicle.description}
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-[#f3f3f4] rounded-xl">
              <span className="material-symbols-outlined text-[#735c00] text-[20px] block mb-1">
                group
              </span>
              <span className="text-xs font-bold text-[#0d1c32] block">
                {vehicle.seatingCapacity} Passengers
              </span>
              <span className="text-[10px] text-[#75777e]">Seating Capacity</span>
            </div>
            <div className="p-3 bg-[#f3f3f4] rounded-xl">
              <span className="material-symbols-outlined text-[#735c00] text-[20px] block mb-1">
                ac_unit
              </span>
              <span className="text-xs font-bold text-[#0d1c32] block">
                {vehicle.acType}
              </span>
              <span className="text-[10px] text-[#75777e]">Climate Control</span>
            </div>
            <div className="p-3 bg-[#f3f3f4] rounded-xl">
              <span className="material-symbols-outlined text-[#735c00] text-[20px] block mb-1">
                luggage
              </span>
              <span className="text-xs font-bold text-[#0d1c32] block">
                {vehicle.luggageCapacity} Large Bags
              </span>
              <span className="text-[10px] text-[#75777e]">Boot Space</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs text-[#0d1c32] mb-2 uppercase tracking-wider">
              Vehicle Features & Inclusions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#44474d]">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">
                    check
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f9f9f9] p-4 rounded-xl border border-[#e2e2e2] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#75777e] block">Tariff Rule</span>
              <span className="font-headline font-bold text-base text-[#0d1c32]">
                ₹{vehicle.perKmRate}/km • Local 8hr/80km: ₹{vehicle.baseFare}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookNow(vehicle.id);
              }}
              className="px-6 py-2.5 bg-[#000000] text-white font-bold text-xs rounded-xl hover:bg-[#0d1c32] transition-colors cursor-pointer"
            >
              Book This Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
