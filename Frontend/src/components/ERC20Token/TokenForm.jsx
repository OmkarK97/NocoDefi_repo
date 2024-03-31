import React from "react";

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
    <div className="outer-div flex justify-center items-center w-[500px] h-[410px]">
      <form
        className="flex flex-col justify-between gap-6 bg-gray-900 p-8 shadow-md w-[490px] h-[400px] "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-8 mt-6">
          <div className="input-box relative w-full ">
            <input
              required
              className="w-[100%] text-xl bg-gray-800 px-4 py-2 outline-none text-white "
              type="text"
              onChange={handleTokenNameChange}
              value={tokenName}
            />
            <span className="tracking-wider">Token Name</span>
          </div>

          <div className="input-box2 relative w-full ">
            <input
              required
              className="w-[100%] text-xl bg-gray-800 px-4 py-2 outline-none text-white "
              type="text"
              onChange={handleSymbolChange}
              value={symbol}
            />
            <span className="tracking-wider">Symbol</span>
          </div>

          <div className="input-box2 relative w-full ">
            <input
              required
              className="w-[100%] text-xl bg-gray-800 px-4 py-2 outline-none text-white "
              type="number"
              onChange={handleDecimal}
              value={decimal}
            />
            <span className="tracking-wider">Decimals</span>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            disabled={isPendingSubmit}
            className="submit-btn tracking-wide text-xl  text-white font-bold py-2 px-4 transition duration-500  "
            type="submit"
          >
            {isPendingSubmit ? "Confirming" : "Submit"}
          </button>
        </div>
        {isConfirmingSubmit && <div>Waiting for confirmation...</div>}
      </form>
    </div>
  );
};

export default TokenForm;
