export const getFibonacciNumbers = (num: any) => {
  if (num < 1 || num > 19) {
    alert("Please enter a positive integer between 1 and 19.");
    return;
  }
  let array: number[] = [1, 1];
  for (let i = 2; i < num; i++) {
    array.push(array[i - 2] + array[i - 1]);
  }

  return array;
}