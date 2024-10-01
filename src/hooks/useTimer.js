import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const useTimer = () => {
  const { isSubmitted, isFormVisible, timerReset } = useContext(AppContext);
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
    if (!isFormVisible && !isSubmitted) {
      startTimer();
    }
    return () => stopTimer(); // Cleanup timer on unmount
  }, [isFormVisible, isSubmitted]);

  // Stop the timer when the game is submitted
  useEffect(() => {
    if (isSubmitted) {
      stopTimer();
    }
  }, [isSubmitted]);

  // Reset the timer when the game is restarted
  useEffect(() => {
    if (timerReset) {
      resetTimer();
    }
  }, [timerReset]);

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
    setTime(0);  // Reset time to zero
    startTimer(); // Start the timer again after reset
  };

  return { time: formatTime(time), startTimer, stopTimer, resetTimer };
};

export default useTimer;
