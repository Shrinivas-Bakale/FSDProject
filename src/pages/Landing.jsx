import React from 'react'
import HomeBanner from "../assets/1719293199714-da733e.webp"
import womenSpa from "../assets/women-spa.webp"
import menSalon from "../assets/Mens-Salon.webp"
import ac from "../assets/AC.webp"
import cleaning from "../assets/Cleaning.webp"
import Electricians from "../assets/Electrician.webp"
import waterPurifier from "../assets/Water-Purifier.webp"
import { CiStar } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";



const Landing = () => {

  const gridContent = [
    {
      img: womenSpa,
      title: "Women's Salon & Spa",
    },

    {
      img: menSalon,
      title: "Men's Salon & Massage",
    },

    {
      img: ac,
      title: "AC & Appliance Repair",
    },
    {
      img: cleaning,
      title: "Cleaning & Pest Control",
    },
    {
      img: Electricians,
      title: "Electrician",
    },
    {
      img: waterPurifier,
      title: "Water Purifier",
    },
  ]

  return (
    <div className='bg-lightBackground'>
      <div className='container mx-auto '>
        <div className='grid grid-cols-1'>
          <section className='flex gap-6 w-full mt-10 text-lightText bg-lightBackground px-5'>
            <div className='w-1/2 flex flex-col gap-8 mb-5'>
              <div>
                <h2 className='text-5xl font-semibold'>Home services at your <br /> doorstep</h2>
              </div>
              <div className='border-[1px] border-darkBackground w-11/12'>
                <div className='p-3'>
                  <h4 className='text-2xl'>
                    Providing Services like...
                  </h4>

                  <div className='grid grid-cols-3 gap-5 mt-4'>

                    {gridContent.map((item, index) => (
                      <div key={index} className='underline-link'>
                        <div className='p-1 flex justify-center items-center flex-col gap-1 ' >
                          <div className=' bg-NavLinkBackground px-10 py-3 rounded-md'>
                            <img src={item.img} alt="" />
                          </div>
                          {item.title}
                        </div>
                      </div>
                    ))}

                  </div>

                </div>
              </div>

              <div className='flex justify-between items-center w-11/12'>

                <div className='p-1 flex justify-center items-center  gap-3 ' >
                  <CiStar className='text-5xl' />
                  <div className='flex flex-col '>
                    <h5 className='text-3xl font-semibold'>4.8</h5>
                    <p>Service Rating</p>
                  </div>
                </div>

                <div className='p-1 flex justify-center items-center  gap-3 ' >
                  <PiUsersThreeLight className='text-5xl' />
                  <div className='flex flex-col '>
                    <h5 className='text-3xl font-semibold'>12M+</h5>
                    <p>Customers Globally</p>
                  </div>
                </div>


              </div>

            </div>

            <div className='w-1/2  p-3'>
              <img src={HomeBanner} alt="" className='w-full h-cover' />
            </div>
          </section>

          <section>
            <SliderHome />
          </section>

        </div>
      </div>


    </div>
  )
}

export default Landing
