export const calculateExpectedValues = (rowHeader, colHeader, selectedOperator, setExpectedValues) => {
    let calculatedValues = {};
    for (let row = 0; row < rowHeader.length; row++) {
      for (let col = 0; col < colHeader.length; col++) {
        const key = `${row},${col}`;
        let value;
        switch (selectedOperator) {
          case '+':
            value = rowHeader[row] + colHeader[col];
            break;
          case '-':
            value = rowHeader[row] - colHeader[col];
            break;
          case 'X':
            value = rowHeader[row] * colHeader[col];
            break;
          case '/':
            value = colHeader[col] !== 0 ? parseFloat((rowHeader[row] / colHeader[col]).toFixed(2)) : 'NaN';
            break;
          default:
            value = '';
        }
        calculatedValues[key] = value;
      }
    }
    setExpectedValues(calculatedValues);
  };
  