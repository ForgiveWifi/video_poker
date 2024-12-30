import React from "react";
import { RiPokerHeartsFill } from "react-icons/ri";
import { RiPokerDiamondsFill } from "react-icons/ri";
import { RiPokerClubsFill } from "react-icons/ri";
import { GiClubs } from "react-icons/gi";
import { BsSuitSpadeFill } from "react-icons/bs";

function Card({ rank, suit, selected, onClick }) {

  const suits = {
    Hearts: { icon: <RiPokerHeartsFill />, color: 'red' },
    Diamonds: { icon: <RiPokerDiamondsFill />, color: 'red' },
    Clubs: { icon: <GiClubs />, color: 'black' },
    Spades: { icon: <BsSuitSpadeFill />, color: 'black' }
  };

  const icon = suits[suit]?.icon;
  const color = suits[suit]?.color;

  return (
    <div className="relative items-center">
      <div className={`mb-1 text-center text-white text-2xl font-semibold select-none ${selected ? 'visible' : 'invisible'}`}>HOLD</div>
      <button onClick={onClick} className={`flex flex-col items-center justify-center w-32 h-48 bg-white rounded-lg shadow-md ${selected ? 'outline outline-[6px] outline-green-500' : ''}`}>
        <div className="font-extrabold select-none font-sans" style={{ fontSize: 50, color: color || 'black', fontWeight: 'bold' }}>{rank === '10' ? 10 : rank.charAt(0)}</div>
        {icon && React.cloneElement(icon, { fontSize: 40, fill: color || 'white' })}
      </button>
    </div>
  );
}

export default Card;