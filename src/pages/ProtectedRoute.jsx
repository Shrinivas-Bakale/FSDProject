import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...props }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const correctPassword = "admin";

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (isAuthenticated) {
        return <Element {...props} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm  "
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-md "
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ProtectedRoute;
