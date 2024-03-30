import React from 'react';

const TokenForm = ({
  handleSubmit,
  handleTokenNameChange,
  handleSymbolChange,
  handleDecimal,
  tokenName,
  symbol,
  decimal,
  isPendingSubmit,
  isConfirmingSubmit,
}) => {
  return (
    <form className="flex flex-col gap-6 bg-gray-100 p-8 shadow-md w-[490px] h-[350px] border border-blue-100" onSubmit={handleSubmit}>
      <input required className="bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white" type="text" placeholder="Token Name" onChange={handleTokenNameChange} value={tokenName} />
      <input required className="bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white" type="text" placeholder="Symbol" onChange={handleSymbolChange} value={symbol} />
      <input required className="bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white" type="number" placeholder="Decimals" onChange={handleDecimal} value={decimal} />
      <button disabled={isPendingSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" type="submit">{isPendingSubmit ? 'Confirming' : 'Submit'}</button>
      {isConfirmingSubmit && <div>Waiting for confirmation...</div>}
    </form>
  );
};

export default TokenForm;
