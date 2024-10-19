import React, { useEffect, useState } from 'react'
import HomeBanner from "../assets/1719293199714-da733e.webp"
import womenSpa from "../assets/women-spa.webp"
import menSalon from "../assets/Mens-Salon.webp"
import ac from "../assets/AC.webp"
import cleaning from "../assets/Cleaning.webp"
import Electricians from "../assets/Electrician.webp"
import waterPurifier from "../assets/Water-Purifier.webp"
import { CiStar } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";
import SliderHome from './SliderHome'
import Typewriter from 'typewriter-effect'
import buildingRoof from "../assets/building-roof.jpeg"
import { NavLink } from 'react-router-dom'
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";



const Landing = () => {


  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [fade, setFade] = useState(false);

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

  const feedbacks = [
    "This platform has made my life so much easier! I’ve booked both cleaning and beauty services, and the professionals were polite, punctual, and did a great job. The booking process was smooth, and I liked how I could choose a time slot that suited me. The communication was clear from start to finish, and I appreciated the safety checks the company does on its providers. Highly recommended for busy people like me.",
    "I recently used this platform to book a handyman for some repairs at home, and I must say I was thoroughly impressed. The website was easy to navigate, and finding a service provider was hassle-free. I loved being able to check reviews and ratings before making my decision. The handyman arrived on time, completed the job quickly, and the pricing was transparent with no hidden costs. I’ll definitely use this service again!",
    "I booked a plumber through this website for some urgent repairs, and while the service was satisfactory, I faced delays in getting a response. It took longer than expected to confirm the booking, and the professional arrived about 30 minutes late. However, the actual work was done efficiently and the pricing was fair. If they can work on their response times, it would be a 5-star experience.",
    "The idea behind this platform is great, and it’s easy to find verified service providers in various categories. However, I had an issue with the payment system. It was a bit confusing and caused a delay in completing the booking. The service provider, however, was excellent and very professional. If they can streamline the payment process, this could easily be one of the best service provider websites.",
    "I’ve used this website multiple times, from hiring electricians to beauty experts, and I’m always impressed by the professionalism and quality of service. The platform has an excellent variety of services to choose from, and the service providers are well-vetted. The ratings and reviews system is helpful, and the customer support team is responsive. I trust this site to connect me with reliable professionals every time."
  ]

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentFeedbackIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 500); // Match with the CSS transition duration
  };

  const handlePrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentFeedbackIndex((prevIndex) =>
        prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 500); // Match with the CSS transition duration
  };



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
                            <img src={item.img} alt="" className='transform transition-transform duration-300 hover:scale-110'
                              style={{
                                mixBlendMode: 'color-burn'
                              }} />
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
              <img src={HomeBanner} alt="" className='w-full h-cover transform transition-transform duration-300 hover:scale-105 rounded-2xl' />
            </div>
          </section>

          <section>
            <SliderHome />
          </section>

          <section>
            <div className='bg-lighterBackground h-[50vh] flex justify-center items-center font-mono font-semibold text-darkText text-3xl text-center'>
              <div className='px-5'>
                <Typewriter onInit={(typewriter) => {
                  typewriter
                    .typeString(`"Get Started Now..!!"`)
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(`"Connecting You with Trusted Service Experts at Your Fingertips"`)
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(`"Book verified professionals for home repairs, beauty, cleaning, and more — all in one place."`)
                    .pauseFor(2000)
                    .deleteAll()
                    .start()
                }} options={{ autoStart: true, loop: true, delay: 20, deleteSpeed: 20 }} />
              </div>
            </div>
          </section>

          <section>
            <div className='bg-lightBackground p-5 flex justify-center items-center font-semibold text-lightText text-3xl '>
              <div className='px-5'>
                <div className='flex w-full gap-2'>

                  <div className='w-2/5 flex justify-around items-center'>
                    <img src={buildingRoof} className='w-64 rounded-lg' alt="" />
                  </div>

                  <div className='w-3/5  flex flex-col justify-center items-center px-10 text-base'>
                    <h3 className='text-3xl font-semibold mb-4'>
                      How It Works?
                    </h3>
                    <p className='text-2xl'>
                      A simple, step-by-step explanation of the platform’s process:
                    </p>
                    <ol className='list-decimal list-inside space-y-2 text-xl mt-2'>
                      <li>Choose a Service: Browse or search for the service you need.</li>
                      <li>Select a Professional: Review ratings, read reviews, and choose from verified professionals.</li>
                      <li>Book an Appointment: Schedule a time that’s convenient for you.</li>
                      <li>Get the Job Done: Enjoy high-quality service with transparent pricing.</li>
                    </ol>
                    <p className='text-2xl mt-4'>
                      All transactions are secure and hassle-free, with no hidden fees.
                    </p>

                    <div className='mt-5 flex justify-start w-full'>
                      <NavLink className=' p-2 text-xl bg-NavLinkBackground font-thin  text-NavLinkText rounded-lg hover:bg-NavLinkHover'>Get in touch</NavLink>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </section>

          <section>
            <div className='flex flex-col justify-center items-center bg-darkBackground text-lightText p-10'>

              <div className='flex justify-center items-center'>
                <div>
                  <h2 className='text-3xl font-semibold '>
                    What Our Customers Say
                  </h2>
                  <div className={`mt-5 feedback ${fade ? 'feedback-exit' : 'feedback-enter'} text-lightText`}>
                    <p className='text-2xl'>
                      “
                      {feedbacks[currentFeedbackIndex]}
                      ”
                    </p>
                  </div>
                </div>


              </div>

              <div className='flex gap-5 mt-5'>

                <button className='bg-NavLinkBackground text-NavLinkText hover:bg-NavLinkHover p-3 rounded-full' onClick={handlePrevious}>
                  <GrFormPrevious className='text-3xl' />
                </button>

                <button className='bg-NavLinkBackground text-NavLinkText hover:bg-NavLinkHover p-3 rounded-full' onClick={handleNext}>
                  <GrFormNext className='text-3xl' />
                </button>
              </div>

            </div>

          </section>

        </div>

      </div>


    </div>
  )
}

export default Landing
