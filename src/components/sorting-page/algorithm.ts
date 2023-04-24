export const randomArr = () => {
  const size = Math.floor(Math.random() * (17 - 3)) + 3;
  const array = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
    array.push(randomNumber);
  }

  return array;
};