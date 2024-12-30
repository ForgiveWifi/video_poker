import { useState } from 'react'
import denominations from '../data/denominations'
import formatDollars from '../functions/formatDollars'

function DenomiationSelect({ denomination, setDenomination, bankroll, disabled }) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={!disabled ? () => setOpen(true) : null} className="bg-white text-black font-bold py-2 px-4 rounded">
        {formatDollars(denomination)}
      </button>
      {
        open && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <ul className='grid gap-3' style={{ gridTemplateColumns: `repeat(auto-fill, minmax(70px, 1fr))` }}>
              {
                denominations.map(denomination => {
                  const blocked = denomination > bankroll
                  return (
                    <button key={denomination} onClick={() => {
                      setDenomination(denomination)
                      setOpen(false)
                    }} disabled={blocked} className={`text-black text-lg font-extrabold text-center bg-gray-200 py-4 rounded-lg ${blocked ? 'opacity-20' : ''}`}>{formatDollars(denomination)}</button>
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
  )
}

export default DenomiationSelect;