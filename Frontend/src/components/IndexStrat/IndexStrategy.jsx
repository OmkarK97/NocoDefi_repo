import React, { useState, useEffect } from 'react';
import ContractLogic from './ContractLogic';

const IndexStrategy = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [allocation, setAllocation] = useState('');
  const [tokensData, setTokensData] = useState([]);
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [swapFees, setSwapFees] = useState({});

  useEffect(() => {
    // Initialize swap fees
    setSwapFees({
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x82af49447d8a07e3bd95bd0d56f35241523fbab1': 500,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a': 3000,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3082CC23568eA640225c2467653dB90e9250AaA0': 3000,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x912CE59144191C1204E64559FE8253a0e49E6548': 500,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8': 10000,
    });
  }, []);

  const tokenNameMap = {
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1': 'WBTC',
    '0x3082CC23568eA640225c2467653dB90e9250AaA0': 'RDNT',
    '0x912CE59144191C1204E64559FE8253a0e49E6548': 'ARB',
    '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a': 'GMX',
    '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8': 'GRAIL',
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  const handleAllocationChange = (e) => {
    setAllocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedToken && allocation && totalAllocation + parseInt(allocation) <= 100) {
      const existingTokenIndex = tokensData.findIndex((token) => token.tokenName === selectedToken);
      if (existingTokenIndex !== -1) {
        const updatedTokensData = [...tokensData];
        updatedTokensData[existingTokenIndex].allocation += parseInt(allocation);
        setTokensData(updatedTokensData);
      } else {
        let fees = 0;
        if (tokenAddress === '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1') {
          const pair = `${tokenAddress}-${selectedToken}`;
          fees = swapFees[pair] || 0;
        }
        const newTokensData = [...tokensData, { tokenName: selectedToken, allocation: parseInt(allocation), swapFees: fees }];
        setTokensData(newTokensData);
      }
      setTotalAllocation(totalAllocation + parseInt(allocation));
      setSelectedToken('');
      setAllocation('');
      if (totalAllocation + parseInt(allocation) === 100) {
        setShowSubmitButton(true);
      }
    }
  };

  const handleClearTokensData = () => {
    setTokensData([]);
    setTotalAllocation(0);
  }

  const handleTokenAddress = (e) => {
    if (totalAllocation === 0) {
      setTokenAddress(e.target.value)
    } else {
      alert('Cannot set token address')
    }
  };

  const tokenArr = tokensData.map((tokenName) => tokenName.tokenName)
  console.log(tokenArr)
  const AllocationArr = tokensData.map((allocation) => allocation.allocation)
  const SwapFees = tokensData.map((fees) => fees.swapFees)

  const handleSubmitFinalTokens = () => {
    console.log('Final Tokens Data:', tokensData);
  };

  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-40 px-10 w-[980px] h-[600px]  -mt-12   ">
            <div className="outer-div flex items-center justify-center w-[440px] h-[360px]">
              <div className=" flex flex-col justify-center gap-6 bg-gray-900 w-[430px] h-[350px] ">
                <select className="select mx-5 py-2 px-2 cursor-pointer font-semibold  border-none" onChange={handleTokenAddress}>
                  <option value=''>Deposit Token Address</option>
                  <option value='0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'>USDC</option>
                  <option value='0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'>ETH</option>
                </select>
                <select className="select mx-5 py-2 px-2 cursor-pointer  border-none font-semibold" value={selectedToken} onChange={handleTokenChange}>
                  <option value=''>Select a token</option>
                  <option value='0x82af49447d8a07e3bd95bd0d56f35241523fbab1'>WBTC</option>
                  <option value='0x3082CC23568eA640225c2467653dB90e9250AaA0'>RDNT</option>
                  <option value='0x912CE59144191C1204E64559FE8253a0e49E6548'>ARB</option>
                  <option value='0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a'>GMX</option>
                  <option value='0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8'>GRAIL</option>
                </select>
                <input className="select mx-5 py-2 px-2 font-semibold border-none" type='number' value={allocation} onChange={handleAllocationChange} placeholder='Allocation (%)' min='0' max={100 - totalAllocation} />
                <button className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  " type="submit">Add Token</button>
                <button className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  " type="button" onClick={handleClearTokensData}>Clear Tokens</button>
                {showSubmitButton && (
                  <button className='text-white' type="button" onClick={handleSubmitFinalTokens}>
                    <ContractLogic tokenAddress={tokenAddress} tokenArr={tokenArr} AllocationArr={AllocationArr} SwapFees={SwapFees} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl tracking-wider border-b-2 border-gray-500">Selected Tokens:</h2>
              <ul className="text-white font-bold text-xl tracking-wider mt-2">
                {tokensData.map((tokenData, index) => (
                  <li key={index}>
                    {tokenData.tokenName}: {tokenData.allocation}%
                    {tokenData.swapFees && <span> - Swap Fees: {tokenData.swapFees}</span>}
                  </li>
                ))}
              </ul>
              <p className="text-white font-bold text-xl mt-2 tracking-wider   border-b-2 border-gray-500">Total Allocation: {totalAllocation}%</p>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default IndexStrategy;
