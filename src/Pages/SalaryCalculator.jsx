import React, { useState } from 'react';

const SalaryCalculator = ({ onBack }) => {
  // Set initial state to 0 so it doesn't default to 100% achievement
  const [inputs, setInputs] = useState({
    connRatio: 0,
    convRate: 0,
    qa: 0,
    otHours: 0,
    leaves: 0,
  });

  const BASIC = 10000;
  const LEAVE_RATE = 384.62;
  const OT_RATE = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // We use an empty string check to allow users to clear the input field easily
    setInputs({ ...inputs, [name]: value === '' ? '' : parseFloat(value) });
  };

  // Calculation Logic (Handling empty strings as 0)
  const getVal = (val) => parseFloat(val) || 0;

  const connPay = (2400 * getVal(inputs.connRatio)) / 100;
  const convPay = (2400 * getVal(inputs.convRate)) / 100;
  const qaPay = (1200 * getVal(inputs.qa)) / 100;
  
  const totalKPI = connPay + convPay + qaPay;
  const totalOT = getVal(inputs.otHours) * OT_RATE;
  const totalDeduction = getVal(inputs.leaves) * LEAVE_RATE;
  
  const netSalary = BASIC + totalKPI + totalOT - totalDeduction;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-[#D70F64] mb-6 transition-colors font-medium group"
      >
        <svg className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#D70F64] p-6 text-white text-center">
          <h2 className="text-2xl font-bold italic tracking-tight">Earnings Calculator</h2>
          <p className="text-pink-100 text-sm opacity-90">RSA Performance Parameter</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* KPI Section */}
          <div className="space-y-4">
            <h3 className="text-gray-800 font-bold flex items-center">
              <span className="w-2 h-6 bg-[#D70F64] rounded-full mr-2"></span>
              KPI Percentages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Conn. Ratio %', name: 'connRatio', placeholder: '0' },
                { label: 'Conv. Rate %', name: 'convRate', placeholder: '0' },
                { label: 'QA Score %', name: 'qa', placeholder: '0' }
              ].map((item) => (
                <div key={item.name}>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">{item.label}</label>
                  <input 
                    type="number" 
                    name={item.name} 
                    value={inputs[item.name]} 
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className="w-full p-4 text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D70F64] focus:bg-white outline-none transition-all font-black text-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* OT & Leaves Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-800 font-bold mb-3">OT Days</h3>
              <input 
                type="number" name="otHours" value={inputs.otHours} onChange={handleChange}
                placeholder="0"
                className="w-full p-4 text-green-500 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D70F64] outline-none transition-all font-black text-lg"
              />
            </div>
            <div>
              <h3 className="text-gray-800 font-bold mb-3">Leaves</h3>
              <input 
                type="number" name="leaves" value={inputs.leaves} onChange={handleChange}
                placeholder="0"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-black text-lg text-red-600"
              />
            </div>
          </div>

          {/* Final Results Black Card */}
          <div className="mt-8 bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute -right-6 -bottom-6 opacity-5 w-40 h-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Foodpanda_logo.svg/1200px-Foodpanda_logo.svg.png" alt="" className="brightness-0 invert" />
             </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Base Amount</span>
                <span className="font-mono text-xl">{BASIC.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">KPI Earnings</span>
                <span className="text-green-400">+{totalKPI.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">OT Earnings</span>
                <span className="text-green-400">+{totalOT.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pb-4">
                <span className="text-gray-400">Total Deductions</span>
                <span className="text-red-500">-{totalDeduction.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t-2 border-[#D70F64] flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">Net Payable Salary</p>
                  <p className="text-4xl font-black text-[#D70F64]">
                    {netSalary.toFixed(2)} <span className="text-xs text-white opacity-50 font-normal">BDT</span>
                  </p>
                </div>
                
                {/* Reset Button */}
                <button 
                  onClick={() => setInputs({ connRatio: 0, convRate: 0, qa: 0, otHours: 0, leaves: 0 })}
                  className="bg-gray-800 hover:bg-red-900/30 p-3 rounded-full transition-colors group"
                  title="Reset All">
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button 
                  onClick={() => window.print()} 
                  className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  title="Print Slip">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-[10px] mt-8 uppercase tracking-widest font-bold opacity-50">
        Confidential • foodpanda RSA internal tool
      </p>
    </div>
  );
};

export default SalaryCalculator;