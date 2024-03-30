import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "../assets/new.png";

const Header = () => {
  return (
    <div className="h-[70px] bg-gradient-to-b from-black to  bg-slate-900 flex items-center shadow-lg py-10 ">
      <div className="w-full px-12 flex justify-between items-center ">
        <h2 className="text-gradient text-5xl flex items-center gap-5 text-white font-semibold cursor-pointer tracking-wider ">
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
  );
};

export default Header;
