import BigNumber from 'bignumber.js';

export const formatToNumberForm = (num) => {
  const bigNumber = new BigNumber(num);
  return bigNumber.toString(10); // Convert to a string in base 10 without commas
};

// export const formatFromNumberForm = (num) => {
//   const bigNumber = new BigNumber(num);
  
//   // Determine if the number should be displayed in scientific notation
//   if (bigNumber.isGreaterThanOrEqualTo(new BigNumber(1e+6)) || bigNumber.isLessThanOrEqualTo(new BigNumber(1e-6))) {
//     return bigNumber.toExponential();
//   }

//   // Return the number as a plain string if it's not extremely large or small
//   return bigNumber.toString(10);
// };