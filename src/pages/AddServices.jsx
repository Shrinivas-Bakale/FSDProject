import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const AddServices = () => {
    const initialFormData = {
        mainHeading: "",
        serviceHead: "",
        price: "",
        smallDescription: "",
        elaboratedDescription: "",
        pictureUrl: "",
        category: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Display a preview of the image locally
                setImagePreview(URL.createObjectURL(file));

                // Cloudinary API endpoint
                const cloudinaryUrl = `https://api.cloudinary.com/v1_1/duztkby9f/image/upload`;

                // FormData to send the file and additional data
                const formData = new FormData();
                formData.append("file", file); // The file being uploaded
                formData.append("upload_preset", "default_preset"); // Your Cloudinary upload preset

                // Make a POST request to Cloudinary
                const response = await axios.post(cloudinaryUrl, formData);

                // Get the uploaded image URL
                const uploadedUrl = response.data.secure_url;

                // Update the form data with the uploaded image URL
                setFormData((prevData) => ({
                    ...prevData,
                    pictureUrl: uploadedUrl,
                }));

                console.log("Image uploaded successfully:", uploadedUrl);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
                alert("Failed to upload image. Please try again.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createServiceEndpoint =
            "http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/example/createService";

        try {
            const response = await axios.post(createServiceEndpoint, formData);

            if (response.status === 200) {
                toast.success("Service created successfully!");
                setFormData(initialFormData); // Clear the form data
            } else {
                toast.error("Failed to create service. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.");
        }

        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Add New Service</h1>
            <form onSubmit={handleSubmit}>
                {/* Main Heading */}
                <div className="mb-4">
                    <label htmlFor="mainHeading" className="block text-sm font-medium text-gray-700">
                        Main Heading
                    </label>
                    <input
                        type="text"
                        id="mainHeading"
                        name="mainHeading"
                        value={formData.mainHeading}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Service Head */}
                <div className="mb-4">
                    <label htmlFor="serviceHead" className="block text-sm font-medium text-gray-700">
                        Service Head
                    </label>
                    <input
                        type="text"
                        id="serviceHead"
                        name="serviceHead"
                        value={formData.serviceHead}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Small Description */}
                <div className="mb-4">
                    <label htmlFor="smallDescription" className="block text-sm font-medium text-gray-700">
                        Small Description
                    </label>
                    <textarea
                        id="smallDescription"
                        name="smallDescription"
                        rows="2"
                        value={formData.smallDescription}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    ></textarea>
                </div>

                {/* Elaborated Description */}
                <div className="mb-4">
                    <label htmlFor="elaboratedDescription" className="block text-sm font-medium text-gray-700">
                        Elaborated Description
                    </label>
                    <textarea
                        id="elaboratedDescription"
                        name="elaboratedDescription"
                        rows="4"
                        value={formData.elaboratedDescription}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    ></textarea>
                </div>

                {/* Picture Upload */}
                <div className="mb-4">
                    <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">
                        Upload Picture
                    </label>
                    <input
                        type="file"
                        id="pictureUrl"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-md" />
                    )}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServices;
