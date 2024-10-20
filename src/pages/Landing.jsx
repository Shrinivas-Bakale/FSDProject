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
    <div className='bg-[#1c1c1c]'>
      <div className='container mx-auto '>
        <div className='grid grid-cols-1'>


          <section className='p-2 z-0'>

            <div className='flex gap-6 w-full   min-h-screen text-darkText  px-5  home-main-background rounded-3xl z-10'>
              

              <div className='flex justify-around items-center relative'>
                <div className='ml-14 relative bottom-6 '>
                  <h1 className='text-7xl font-semibold relative z-50 bottom-8'>
                    Home services at<br /> your  doorstep
                  </h1>
                  <button className='p-3 bg-black text-white font-semibold rounded-xl'>
                    Explore Our Services
                  </button>
                  <button className='p-3 bg-transparent border-[1px] ml-5 border-gray-700 text-black font-semibold rounded-xl'>
                    Button
                  </button>
                </div>
              </div>

              
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
                      <NavLink className=' p-2 text-xl bg-NavLinkBackground font-thin  text-NavLinkText rounded-lg hover:bg-NavLinkHover border-[1px] border-[#fafafa] hover:text-NavLinkBackground'>Know More</NavLink>
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
