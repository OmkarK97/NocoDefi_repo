import React from 'react'

const SubmitLogic = ({ onSubmitFinalTokens }) => {
    return (
        <div className='text-white'>
            <button onClick={onSubmitFinalTokens}>
                Submit
            </button>
        </div>
    )
}

export default SubmitLogic
