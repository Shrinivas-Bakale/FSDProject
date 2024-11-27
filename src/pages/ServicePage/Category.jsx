import React from 'react'
import { categories } from '../../constants'

const Category = () => {

    return (
        <div className='bg-[#F0F0F3]'>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>
                    <div className='flex flex-col'>
                        <div className='slider h-[25vh]'>
                            <p>maybe a slider</p>
                        </div>

                        <div className='mt-5'>
                            <div className='flex justify-center items-center'>
                                {categories.map((buttons, index) => {
                                    return (<div key={index}>
                                        <button className='p-2 border-2 border-gray-800'>
                                            {buttons.title}
                                        </button>
                                    </div>)
                                })}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
