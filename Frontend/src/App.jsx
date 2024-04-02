import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ERC20TokenWrapper from "./components/ERC20Token/ERC20TokenWrapper";
import MainContent from "./components/MainContent";
import IndexStrategy from "./components/IndexStrat/IndexStrategy";
import Loader from "./components/Loader";

const App = () => {
  const [showERC20Token, setShowERC20Token] = useState(false);
  const [showIndexStrategy, setShowIndexStrategy] = useState(false);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2400);
  }, []);

  return (
    <div className="w-full h-screen">
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="flex-grow flex">
            <Sidebar
              showERC20Token={showERC20Token}
              setShowERC20Token={setShowERC20Token}
              showIndexStrategy={showIndexStrategy}
              setShowIndexStrategy={setShowIndexStrategy}
            />
            {showERC20Token ? (
              <ERC20TokenWrapper />
            ) : showIndexStrategy ? (
              <IndexStrategy />
            ) : (
              <MainContent />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
