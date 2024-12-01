import React from 'react'

const PaymentSummary = ({totalPrice}) => {
    
    return (
        <div className='border-2 border-gray-300 p-5 rounded-lg'>
            <div className='flex flex-col items-start gap-2 '>
                <h3 className='font-bold text-xl'>
                    Payment summary
                </h3>
                <div className='w-full border-dashed border-b-2 border-gray-200 pb-2'>
                    <div className='flex justify-between w-full text-lg'>
                        <p>
                            Services Total
                        </p>
                        <p>
                            {totalPrice}
                        </p>
                    </div>
                    <div className='flex justify-between w-full text-lg'>
                        <p>
                            Taxes and Fee
                        </p>
                        <p>
                            {totalPrice * 0.18}
                        </p>
                    </div>
                </div>

                <div className=' w-full'>
                    <div className='flex justify-between w-full text-lg'>
                        <h3 className='font-bold'>
                            Total
                        </h3>
                        <p>
                            {totalPrice + (totalPrice * 0.18)}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentSummary
