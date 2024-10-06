// /src/helpers/checkAllCellsFilled.js

export const checkAllCellsFilled = (newInputValues, rowHeader, colHeader, setIsSubmitEnabled) => {
    const totalCells = rowHeader.length * colHeader.length;
    if (Object.keys(newInputValues).length === totalCells) {
      setIsSubmitEnabled(true);
    }
  };
  