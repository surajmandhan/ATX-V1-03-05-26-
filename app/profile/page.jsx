"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { customerUpdate, customerAddressCreate } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { userData, customerToken, setUserData, router } = useAppContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Address States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");
  const [province, setProvince] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [addrFirstName, setAddrFirstName] = useState("");
  const [addrLastName, setAddrLastName] = useState("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
      setAddrFirstName(userData.firstName || "");
      setAddrLastName(userData.lastName || "");
    }
  }, [userData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await customerUpdate(customerToken, {
        firstName,
        lastName,
        email,
      });

      if (response.customer) {
        setUserData({ ...userData, ...response.customer });
        toast.success("Profile updated successfully!");
      } else {
        const error = response.customerUserErrors[0]?.message || "Update failed";
        toast.error(error);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await customerAddressCreate(customerToken, {
        address1,
        address2,
        city,
        zip,
        country,
        province,
        company,
        phone,
        firstName: addrFirstName,
        lastName: addrLastName
      });

      if (response.customerAddress) {
        toast.success("Address added successfully!");
        setShowAddressForm(false);
        // Reset form
        setAddress1("");
        setAddress2("");
        setCity("");
        setZip("");
        setProvince("");
        setCompany("");
        setPhone("");
        
        // Refresh customer data
        const { getCustomer } = await import("@/lib/shopify");
        const freshData = await getCustomer(customerToken);
        if (freshData) setUserData(freshData);
      } else {
        const error = response.customerUserErrors[0]?.message || "Failed to add address";
        toast.error(error);
      }
    } catch (error) {
      console.error("Add address error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!customerToken) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  return (
    <div className="home-wrapper min-h-screen flex flex-col bg-[#0b0b0f]">
      <Navbar />
      <div className="flex-grow flex flex-col items-center pt-40 pb-20 px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-1 bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#22d3ee] flex items-center justify-center text-black font-bold text-4xl shadow-[0_0_20px_rgba(99,102,241,0.4)] mb-6">
                {firstName?.charAt(0)}
              </div>
              <h1 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide uppercase leading-none">
                {firstName} {lastName}
              </h1>
              <p className="text-white/40 font-['Space_Mono'] text-[10px] mt-2 uppercase">{email}</p>
              
              <div className="w-full h-[1px] bg-white/10 my-8"></div>
              
              <div className="w-full space-y-4">
                <button className="w-full py-3 px-4 bg-white/5 rounded-xl text-white font-['Space_Mono'] text-xs text-left hover:bg-white/10 transition-all flex items-center justify-between group">
                  <span>ORDERS</span>
                  <i className="fa-solid fa-chevron-right text-[10px] opacity-30 group-hover:opacity-100 transition-all"></i>
                </button>
                <button className="w-full py-3 px-4 bg-[#6366f1]/20 border border-[#6366f1]/50 rounded-xl text-white font-['Space_Mono'] text-xs text-left flex items-center justify-between">
                  <span>SETTINGS</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Personal Details Form */}
            <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-widest mb-6 flex items-center gap-3">
                <i className="fa-solid fa-user-pen text-[#6366f1] text-lg"></i>
                PERSONAL DETAILS
              </h2>
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-2 uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-2 uppercase tracking-widest">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
                  />
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3 bg-[#6366f1] hover:bg-[#22d3ee] text-white hover:text-black font-bold rounded-xl transition-all disabled:opacity-50 font-['Bebas_Neue'] tracking-widest text-lg"
                  >
                    {loading ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                </div>
              </form>
            </div>

            {/* Address Management */}
            <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-widest flex items-center gap-3">
                  <i className="fa-solid fa-location-dot text-[#22d3ee] text-lg"></i>
                  RESEARCH ADDRESSES
                </h2>
                <button 
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-[10px] font-['Space_Mono'] text-[#22d3ee] hover:text-white transition-all underline underline-offset-4 tracking-tighter"
                >
                  {showAddressForm ? "CANCEL" : "+ ADD NEW ADDRESS"}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-white/5 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="col-span-2">
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Country/region</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none appearance-none"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">First Name</label>
                    <input
                      type="text"
                      value={addrFirstName}
                      onChange={(e) => setAddrFirstName(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Last Name</label>
                    <input
                      type="text"
                      value={addrLastName}
                      onChange={(e) => setAddrLastName(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Company (Optional)</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Address</label>
                    <input
                      type="text"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                      placeholder="Street, house number, etc."
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Apartment, suite, etc. (Optional)</label>
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">State</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none appearance-none"
                    >
                      <option value="">Select a state</option>
                      {country === "India" ? (
                        <>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Delhi">Delhi</option>
                        </>
                      ) : (
                        <option value="Other">Other</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">PIN code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-1 uppercase tracking-widest">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="For delivery updates"
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-[#22d3ee] outline-none"
                    />
                  </div>

                  <div className="col-span-2 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-[#22d3ee] text-black font-bold rounded-xl font-['Bebas_Neue'] tracking-widest text-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                      {loading ? "ADDING..." : "ADD ADDRESS"}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {userData?.addresses?.length > 0 ? (
                  userData.addresses.map((addr) => (
                    <div key={addr.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-[#22d3ee]/30 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center text-[#22d3ee] border border-white/5 shadow-inner">
                          <i className="fa-solid fa-house-medical text-sm"></i>
                        </div>
                        <div>
                          <p className="text-white text-sm font-['Space_Mono'] font-bold">
                            {addr.firstName} {addr.lastName} {addr.company && <span className="text-white/30 font-normal">({addr.company})</span>}
                          </p>
                          <p className="text-white/60 text-xs font-['Space_Mono'] mt-1">{addr.address1}</p>
                          {addr.address2 && <p className="text-white/40 text-[10px] font-['Space_Mono']">{addr.address2}</p>}
                          <p className="text-white/40 text-[10px] font-['Space_Mono'] uppercase mt-1">
                            {addr.city}, {addr.province} {addr.zip} • {addr.country}
                          </p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all p-2">
                        <i className="fa-solid fa-trash-can text-sm"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-white/20 font-['Space_Mono'] text-xs uppercase tracking-widest">No research addresses saved</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
