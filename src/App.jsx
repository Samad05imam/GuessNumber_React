import React, { useState } from 'react';
import './App.css';


function App() {
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRangeSubmit = (e) => {
    e.preventDefault();

    const min = parseInt(minRange, 10);
    const max = parseInt(maxRange, 10);

    if (isNaN(min) || isNaN(max)) {
      setFeedback('Please enter valid numbers for the range.');
      return;
    }

    if (min >= max) {
      setFeedback('Minimum range should be less than maximum range.');
      return;
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setTargetNumber(randomNum);
    setAttempts(0);
    setFeedback('Range set! Start guessing...');
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();

    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setAttempts(prev => prev + 1);
    
    if(userGuess<minRange || userGuess>maxRange){
      setFeedback("Enter number between the range !")
      alert("Number belong netween the range !!")
      return;
    }

    if (userGuess === targetNumber) {
      setFeedback(`Correct! You guessed it right 🎉 `);
    } else if (userGuess < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }

    setGuess('');
  };

  return (
    <>
    <div className='body bg-blue-950 w-screen flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl p-4 text-white title font-sans'>Guess the Number</h1>
      <div className="container bg-blue-900 p-4 w-120 h-1/2 border-white rounded-md border-2">
        <form onSubmit={handleRangeSubmit} className="range">
          <h2 className='text-xl title-basic mb-3 text-white'>Select the range you want to play between:</h2>
          <div className='range-div flex justify-start gap-10 items-center'>
            
            <input
              className='bg-white name text-xl border-black mb-3 border-2 w-36 p-2 rounded-md'
              type="number"
              placeholder="Min"
              value={minRange}
              onChange={(e) => setMinRange(e.target.value)}
            />
            <input
              className='bg-white name text-xl border-black mb-3 border-2 w-36 p-2 rounded-md'
              type="number"
              placeholder="Max"
              value={maxRange}
              onChange={(e) => setMaxRange(e.target.value)}
            />
            <button
              className='bg-white name rounded-lg font-bold text-blue-800 mb-3 p-2'
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        {targetNumber !== null && (
          <form  className="inputs" onSubmit={handleGuessSubmit}>
            <input
              className='bg-white guess-blank text-xl border-black border-2 w-full p-3 rounded-md'
              type="number"
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button
              className='bg-white guess-submit rounded-lg font-bold text-blue-800 mt-3 p-2'
              type="submit"
            >
              Guess
            </button>
          </form>
        )}

        <div className="content p-3 text-white">
          <div className="attempt text-2xl">Attempts: {attempts}</div>
          <div className="feedback text-2xl">{feedback}</div>
        </div>
      </div>
      <footer className='text-white text-center mt-8'>
      © 2025 Samad Imam
    </footer>
    </div>
    </>
  );
}

export default App;