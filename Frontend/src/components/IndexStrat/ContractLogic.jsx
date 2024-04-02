import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';
import erc20ABI from '../../Contracts/abi/ERC20.json';

const ContractLogic = ({ tokenAddress, tokenArr, AllocationArr, SwapFees }) => {
    const { data: hashSubmit, writeContract: writeContractSubmit, error: errorSubmit } = useWriteContract();
    const { data: hashDeposit, writeContract: writeContractDeposit, error: errorDeposit } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: hashSubmit });
    const [depositAmount, setDepositAmount] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("Submitting transaction...");
            writeContractSubmit({
                abi,
                address: '0xa38e9508368a823249b7eF291156F93CDcB8E66E',
                functionName: "createVault",
                args: [tokenAddress, tokenArr, AllocationArr, SwapFees],
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const handleDeposit = (e) => {
        e.preventDefault();
        try {
            console.log("Submitting transaction...");
            writeContractDeposit({
                abi: erc20ABI,
                address: tokenAddress,
                functionName: "approve",
                args: [parseVal(), cAddress],
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const handleDepositAmount = (e) => {
        setDepositAmount(e.target.value)
    }

    const parseVal = () => {
        const num = ethers.utils.parseUnits(depositAmount.toString(), 18);
        return num;
    };
    //contract address
    //3 button deposit, withdraw, rebalance

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
            {isConfirming && <p>Transaction pending...</p>}
            {isConfirmed && <p>Transaction confirmed!</p>}
            {errorSubmit && (
                <div>Error|| {errorSubmit.message}</div>
            )}

            {isConfirmed && (
                <div>
                    <button onClick={handleDeposit}>Deposit</button>
                    <input type='number' placeholder='Deposit Amount' onChange={handleDepositAmount}/>
                </div>
            )}

        </div>
    )
}

export default ContractLogic;
