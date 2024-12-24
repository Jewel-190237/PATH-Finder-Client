/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProtectedAdmin = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // No token, redirect to login
                    return;
                }

                // Check the role from the server
                const response = await axios.get('http://localhost:5000/auth-status', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.role === 'admin') {
                    setLoading(false); // Allow access for admin
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'You are not an Admin',
                        text: 'You cannot access this Dashboard.',
                    });
                    navigate('/'); // Redirect non-admin users to the homepage
                }
            } catch (error) {
                console.error('Error checking admin access:', error);
                navigate('/login'); // If any error, redirect to login
            }
        };

        checkAdminAccess();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    // Render the requested child component for admin
    return children;
};

export default ProtectedAdmin;
