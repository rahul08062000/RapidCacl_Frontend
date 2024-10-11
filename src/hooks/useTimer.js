import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const useTimer = () => {
  const { isSubmitted, showScoreboard, finalTime, setFinalTime } = useContext(AppContext);
  const [time, setTime] = useState(0);  // Stores the timer value in seconds
  const [isPaused, setIsPaused] = useState(true); // Initially set to true, so the timer is paused until "Start" is clicked
  const [isStarted, setIsStarted] = useState(false); // Tracks whether the timer has been started at all
  const timerRef = useRef(null);

  // Function to format the time into 00:00:00 format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Start the timer when explicitly triggered
  const startTimer = () => {
    if (timerRef.current) return; 
    setIsStarted(true); 
    setIsPaused(false); 

    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Stop the timer and store the formatted final time when the game is submitted
  useEffect(() => {
    if (isSubmitted && !showScoreboard) {
      stopTimer();
      setFinalTime(formatTime(time)); 
    }
  }, [isSubmitted, time]);

  // Stop the timer (called when the game is submitted or the user pauses)
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; 
    }
  };

  // Pause the timer (equivalent to stop but used for user pause)
  const pauseTimer = () => {
    stopTimer();
    setIsPaused(true); 
  };

  // Resume the timer (restart the timer after it has been paused)
  const resumeTimer = () => {
    if (isPaused) {
      setIsPaused(false); 
      startTimer();
    }
  };

  // Reset the timer (use this for restarting the game)
  const resetTimer = () => {
    stopTimer(); 
    setTime(0);  
    setIsPaused(true); 
    setIsStarted(false);
  };

  return {
    time: formatTime(time), 
    finalTime, 
    isPaused, 
    isStarted, 
    startTimer,
    stopTimer,
    pauseTimer, 
    resumeTimer, 
    resetTimer,
  };
};

export default useTimer;
