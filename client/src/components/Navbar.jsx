import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { Username, Role } = useUser();
    console.log("Username: ", Username);
    const location = useLocation();
    console.log("location:", location);

    const handleAuth = () => {
        if (Username) {
            navigate("/signin")
        } else {
            navigate("/signin")
        }
    };

    useEffect(() => {
        console.log("Username and Role:", Username);
        if (!Username) {
            navigate("/signin")
        }
    })

    if (location.pathname != "/") return null;

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    {Username ? (
                        <span className="font-semibold">Welcome, {Username}</span>
                    ) : (
                        <span>Guest</span>
                    )}
                </div>
                {Username ?
                    <button
                        onClick={handleAuth}
                        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Sign Out
                    </button>
                    :
                    <button
                        onClick={handleAuth}
                        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Sign In
                    </button>
                }


            </div>
        </nav>
    );
}