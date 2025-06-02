
import { useState } from "react";

export default function PropertyInvestmentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [marketValue, setMarketValue] = useState(0);
  const [depositPercent, setDepositPercent] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [rent, setRent] = useState(0);
  const [rentPeriod, setRentPeriod] = useState("weekly");
  const [vacancyWeeks, setVacancyWeeks] = useState(0);

  const [rates, setRates] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [bodyCorp, setBodyCorp] = useState(0);
  const [propertyMgmt, setPropertyMgmt] = useState(0);

  const annualExpenses = rates + insurance + maintenance + bodyCorp + propertyMgmt;

  const getAnnualRent = () => {
    const weeks = rentPeriod === "weekly" ? 52 : rentPeriod === "fortnightly" ? 26 : rentPeriod === "monthly" ? 12 : 1;
    return rent * weeks * ((52 - vacancyWeeks) / 52);
  };

  const equityAtPurchase = purchasePrice * (depositPercent / 100);
  const grossYield = (getAnnualRent() / purchasePrice) * 100;
  const netYield = ((getAnnualRent() - annualExpenses) / purchasePrice) * 100;
  const loanAmount = purchasePrice * (1 - depositPercent / 100);
  const cashFlow = getAnnualRent() - annualExpenses - (loanAmount * (interestRate / 100));
  const belowMarketPercent = ((marketValue - purchasePrice) / marketValue) * 100;

  const cell = "border border-[#0A2342] p-2 text-left text-[#0A2342] font-mono";
  const headerCell = cell + " font-bold bg-yellow-200 text-center";
  const inputClass = "float-right w-24 text-center border border-gray-300 font-mono";

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono">
      <h1 className="text-xl font-bold mb-4 text-[#0A2342] font-mono">
        PROPERTY WIZARD🧙‍♂️ <span className="float-right italic">V2.0.2</span>
      </h1>

      <div className="grid grid-cols-2 border border-[#0A2342]">
        <div className={headerCell}>Annual Expenses</div>
        <div className={headerCell}>Purchase Details</div>

        <div className={cell}>Rates <input type="number" step="1000" value={rates} onChange={e => setRates(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Purchase Price <input type="number" step="1000" value={purchasePrice} onChange={e => setPurchasePrice(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>

        <div className={cell}>Insurance <input type="number" step="1000" value={insurance} onChange={e => setInsurance(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Market Value <input type="number" step="1000" value={marketValue} onChange={e => setMarketValue(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>

        <div className={cell}>Maintenance <input type="number" step="1000" value={maintenance} onChange={e => setMaintenance(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Deposit <input type="number" step="1" min="0" value={depositPercent} onChange={e => setDepositPercent(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} />%</div>

        <div className={cell}>Body Corporate <input type="number" step="1000" value={bodyCorp} onChange={e => setBodyCorp(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={headerCell}>Performance Summary</div>

        <div className={cell}>Property Management <input type="number" step="1000" value={propertyMgmt} onChange={e => setPropertyMgmt(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Below Market Value <span className={inputClass}>{belowMarketPercent.toFixed(2)}%</span></div>

        <div className={cell}>Vacant Weeks Per Year <input type="number" step="1000" value={vacancyWeeks} onChange={e => setVacancyWeeks(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Equity at Purchase <span className={inputClass}>${equityAtPurchase.toFixed(2)}</span></div>

        <div className={cell}>Loan Amount <span className={inputClass}>${loanAmount.toFixed(2)}</span></div>
        <div className={cell}><i>Gross Yield</i> <span className={inputClass}>{grossYield.toFixed(2)}%</span></div>

        <div className={cell}>Interest Rate <input type="number" step="1000" value={interestRate} onChange={e => setInterestRate(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} />%</div>
        <div className={cell}><i>Net Yield</i> <span className={inputClass}>{netYield.toFixed(2)}%</span></div>

        <div className={cell}>Rent <input type="number" step="1000" value={rent} onChange={e => setRent(+e.target.value)} onFocus={e => e.target.select()} className={inputClass} /></div>
        <div className={cell}>Annual Cash Flow <span className={inputClass}>${cashFlow.toFixed(2)}</span></div>

        <div className={cell}>Rent Period <select value={rentPeriod} onChange={e => setRentPeriod(e.target.value)} className={inputClass}>
          <option value="weekly">Weekly</option>
          <option value="fortnightly">Fortnightly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select></div>
        <div className={cell}><i>Weekly Cash Flow</i> <span className={inputClass}>${(cashFlow / 52).toFixed(2)}</span></div>
      </div>
    </div>
  );
}
