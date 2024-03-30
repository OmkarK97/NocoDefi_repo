import React from 'react';

const TokenMinting = ({
  handleSubmit_next,
  handleSupplyChange,
  supply,
  isPendingNext,
  isConfirmingNext,
  isConfirmedNext,
}) => {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-lg shadow-md">
      {!isConfirmedNext && (
        <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit_next}>
          <input className="bg-gray-200 rounded-md px-4 py-2 outline-none focus:bg-white" type="number" placeholder="Supply" onChange={handleSupplyChange} value={supply} />
          <button disabled={isPendingNext} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" type="submit">{isPendingNext ? 'Minting' : 'Mint'}</button>
          {isConfirmingNext && <div>Waiting for confirmation...</div>}
          {isConfirmedNext && <div>Transaction confirmed.</div>}
        </form>
      )}
    </div>
  );
};

export default TokenMinting;
