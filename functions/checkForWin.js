import { ranks } from '../data/cards';

function checkForWin(cards) {
  if (!Array.isArray(cards) || cards.length !== 5) {
    throw new Error('Must provide exactly 5 cards');
  }

  const counts = cards.reduce((acc, card) => {
    acc.suits[card.suit] = (acc.suits[card.suit] || 0) + 1;
    acc.ranks[card.rank] = (acc.ranks[card.rank] || 0) + 1;
    return acc;
  }, { suits: {}, ranks: {} });

  const flush = Object.values(counts.suits).some(count => count === 5);
  const { straight, royal } = checkStraight(counts.ranks);

  if (royal && flush) {
    return 'Royal Flush';
  }
  else if (flush && straight) {
    return 'Straight Flush';
  }
  else if (flush) {
    return 'Flush';
  }
  else if (straight) {
    return 'Straight';
  }
  else if (Object.values(counts.ranks).some(count => count === 4)) {
    return 'Four of a Kind';
  }
  else if (Object.values(counts.ranks).some(count => count === 3)) {
    if (Object.values(counts.ranks).some(count => count === 2)) {
      return 'Full House';
    }
    return 'Three of a Kind';
  }
  else if (Object.values(counts.ranks).filter(count => count === 2).length === 2) {
    return 'Two Pair';
  }
  else if (Object.keys(counts.ranks).some(rank => counts.ranks[rank] === 2 && ['Jack', 'Queen', 'King', 'Ace'].includes(rank))) {
    return 'Jacks or Better';
  }
  return '';
}

function checkStraight(values) {
  if (Object.keys(values).length !== 5) {
    return { straight: false, royal: false };
  }
  else if (values[5] || values[10]) {
    let count = 0
    for (let i = 0; i < ranks.length; i++) {
      if (count === 5) break;
      if (values[ranks[i]]) count += 1;
      else count = 0;
    }
    if (count === 4 && values['Ace']) return { straight: true, royal: true }
    else if (count === 5) return { straight: true, royal: false }
    else return { straight: false, royal: false }
  }
  else return { straight: false, royal: false }
}

export default checkForWin;