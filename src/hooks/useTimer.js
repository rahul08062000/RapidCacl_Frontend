import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useTimer = () => {
  const { time, startTimer, stopTimer, resetTimer } = useContext(AppContext);

  // Function to format the time into 00:00:00 format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  return { time: formatTime(time), startTimer, stopTimer, resetTimer };
};

export default useTimer;
