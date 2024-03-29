import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useTransactionReceipt, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import abi from '../Contracts/abi/factory.json';
import ercabi from '../Contracts/abi/ERC20.json';

const ERC20Token = () => {
  const { address } = useAccount();

  const { data: hashNext, writeContract: writeContractNext, isPending: isPendingNext } = useWriteContract();
  const { data: hashSubmit, writeContract: writeContractSubmit, isPending: isPendingSubmit } = useWriteContract();

  const [tokenAdd, setTokenAdd] = useState('');
  const [decimal, setDecimal] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [minted, setMinted] = useState(false);

  const handleDecimal = (e) => {
    setDecimal(e.target.value);
  };

  const handleTokenNameChange = (e) => {
    setTokenName(e.target.value);
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSupplyChange = (e) => {
    setSupply(e.target.value);
  };

  const handleSubmit_next = (e) => {
    e.preventDefault();
    try {
      writeContractNext({
        abi: ercabi,
        address: tokenAdd,
        functionName: '_mint',
        args: [
          address,
          parseVal(),
        ]
      });
    } catch (error) {
      console.error('An error occurred', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      writeContractSubmit({
        abi,
        address: '0x360E40E234B94a6E549ae9080E0CBe03Aaa43CA9',
        functionName: 'createToken',
        args: [
          tokenName,
          symbol,
          decimal,
          address,
        ]
      });
    } catch (error) {
      console.error('Error executing contract:', error);
    }
  };

  const handleSaveToDB = async () => {
    try {
      const response = await fetch('http://localhost:3000/erc20/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: tokenName,
          symbol: symbol,
          decimals: decimal,
          creator: address,
          tokenAddress: tokenAdd,
        }),
      });
      if (response) {
        console.log('Token data saved to database');
      } else {
        console.error('Failed to save token data to database');
      }
    } catch (error) {
      console.error('Error saving token data:', error);
    }
  };

  const { isLoading: isConfirmingNext, isSuccess: isConfirmedNext } = useWaitForTransactionReceipt({
    hash: hashNext,
  });

  const { isLoading: isConfirmingSubmit, isSuccess: isConfirmedSubmit } = useWaitForTransactionReceipt({
    hash: hashSubmit,
  });

  const tokenData = useTransactionReceipt({ hash: hashSubmit });

  useEffect(() => {
    const fetchTokenAddress = async () => {
      if (hashSubmit && isConfirmedSubmit) {
        const token = tokenData.data.logs[0].data
        const tokenAddress = "0x" + token.substring(26);
        console.log(tokenAddress)
        setTokenAdd(tokenAddress);
        setMinted(true);
      }
    };
    fetchTokenAddress();
  }, [hashSubmit, isConfirmedSubmit]);

  const parseVal = () => {
    const num = ethers.utils.parseUnits((supply.toString()), decimal);
    return num;
  }

  return (
    <div className="flex justify-center items-center h-screen w-[80%]  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      {!isConfirmedSubmit && (
        <form className="flex flex-col gap-6  bg-gray-100 p-8  shadow-md w-[490px]  h-[350px]  border border-blue-100  " onSubmit={handleSubmit}>
          <input required className='bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white' type="text" placeholder='Token Name' onChange={handleTokenNameChange} value={tokenName} />
          <input required className='bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white' type="text" placeholder='Symbol' onChange={handleSymbolChange} value={symbol} />
          <input required className='bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white' type="number" placeholder='Decimals' onChange={handleDecimal} value={decimal} />
          <button disabled={isPendingSubmit} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300' type="submit">{isPendingSubmit ? 'Confirming' : 'Submit'}</button>
          {isConfirmingSubmit && <div>Waiting for confirmation...</div>}
          {isConfirmedSubmit && <div>Transaction confirmed.</div>}
        </form>
      )}

      {isConfirmedSubmit && (
        <div className='flex flex-col gap-6 bg-blue-700 p-8 rounded-lg shadow-md'>
          {!isConfirmedNext && (<form className='flex flex-col gap-6 mt-6' onSubmit={handleSubmit_next}>
            <input className='bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white' type="number" placeholder='Supply' onChange={handleSupplyChange} value={supply} />
            <button disabled={isPendingNext} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300' type="submit">{isPendingNext ? 'Minting' : 'Mint'}</button>
            {isConfirmingNext && <div>Waiting for confirmation...</div>}
            {isConfirmedNext && <div>Transaction confirmed.</div>}
          </form>)}
          {minted && isConfirmedNext && (
            <div>
              <div className='flex flex-col m-5 bg-' >
                <span>Token Name: {tokenName}</span>
                <span>Symbol: {symbol}</span>
                <span>Decimals: {decimal}</span>
                <span>Supply: {supply}</span>
              </div>
              <button onClick={handleSaveToDB} className='bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300'>Save to Database</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ERC20Token;
