import React from 'react';
import NavBar from '../components/NavBar';
import Image from "next/image";
import HaggleChip from "@/public/chip.svg";

const page = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center relative gap-5 overflow-scroll bg-[#1d4325] font-impact font-black '>
        <NavBar />

        {/* <div className='mt-[10vh] h-[60vh] w-[60vh] bg-[url("/chip.svg")] bg-cover text-center pt-[32.5vh] text-[#1b4381] text-[8vh]'>
          Rules
        </div> */}
        <div className='relative w-[50vw] max-w-[80vh] bg-cover text-center pt-[14vh] text-[#ffdebd] text-[2vw] md:text-[2.5vw]'>
          <Image 
            src={HaggleChip}
            width={900}
            height={900}
            alt="Haggle Logo"
          />
        <div className="absolute bottom-[19%] xxs:bottom-[22%] xs:bottom-[25%] left-[50%] -translate-x-[50%] pl-[1vh] pr-[1vh] text-[#1b4381] xs:text-[7vh] xxs:text-[7vw]">Rules</div>
      </div>
        <hr style={{borderColor:"#fff2e5", minWidth:"75%", minHeight:"20px"}}></hr>
        <div className="bg-[#1b4381] w-[75vw] rounded-[20px] border-[#5c6ead] border-2">
          <div className='text-center xs:text-[3vh] xxs:text-[3vw] p-[5vh] text-[#ffdebd] font-light '>
          <span className='xs:text-[8vh] xxs:text-[8vw]'>How to Play </span>
          <br></br><br></br>
          <span className='xs:text-[5vh] xxs:text-[5vw]'>The Auction Stage:</span>
          <br></br>
          At the start of each round the deck is shuffled and each player draws 5 cards and begin the Haggle stage. 
          <br></br><br></br>
          <span className='xs:text-[5vh] xxs:text-[5vw]'>The Haggle Stage:</span><br></br>
          Players will determine if they will or won't haggle. upon both players determining if they will or wont haggle, haggling players will show their hand, and shuffle all cards except for their lowest card, into the deck and draw 4 cards. Players then Move on to the Bidding Stage.<br></br>
          <br></br>
          <span className='xs:text-[5vh] xxs:text-[5vw]'>The Bidding Stage:</span><br></br>
          Both players select a card from their hand and places it face down, after both players place cards face down they flip the cards and the player with the bigger card wins that bid. The cards in the bid are then placed aside to no longer be in play for the rest of the game. This continues until all cards have been played, at which point the player who won the most bids wins the round. The deck is then shuffled, and both players draw a new hand and start another Haggle stage. The first player to win 2 rounds wins.<br></br>
          <br></br>
          <span className='xs:text-[5vh] xxs:text-[5vw]'>Card Rules:</span><br></br>
          Ace is valued at 1, unless against a face card at which point it is treated as 14<br></br>
          Face cards are valued as follows: Jack = 11, Queen = 12, King = 13<br></br>
          During Haggling, Ace is treated as a 1<br></br>
          In the event of 2 cards with the same value being played the greater suit will win. (Club &gt; Diamond &gt; Spade &gt; Heart)<br></br>
          </div>
        </div>
        <div className='h-[50%] text-[10vh]'><br></br></div>
    </div>
  )
}

export default page;
