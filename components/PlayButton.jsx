import React, { useState } from 'react';

const PlayButton = ({ onClick, play, draw, disabled }) => {
  return (
    <button onClick={onClick} className={`w-36 py-4 rounded-md text-lg font-semibold bg-white text-black ${disabled ? 'opacity-50' : ''}`} disabled={disabled}>
      {play ? 'Play' : draw ? 'Deal' : 'Play Again'}
    </button>
  );
};

export default PlayButton;