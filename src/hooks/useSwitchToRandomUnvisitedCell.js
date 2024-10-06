import { useCallback } from 'react';

export const useSwitchToRandomUnvisitedCell = (rowHeader, colHeader, visitedCells, setFocusRowIndex, setFocusColIndex, setIsSubmitEnabled) => {
  const switchToRandomUnvisitedCell = useCallback(() => {
    const totalCells = rowHeader.length * colHeader.length;

    if (visitedCells.size === totalCells) {
      setIsSubmitEnabled(true);
      setFocusRowIndex(null);
      setFocusColIndex(null);
      return;
    }

    let randomIndex = Math.floor(Math.random() * totalCells);
    let cellFound = false;

    for (let i = 0; i < totalCells; i++) {
      const currentIndex = (randomIndex + i) % totalCells;
      const rowIndex = Math.floor(currentIndex / colHeader.length);
      const colIndex = currentIndex % colHeader.length;
      const key = `${rowIndex},${colIndex}`;

      if (!visitedCells.has(key)) {
        setFocusRowIndex(rowIndex);
        setFocusColIndex(colIndex);
        cellFound = true;
        break;
      }
    }

    if (!cellFound) {
      setFocusRowIndex(null);
      setFocusColIndex(null);
      setIsSubmitEnabled(true);
    }
  }, [visitedCells, rowHeader, colHeader]);

  return { switchToRandomUnvisitedCell };
};
