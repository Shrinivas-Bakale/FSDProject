import React, { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import diwaliLights from "../assets/diwali-lights.webp";
import wallPanels from "../assets/wall-panels.webp";
import waterPurifier from "../assets/water-purify.webp";
import smartLock from "../assets/smart-lock.webp";
import homePainting from "../assets/home-painting.webp";
import spaAyurveda from "../assets/ayurveda-spa.webp";
import hairStudio from "../assets/hair-studio-women.webp";
import acRepair from "../assets/ac-repair-service.webp";
import { useNavigate } from 'react-router-dom';

const SliderHome = () => {

    const navigate = useNavigate();

    const sliderContent = [
        {
            img: diwaliLights,
            title: "Diwali Lights",
            path: "/diwalilights"
        },
        {
            img: wallPanels,
            title: "Wall Panels",
        },
        {
            img: waterPurifier,
            title: "Water Purifier",
        },
        {
            img: smartLock,
            title: "Smart Lock",
        },

        {
            img: spaAyurveda,
            title: "Ayurveda Spa",
        },
        {
            img: hairStudio,
            title: "Hair Studio",
        },
        {
            img: acRepair,
            title: "AC Repair",
        },
        {
            img: homePainting,
            title: "Home Painting",
            path: "/homepainting"
        }
    ]

    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='bg-black'>
            <div className="bg-darkBackground overflow-x-hidden pb-10 aos">

                <div className="flex justify-between items-center mb-3 lg:mb-4 lg:flex-row flex-col md:flex-row xl:mb-6 px-10 ">
                    <p className="font-semibold text-lightText text-5xl mt-5 ">Our <br /> Services</p>
                    <div className="flex justify-end items-center gap-2  lg:mt-5 mt-5 md:mt-8 ">
                        <button onClick={() => sliderRef.current.slickPrev()}>
                            <div className=" hover:bg-arrowHover p-3 rounded-full">
                                <IoIosArrowBack className="text-white hover:text-black" />
                            </div>
                        </button>
                        <button onClick={() => sliderRef.current.slickNext()}>
                            <div className=" hover:bg-arrowHover p-3 rounded-full">
                                <IoIosArrowForward className="text-white hover:text-black" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className='lg:w-11/12 lg:ml-10 md:w-11/12 md:ml-8 xl:w-full 2xl:w-full xl:px-8 xl:ml-2 2xl:px-12 '>
                    <Slider ref={sliderRef} {...settings}>
                        {sliderContent.map((item, index) => (
                            <div className="flex flex-col justify-center items-start p-3" key={index} >
                                <button
                                onClick={() => navigate(item.path)}
                                >
                                    <img src={item.img} alt="" className='rounded-2xl transform transition-transform duration-300 hover:scale-105' />
                                    <h5 className='font-semibold text-lg text-lightText mt-3'>{item.title}</h5>
                                </button>
                            </div>

                        ))}
                    </Slider>
                </div>


            </div>
        </div>
    )
}

export default SliderHome
