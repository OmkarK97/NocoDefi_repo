import React from 'react'
import IndexStrategy from './IndexStrategy'

const IndexStrategyWrapper = () => {
    return (
        <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <IndexStrategy/>
             {/* deposit Token Address[weth/ usdc] dropdown
        tokens(konse select krne hai) dropdown iska array banega input string mai rahega
        5 tokens ke options hai 
        */}
        </div>
    )
}

export default IndexStrategyWrapper