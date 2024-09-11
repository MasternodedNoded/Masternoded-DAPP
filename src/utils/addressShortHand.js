const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };
  
  export const shortenAddress = (address) => {
    const firstFive = address?.substring(0, 5);
    const lastFive = address?.substring(address.length - 5);
    return `${firstFive}...${lastFive}`;
  };
