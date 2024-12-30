import { useState } from "react";
import Button from "./Button";
import formatDollars from "../functions/formatDollars";
import DollarInput from "./DollarInput";
import { FaPlus } from "react-icons/fa";

function AddCredits({ setBankroll }) {

  const options = [500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button text="Add Credits" icon={<FaPlus />} onClick={() => setOpen(true)} className='absolute top-2 right-2' />
      {
        open && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">

            <div>
              <DollarInput value={value} onChange={setValue} className='mb-2' />
              <button
                onClick={() => {
                  setValue('');
                  setBankroll(prev => prev + parseFloat(value));
                  setOpen(false);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
              >
                Add
              </button>
            </div>
            <ul className='grid gap-3' style={{ gridTemplateColumns: `repeat(auto-fill, minmax(70px, 1fr))` }}>
              {
                options.map(denomination => {
                  return (
                    <button key={denomination} onClick={() => {
                      setBankroll(prev => prev + denomination)
                      setOpen(false)
                    }} className={`text-black text-lg font-extrabold text-center bg-gray-200 py-4 rounded-lg`}>{formatDollars(denomination)}</button>
                  )
                })
              }
            </ul>
            <div className="flex justify-end mt-3">
              <button onClick={() => setOpen(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default AddCredits;