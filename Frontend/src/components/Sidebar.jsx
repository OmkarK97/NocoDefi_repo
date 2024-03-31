import React from 'react';

const Sidebar = ({
    showERC20Token,
    setShowERC20Token,
    showIndexStrategy,
    setShowIndexStrategy
}) => {
    return (
        <div className="w-[40%] px-6 bg-gradient-to-b from-slate-950 to bg-gray-950 h-screen flex flex-col items-center justify-center">
            <h2 className="text-5xl text-white font-semibold mb-0 -mt-10">
                Get Started <br /> <span className="ml-20 mt-2 ">With</span>
            </h2>
            <div className="my-10 flex flex-col gap-14 text-white">
                <button
                    onClick={() => {
                        setShowERC20Token(!showERC20Token)
                        setShowIndexStrategy(false);
                    }}
                    className="btn text-2xl font-medium tracking-wider"
                >
                    ERC20 TOKEN
                </button>
                <button
                    onClick={() => {
                        setShowIndexStrategy(!showIndexStrategy)
                        setShowERC20Token(false)
                    }}
                    className="btn text-2xl font-medium tracking-wider"
                >
                    Index Strategy
                </button>
                <button className="btn text-2xl font-medium tracking-wider">
                    DAPP
                </button>
                <button className="btn text-2xl font-medium tracking-wider">
                    Defi Platform
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
