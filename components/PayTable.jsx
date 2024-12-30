import payouts from '../data/payouts';

function PayTable() {
  return (
    <div className='bg-blue-800 clear-none w-full'>
      <table>
        <tbody>
          {Object.keys(payouts).map((key, index) => (
            <tr key={index} className='bg-blue-900 p-2'>
              <td>{key}</td>
              <td>{payouts[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayTable;