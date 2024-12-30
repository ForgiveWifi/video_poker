import { PiCurrencyDollarBold } from "react-icons/pi";

function DollarInput({ value = 0, onChange, length, className }) {

  const handleInputChange = (event) => {
    const { value } = event.currentTarget
    if (value === "") return onChange(0)
    onChange(parseInt(value.replace(/[^\d]/g, "")))
  };

  function formatCents(cents) {
    return (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className={className}>
      <div className="relative">
        <input
          type="text"
          value={formatCents(value)}
          onChange={handleInputChange}
          placeholder="$0.00"
          className='w-full p-1 pl-7 text-md text-black outline-none border-2 border-black rounded-lg font-bold'
          style={{ paddingTop: 6 }}
          maxLength={length}
        />
        <div className="absolute flexbox h-full left-2 top-[9px]">
          <PiCurrencyDollarBold style={{ fontSize: 20, fill: 'black' }} />
        </div>
      </div>
    </div>
  );
};

export default DollarInput;
