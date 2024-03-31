import React, { useState } from 'react';

const IndexStrategy = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [allocation, setAllocation] = useState('');
  const [tokensData, setTokensData] = useState([]);
  const [totalAllocation, setTotalAllocation] = useState(0);

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  const handleAllocationChange = (e) => {
    setAllocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedToken && allocation && totalAllocation + parseInt(allocation) <= 100) {
      const newTokensData = [...tokensData, { tokenName: selectedToken, allocation: parseInt(allocation) }];
      setTokensData(newTokensData);
      setTotalAllocation(totalAllocation + parseInt(allocation));
      setSelectedToken('');
      setAllocation('');
    }
  };

  console.log(tokensData)

  // const tokenNames = tokensData.map((names) => names.tokenName);
  const allocations = tokensData.map((names) => names.allocation);
  console.log(allocations)

  const handleClearTokensData = () => {
    setTokensData([]);
    setTotalAllocation(0);
  };

  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit}>
          <div className='m-10 flex flex-col'> 
            <select className='m-5'>
              <option value=''>Deposit Token Address</option>
              <option value='USDC'>USDC</option>
              <option value='ETH'>ETH</option>
            </select>
            <select className='m-2' value={selectedToken} onChange={handleTokenChange}>
              <option value=''>Select a token</option>
              <option value='WBTC'>WBTC</option>
              <option value='ETH'>ETH</option>
              <option value='ARB'>ARB</option>
              <option value='GMX'>GMX</option>
              <option value='GNS'>GNS</option>
            </select>
            <input type='number' value={allocation} onChange={handleAllocationChange} placeholder='Allocation (%)' min='0' max={100 - totalAllocation} />
            <button className='text-white' type="submit">Add Token</button>
            <button className='text-white' type="button" onClick={handleClearTokensData}>Clear Tokens</button>
          </div>
          <h2 className='text-white'>Selected Tokens:</h2>
          <ul className='text-white'>
            {tokensData.map((tokenData, index) => (
              <li key={index}>{tokenData.tokenName}: {tokenData.allocation}%</li>
            ))}
          </ul>
          <p className='text-white '>Total Allocation: {totalAllocation}%</p>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default IndexStrategy;
