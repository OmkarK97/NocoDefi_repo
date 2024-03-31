import React, { useState } from "react";
import usdc from "../../assets/usdc.png";

const IndexStrategy = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [allocation, setAllocation] = useState("");
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
    if (
      selectedToken &&
      allocation &&
      totalAllocation + parseInt(allocation) <= 100
    ) {
      const newTokensData = [
        ...tokensData,
        { tokenName: selectedToken, allocation: parseInt(allocation) },
      ];
      setTokensData(newTokensData);
      setTotalAllocation(totalAllocation + parseInt(allocation));
      setSelectedToken("");
      setAllocation("");
    }
  };

  console.log(tokensData);

  // const tokenNames = tokensData.map((names) => names.tokenName);
  const allocations = tokensData.map((names) => names.allocation);
  console.log(allocations);

  const handleClearTokensData = () => {
    setTokensData([]);
    setTotalAllocation(0);
  };

  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className="flex justify-center items-center h-screen">
        <form className=" " onSubmit={handleSubmit}>
          <div className="flex items-center gap-40 px-10 w-[980px] h-[600px]  -mt-12   ">
            <div className="outer-div flex items-center justify-center w-[440px] h-[360px]">
              <div className=" flex flex-col justify-center gap-6 bg-gray-900 w-[430px] h-[350px] ">
                <select className="select mx-5 py-2 px-2 cursor-pointer font-semibold  border-none     ">
                  <option hidden value="">
                    Deposit Token Address
                  </option>
                  <option value="USDC">
                    <img src={usdc} className="h-[15px] w-[15px]" alt="usdc" />{" "}
                    USDC
                  </option>
                  <option value="ETH">ETH</option>
                </select>
                <select
                  className="select mx-5 py-2 px-2 cursor-pointer  border-none font-semibold    "
                  value={selectedToken}
                  onChange={handleTokenChange}
                >
                  <option hidden value="">
                    Select a token
                  </option>
                  <option value="WBTC">WBTC</option>
                  <option value="ETH">ETH</option>
                  <option value="ARB">ARB</option>
                  <option value="GMX">GMX</option>
                  <option value="GNS">GNS</option>
                </select>
                <input
                  className="select mx-5 py-2 px-2 font-semibold   border-none     "
                  type="number"
                  value={allocation}
                  onChange={handleAllocationChange}
                  placeholder="Allocation (%)"
                  min="0"
                  max={100 - totalAllocation}
                />
                <button
                  className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  "
                  type="submit"
                >
                  Add Token
                </button>
                <button
                  className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  "
                  type="button"
                  onClick={handleClearTokensData}
                >
                  Clear Tokens
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl tracking-wider border-b-2 border-gray-500">
                Selected Tokens:
              </h2>
              <ul className="text-white font-bold text-xl tracking-wider mt-2  ">
                {tokensData.map((tokenData, index) => (
                  <li key={index}>
                    {tokenData.tokenName}: {tokenData.allocation}%
                  </li>
                ))}
              </ul>
              <p className="text-white font-bold text-xl mt-2 tracking-wider   border-b-2 border-gray-500">
                Total Allocation: {totalAllocation}%
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexStrategy;
