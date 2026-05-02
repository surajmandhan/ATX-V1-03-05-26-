"use client";
import React, { useState } from 'react';

const AddressModal = ({ isOpen, onClose, onSave, currentAddress = null }) => {
  const [formData, setFormData] = useState(currentAddress || {
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: 'India',
    firstName: '',
    lastName: '',
    phone: '',
    company: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const usaStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* MODAL CONTENT */}
      <div className="relative bg-[#16161a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest text-[#e6e6eb]">
            {currentAddress?.id ? 'UPDATE ADDRESS' : 'ADD NEW ADDRESS'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">First Name</label>
              <input 
                required name="firstName" value={formData.firstName} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Last Name</label>
              <input 
                required name="lastName" value={formData.lastName} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Address / Street</label>
              <input 
                required name="address1" value={formData.address1} onChange={handleChange} placeholder="House No, Street, Area"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Apartment, suite, etc. (Optional)</label>
              <input 
                name="address2" value={formData.address2} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">City</label>
              <input 
                required name="city" value={formData.city} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">State</label>
              <select 
                required name="province" value={formData.province} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all appearance-none"
              >
                <option value="" className="bg-[#16161a]">Select State</option>
                {usaStates.map(state => (
                  <option key={state} value={state} className="bg-[#16161a]">{state}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">PIN Code</label>
              <input 
                required name="zip" value={formData.zip} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Phone</label>
              <input 
                required name="phone" value={formData.phone} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#6366f1] outline-none transition-all"
              />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              type="button" onClick={onClose}
              className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl font-['Bebas_Neue'] tracking-widest hover:bg-white/10 transition-all"
            >
              CANCEL
            </button>
            <button 
              type="submit" disabled={loading}
              className="flex-1 px-8 py-4 bg-[#6366f1] text-white font-bold rounded-2xl font-['Bebas_Neue'] tracking-widest hover:bg-[#22d3ee] hover:text-black transition-all disabled:opacity-50"
            >
              {loading ? 'SAVING...' : 'SAVE ADDRESS'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AddressModal;
