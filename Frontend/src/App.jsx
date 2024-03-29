// App.js
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ERC20Token from './components/ERC20Token';
import { useState } from 'react';
// import logo from "./assets/logo.png";
import logo from "./assets/new.png";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

// const CustomConnectButton = styled(ConnectButton)`
//   &&& {
//     background-color: #ff6600;
//     color: white;
//     border-radius: 8px;
//     padding: 10px 20px;
//     font-size: 20px;
//   }
// `;

const App = () => {
  const [show, setShow] = useState(true);

  return (
    <div className='w-full h-screen'>
      <div className="h-[70px] bg-gradient-to-b from-black to  bg-slate-900 flex items-center shadow-lg py-10 ">
        <div className="w-full px-12 flex justify-between items-center ">
          <h2 className="text-gradient text-5xl flex items-center gap-5 text-white font-semibold cursor-pointer tracking-wider ">
            {/* <img className="w-[55px]" src={logo} alt="logo" /> */}
            <img className="w-[310px] text-white" src={logo} alt="logo" />
          </h2>
          <div className="text-gray-400 text-3xl font-medium flex duration-75">
            <a className="mr-20 anchor " href="">
              <h2>Home</h2>
            </a>
            <a className="mr-20 anchor" href="">
              <h2>Our Team</h2>
            </a>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-grow flex'>
        {/* Sidebar */}
        <div className="w-[40%] px-6 bg-gradient-to-b from-slate-950 to bg-gray-950 h-screen flex flex-col items-center justify-center">
          <h2 className=" text-5xl text-white font-semibold mb-0 -mt-10">
            Get Started <br /> <h2 className="ml-20 mt-2 ">With</h2>
          </h2>
          <div className="my-10 flex flex-col gap-14 text-white">
            <button
              onClick={() => setShow(!show)}
              className="btn text-2xl font-medium tracking-wider">
              ERC20 TOKEN
            </button>
            <button className="btn text-2xl font-medium tracking-wider">
              NFT
            </button>
            <button className="btn text-2xl font-medium tracking-wider">
              DAPP
            </button>
            <button className="btn text-2xl font-medium tracking-wider">
              Defi Platform
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {show ? (
          <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <div className="flex flex-col items-center justify-center m-16 ">
              <div className="flex items-center justify-center flex-col gap-28">
                <h2 className="text-gradient2 text-cyan-300  font-semibold text-7xl">
                  Embark On Blockchain{" "}
                </h2>
                <div className="flex flex-col  gap-4  ">
                  <h2 className="text-white  text-6xl tracking-wide">
                    Begin Your Journey
                  </h2>
                  <h2 className="text-white  text-6xl ml-16">
                    In Crafting Your
                  </h2>
                  <h2 className="text-white  text-6xl flex ">
                    Own&nbsp; {""}
                    <Typewriter
                      options={{
                        strings: [
                          "ERC20 Token",
                          "NFT",
                          "DAPP",
                          "DEFI Platform",
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-white  text-3xl font-medium mb-5">
                    Click on Left To Continue
                  </h2>
                  <div className="arrows-body flex">
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ERC20Token />
        )}
      </div>
    </div>
  );
};

export default App;
