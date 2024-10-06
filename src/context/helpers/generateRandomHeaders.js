export const generateRandomHeaders = (gridSize, difficulty, setRowHeader, setColHeader) => {
    let randomRowHeader = [];
    let randomColHeader = [];
  
    if (difficulty === 'Easy') {
      randomRowHeader = Array.from({ length: gridSize }, () => Math.floor(Math.random() * 9) + 1);
      randomColHeader = Array.from({ length: gridSize }, () => Math.floor(Math.random() * 9) + 1);
    } else if (difficulty === 'Medium') {
      const isRowTwoDigit = Math.random() < 0.5;
      randomRowHeader = Array.from({ length: gridSize }, () =>
        isRowTwoDigit ? Math.floor(Math.random() * 90) + 10 : Math.floor(Math.random() * 9) + 1
      );
      randomColHeader = Array.from({ length: gridSize }, () =>
        isRowTwoDigit ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 90) + 10
      );
    } else if (difficulty === 'Hard') {
      randomRowHeader = Array.from({ length: gridSize }, () => Math.floor(Math.random() * 90) + 10);
      randomColHeader = Array.from({ length: gridSize }, () => Math.floor(Math.random() * 90) + 10);
    }
  
    setRowHeader(randomRowHeader);
    setColHeader(randomColHeader);
  };
  