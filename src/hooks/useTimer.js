import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const useTimer = () => {
  const { isSubmitted, isFormVisible, timerReset, showScoreboard, finalTime, setFinalTime } = useContext(AppContext);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // Function to format the time into 00:00:00 format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Start the timer when the grid becomes visible
  useEffect(() => {
    if (!isFormVisible && !isSubmitted && !showScoreboard) {
      startTimer();
    }
  }, [isFormVisible, isSubmitted]);

  // Stop the timer and store formatted final time when the game is submitted
  useEffect(() => {
    if (isSubmitted && !showScoreboard) {
      stopTimer();
      setFinalTime(formatTime(time)); // Capture the formatted time when submitted
    }
  }, [isSubmitted, time]);

  // Log finalTime on change
  // useEffect(() => {
  //   if (finalTime) {
  //     console.log("This is the final time", finalTime); // Log after finalTime is updated
  //   }
  // }, [finalTime]);

  const startTimer = () => {
    if (timerRef.current) return; // Prevent multiple intervals from running
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; // Reset the ref to null after stopping
    }
  };

  const resetTimer = () => {
    stopTimer(); // Ensure the timer is stopped before resetting
    setTime(0);  // Reset time to zero for the new game
    // DO NOT reset finalTime here, so that it's preserved for the scoreboard
    startTimer(); // Start the timer again after reset
  };

  return {
    time: formatTime(time), // Current running time (formatted)
    finalTime, // Final time when submitted (formatted)
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
