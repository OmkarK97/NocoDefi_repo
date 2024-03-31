import React from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';

const ContractLogic = ({ tokenAddress, tokenArr, AllocationArr, SwapFees }) => {
    const { data: hash, writeContract, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("Submitting transaction...");
            writeContract({
                abi,
                address: '0x8f4c81F25e65b615Fa7b40426efabd4540203f78',
                functionName: "createVault",
                args: [tokenAddress, tokenArr, AllocationArr, SwapFees],
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
            {isConfirming && <p>Transaction pending...</p>}
            {isConfirmed && <p>Transaction confirmed!</p>}
            {error && (
                <div>Error|| {error.message}</div>
            )}
        </div>
    )
}

export default ContractLogic;
