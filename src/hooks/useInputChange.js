// /src/components/hooks/useInputChange.js

import { useCallback } from 'react';
import { checkAllCellsFilled } from '../../helpers/checkAllCellsFilled';

export const useInputChange = (inputValues, setInputValues, setVisitedCells, rowHeader, colHeader, setIsSubmitEnabled) => {
  const handleInputChange = useCallback(
    (rowIndex, colIndex, value) => {
      const key = `${rowIndex},${colIndex}`;
      setInputValues((prevValues) => {
        const newValues = { ...prevValues, [key]: value };
        setVisitedCells((prev) => new Set(prev).add(key));  
        
        // Call the helper function to check if all cells are filled
        checkAllCellsFilled(newValues, rowHeader, colHeader, setIsSubmitEnabled);
        
        return newValues;
      });
    },
    [inputValues, setInputValues, setVisitedCells, rowHeader, colHeader, setIsSubmitEnabled]
  );

  return { handleInputChange };
};
