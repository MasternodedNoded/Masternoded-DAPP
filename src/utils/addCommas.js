export function formatNumberWithCommas(number) {
  if (number) {
    
    const parts = number.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";
  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  }
}
