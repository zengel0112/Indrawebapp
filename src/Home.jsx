import { useNavigate } from 'react-router-dom';
import './index.css'

const Home = () => {
    const navigate = useNavigate();

    const setAdmin = () => {
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        alert("You are now an Admin!");
        window.location.reload();
        navigate('/admin');
    };

    const setUser = () => {
        localStorage.setItem("user", JSON.stringify({ role: "user" }));
        alert("You are now a User!");
        window.location.reload();
        navigate('/user');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">Welcome to the Home Page</h1>
            <p className="text-lg mb-8">This is the main page of the app.</p>

            <div className="space-x-4">
                <button
                    onClick={setAdmin}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Become Admin
                </button>
                <button
                    onClick={setUser}
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Become User
                </button>
            </div>
        </div>
    );

};

export default Home;
