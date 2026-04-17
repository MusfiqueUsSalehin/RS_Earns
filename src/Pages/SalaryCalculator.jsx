import React, { useState } from 'react';

import { IoChevronBack } from 'react-icons/io5';

const SalaryCalculator = ({ onBack }) => {
  const [inputs, setInputs] = useState({
    connTarget: 70, connAchieved: 0,
    convTarget: 20, convAchieved: 0,
    qaTarget: 100, qaAchieved: 0,
    otHours: 0,
    leaves: 0,
  });

  const BASIC = 10000;
  const LEAVE_RATE = 384.62;
  const OT_RATE = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value === '' ? '' : parseFloat(value) });
  };

  const getVal = (val) => parseFloat(val) || 0;

  // KPI Calculation Logic
  const calcKPI = (achieved, target, maxMoney) => {
    if (target === 0) return 0;
    const performanceRatio = getVal(achieved) / getVal(target);
    // Cap at 100% efficiency (maxMoney)
    return Math.min(performanceRatio, 1) * maxMoney;
  };

  const connPay = calcKPI(inputs.connAchieved, inputs.connTarget, 2400);
  const convPay = calcKPI(inputs.convAchieved, inputs.convTarget, 2400);
  const qaPay = calcKPI(inputs.qaAchieved, inputs.qaTarget, 1200);

  const totalKPI = connPay + convPay + qaPay;
  const totalOT = getVal(inputs.otHours) * OT_RATE;
  const totalDeduction = getVal(inputs.leaves) * LEAVE_RATE;
  const netSalary = BASIC + totalKPI + totalOT - totalDeduction;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#D70F64] mb-6 transition-colors font-medium group">
        <IoChevronBack className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
        
        Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#D70F64] p-6 text-white text-center">
          <h2 className="text-2xl font-bold italic tracking-tight">RS agent's salary Calculator</h2>
          <p className="text-pink-100 text-sm opacity-90">Calculate your monthly earnings based on performance metrics</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* KPI Section with Target vs Achieved */}
          <div className="space-y-6">
            <h3 className="text-gray-800 font-bold flex items-center">
              <span className="w-2 h-6 bg-[#D70F64] rounded-full mr-2"></span>
              Monthly KPI Targets
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'Connection Ratio', target: 'connTarget', achieved: 'connAchieved', max: 2400 },
                { label: 'Conversion Rate', target: 'convTarget', achieved: 'convAchieved', max: 2400 },
                { label: 'QA Score', target: 'qaTarget', achieved: 'qaAchieved', max: 1200 },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-gray-700">{kpi.label}</span>
                    <span className="text-[10px] bg-pink-100 text-[#D70F64] px-2 py-1 rounded-md font-bold uppercase">Max: {kpi.max} BDT</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Monthly Target %</label>
                      <input 
                        type="number" name={kpi.target} value={inputs[kpi.target]} onChange={handleChange}
                        className="w-full p-3 text-black bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 outline-none font-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Your Achievement %</label>
                      <input 
                        type="number" name={kpi.achieved} value={inputs[kpi.achieved]} onChange={handleChange}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D70F64] outline-none font-black text-[#D70F64]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-gray-800 font-bold">OT Days</h3>
              <input type="number" name="otHours" value={inputs.otHours} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none font-black text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-gray-800 font-bold">Unpaid Leaves</h3>
              <input type="number" name="leaves" value={inputs.leaves} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-black text-red-600" />
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between text-sm border-b border-gray-800 pb-2">
                <span className="text-gray-500">Fixed Basic</span>
                <span className="font-mono text-lg">{BASIC.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Calculated KPI</span>
                <span className="text-green-400 font-mono">+{totalKPI.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">OT Pay</span>
                <span className="text-green-400 font-mono">+{totalOT.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pb-4">
                <span className="text-gray-400">Attendance Deductions</span>
                <span className="text-red-500 font-mono">-{totalDeduction.toFixed(2)}</span>
              </div>

              <div className="pt-6 border-t-2 border-[#D70F64] flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Monthly Net Payable</p>
                  <p className="text-5xl font-black text-[#D70F64]">{netSalary.toFixed(0)} <span className="text-sm font-normal text-white/30">BDT</span></p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setInputs({ ...inputs, connAchieved: 0, convAchieved: 0, qaAchieved: 0, otHours: 0, leaves: 0 })} className="bg-gray-800 p-3 rounded-full hover:text-red-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                  <button onClick={() => window.print()} className="bg-gray-800 p-3 rounded-full hover:text-[#D70F64] transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;