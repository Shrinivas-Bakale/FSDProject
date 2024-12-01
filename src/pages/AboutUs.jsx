import React, { useState } from 'react';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const AboutUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send data to the backend or process it
        console.log('Submitted data:', formData);
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
    };

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
        <div className="container mx-auto p-8">
            {/* About Us Section */}
            <section className="mb-16">
                <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                    About Us

                    Welcome to Nexesential , your one-stop destination for essential services and solutions that make life simpler and more fulfilling.

                    At Nexesential, we are passionate about bridging the gap between users and the services they need. Inspired by platforms like Urban Clap, we aim to revolutionise the service industry by offering a streamlined and reliable experience tailored to your requirements.

                    Our Mission

                    Our mission is to empower individuals and communities by connecting them with top-notch professionals and services that enrich their daily lives. Whether it’s home maintenance, wellness, education, or bespoke services, Nexesential is here to cater to your needs with innovation and trust.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4 text-center">
                    Why Choose Us?

                    Personalised Solutions: We adapt to your unique preferences and needs.

                    Innovation-Driven: Our research-focused approach ensures cutting-edge solutions.

                    Commitment to Quality: We prioritise customer satisfaction above all.

                    Seamless Experience: With intuitive design and robust technology, we make every step effortless.


                    The Future of Nexesential

                    With aspirations to grow and innovate, our journey is just beginning. We are exploring ways to integrate research papers and knowledge-sharing resources into our platform, making it not just a service provider but a hub of learning and inspiration.

                    Join Us

                    Be part of a community that values trust, innovation, and excellence. Whether you're seeking a service or offering your expertise, Nexesential is here to connect and elevate.
                </p>
            </section>
            <div className='flex justify-center items-center'>
                <div>
                    <h2 className='text-3xl font-semibold '>
                        Feedbacks
                    </h2>
                    <div className={`mt-5 feedback ${fade ? 'feedback-exit' : 'feedback-enter'} border-4 rounded-2xl border-black p-4 `}>
                        <p className='text-2xl'>
                            <span className='text-8xl'>
                                “
                            </span>
                            {feedbacks[currentFeedbackIndex]}
                            {/* <span className='text-6xl'>

                        ”
                      </span> */}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 mt-5'>

                <button className='bg-NavLinkBackground text-NavLinkText hover:bg-NavLinkHover hover:text-black p-3 rounded-full' onClick={handlePrevious}>
                    <GrFormPrevious className='text-3xl' />
                </button>

                <button className='bg-NavLinkBackground text-NavLinkText hover:bg-NavLinkHover hover:text-black p-3 rounded-full' onClick={handleNext}>
                    <GrFormNext className='text-3xl' />
                </button>
            </div>
            {/* Contact Us Section */}
            <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AboutUs;
