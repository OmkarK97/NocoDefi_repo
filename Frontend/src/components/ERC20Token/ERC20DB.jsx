import React, { useState, useEffect } from 'react';
// import ERC20Token from './ERC20Token';

const ERC20DB = () => {
  const [tokenData, setTokenData] = useState([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showMintingForm, setShowMintingForm] = useState(false); // State to control minting form visibility

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch('http://localhost:3000/erc20/token');
        if (!response.ok) {
          throw new Error('Failed to fetch token data from database');
        }
        const value = await response.json();

        // Access the ID of the last element directly
        const lastTokenId = value.data[value.data.length - 1]._id;

        // Find the token data with matching ID
        const token = value.data.find(token => token._id === lastTokenId);

        // Set the token data and ID
        setTokenData(token);
        setId(lastTokenId);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  // Toggle minting form visibility
  // const toggleMintingForm = () => {
  //   setShowMintingForm(!showMintingForm);
  // };

  return (
    <div className="absolute top-0 left-0 m-4 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Stored Token Data:</h2>
      {loading ? (
        <p>Loading token data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : tokenData ? (
        <div>
          {/* <p>Name: {tokenData.name}</p> */}
          <p>Symbol: {tokenData.symbol}</p>
          <p>Token Address: {tokenData.tokenAddress}</p>
          <p>Id: {id}</p>
        </div>
      ) : (
        <p>No token data available</p>
      )}
    </div>
  );
};

export default ERC20DB;
