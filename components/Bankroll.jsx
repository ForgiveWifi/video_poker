import formatDollars from '../functions/formatDollars';

const Bankroll = ({ bankroll, denomination, credits, setCredits }) => {
  return (
    <div onClick={() => setCredits(prev => !prev)} style={{ cursor: 'pointer' }}>
      {credits ? `${Math.floor(bankroll / denomination)} credits` : `${formatDollars(bankroll, true)}`}
    </div>
  );
};

export default Bankroll;