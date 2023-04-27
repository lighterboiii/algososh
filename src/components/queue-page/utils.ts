export const generateArray = () => {
  const size = Math.floor(Math.random() * (8 - 2)) + 2;
  const array = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push(randomNumber);
  }

  return array;
};