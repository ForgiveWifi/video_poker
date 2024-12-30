'use client'

import { useState } from 'react'
import Card from '../components/Card'
import PlayButton from '../components/PlayButton'
import { Deck } from '../classes/Deck'
import PayTable from '../components/PayTable'
import DenominationSelect from '../components/DenominationSelect'
import Bankroll from '../components/Bankroll'
import AddCredits from '../components/AddCredits'
import checkForWin from '../functions/checkForWin'
import payouts from '../data/payouts'
import formatDollars from '../functions/formatDollars'

export default function VideoPoker() {

  const [playing, setPlaying] = useState(false)
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])
  const [selected, setSelected] = useState([])
  const [hand, setHand] = useState('')
  const [credits, setCredits] = useState(true)
  const [bankroll, setBankroll] = useState(500)
  const [denomination, setDenomiation] = useState(5)

  const not_enough_money = bankroll < denomination

  function placeBet() {
    setBankroll(prev => prev - denomination)
  }

  function startGame() {
    setPlaying(true)
    placeBet()
    const deck = new Deck()
    const starting_hand = deck.deal(5)
    const hand = checkForWin(starting_hand)
    setHand(hand)
    const remaining = deck.deck()
    setCards(starting_hand)
    setDeck(remaining)
    setSelected(new Array(5).fill(false))
  }

  function drawRandomCards(count) {
    const indexes = {}

    while (Object.keys(indexes).length < count) {
      const random = Math.floor(Math.random() * deck.length)
      if (!indexes[random]) {
        indexes[random] = true
      }
    }

    return Object.keys(indexes).map(index => deck[index])
  }

  function draw() {
    const n = selected.filter(selected => !selected).length
    const random_cards = drawRandomCards(n)

    let count = 0
    const new_cards = []

    selected.forEach((isSelected, i) => {
      if (isSelected) {
        new_cards.push(cards[i])
      }
      else {
        new_cards.push(random_cards[count])
        count += 1
      }
    })

    setCards(new_cards)
    const hand = checkForWin(new_cards)
    setHand(hand)
    const winnings = payouts[hand] * denomination || 0
    setBankroll(prev => prev + winnings)
    setPlaying(false)
  }

  function handleButton() {
    if (playing) draw()
    else startGame()
  }

  function clickCard(index) {
    setSelected(prev => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

  return (
    <div className="flex flex-col items-center justify-center bg-blue-950 w-screen h-screen overflow-hidden">
      <div className='flex flex-col items-center'>
        {/* <PayTable /> */}
        <AddCredits setBankroll={setBankroll} />
        <h1 className='text-xl text-white h-12 mb-4'>{hand}</h1>
        <div className='flex flex-row gap-4 mb-10'>
          {
            cards.length === 0 ?
              [...Array(5)].map((_, index) => (
                <Card key={index} rank="?" suit="?" selected={false} />
              )) :
              cards.map((card, index) => (
                <Card key={index} rank={card.rank} suit={card.suit} selected={selected[index]} onClick={playing ? () => clickCard(index) : null} />
              ))
          }
        </div>
        <PlayButton onClick={handleButton} play={cards.length === 0} draw={playing} disabled={not_enough_money && !playing} />
        <div className='flex flex-row items-center justify-center absolute bottom-0 w-full p-4'>
          <div className='flex flex-col items-center gap-1'>
            <Bankroll bankroll={bankroll} denomination={denomination} credits={credits} setCredits={setCredits} />
            <DenominationSelect denomination={denomination} setDenomination={setDenomiation} bankroll={bankroll} disabled={playing} />
          </div>
        </div>
        <button onClick={() => setCredits(prev => !prev)} className="absolute bottom-4 left-4 bg-white text-black font-bold py-2 px-4 rounded">
          Bet: {credits ? 1 : formatDollars(denomination)}
        </button>
      </div>
    </div>
  );
}
