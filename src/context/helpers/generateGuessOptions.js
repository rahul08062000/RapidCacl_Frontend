export const generateGuessOptions = (expectedValue) => {
    let options = [expectedValue];
    while (options.length < 6) {
      const randomOption = Math.floor(Math.random() * 100);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };
  