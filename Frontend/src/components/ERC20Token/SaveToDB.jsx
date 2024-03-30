import React from 'react';

const SaveToDB = ({ handleSaveToDB, tokenName, symbol, decimal, supply, minted, isConfirmedNext }) => {
  return (
    <div>
      {minted && isConfirmedNext && (
        <div className="flex flex-col m-5 bg-slate-600">
          <span>Token Name: {tokenName}</span>
          <span>Symbol: {symbol}</span>
          <span>Decimals: {decimal}</span>
          <span>Supply: {supply}</span>
        </div>
      )}
      <button onClick={handleSaveToDB} className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Save to Database</button>
    </div>
  );
};

export default SaveToDB;
