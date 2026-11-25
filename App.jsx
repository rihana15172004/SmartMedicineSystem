import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import AddMedicine from "./AddMedicine";
import MyMedicines from "./MyMedicines";
import Reminders from "./Reminders";
import Prescriptions from "./Prescriptions";
import Profile from "./Profile";
import "./App.css";

function App() {
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("userId")
    );

    const [page, setPage] = useState("home");
    const [showRegister, setShowRegister] = useState(false);

    // Login / Register page
    if (!loggedIn) {

        if (showRegister) {
            return (
                <>
                    <Register />

                    <div className="auth-switch">
                        <span>Already have an account?</span>

                        <button
                            onClick={() => setShowRegister(false)}
                        >
                            Login
                        </button>
                    </div>
                </>
            );
        }

        return (
            <>
                <Login />

                <div className="auth-switch">
                    <span>Don't have an account?</span>

                    <button
                        onClick={() => setShowRegister(true)}
                    >
                        Create Account
                    </button>
                </div>
            </>
        );
    }

    const userName = localStorage.getItem("userName");

    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        setShowRegister(false);
    };

    return (
        <div className="app-container">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="logo">
                    💊 Smart Medicine
                </div>

                <div className="nav-menu">

                    <button
                        className={`nav-button ${
                            page === "home" ? "active" : ""
                        }`}
                        onClick={() => setPage("home")}
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        className={`nav-button ${
                            page === "add" ? "active" : ""
                        }`}
                        onClick={() => setPage("add")}
                    >
                        ➕ Add Medicine
                    </button>

                    <button
                        className={`nav-button ${
                            page === "medicines" ? "active" : ""
                        }`}
                        onClick={() => setPage("medicines")}
                    >
                        💊 My Medicines
                    </button>

                    <button
                        className={`nav-button ${
                            page === "reminders" ? "active" : ""
                        }`}
                        onClick={() => setPage("reminders")}
                    >
                        ⏰ Reminders
                    </button>

                    <button
                        className={`nav-button ${
                            page === "prescriptions" ? "active" : ""
                        }`}
                        onClick={() => setPage("prescriptions")}
                    >
                        📋 Prescriptions
                    </button>

                    <button
                        className={`nav-button ${
                            page === "profile" ? "active" : ""
                        }`}
                        onClick={() => setPage("profile")}
                    >
                        👤 My Profile
                    </button>

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>

            {/* Main Content */}
            <main className="main-content">

                {page === "home" && (
                    <>
                        <div className="top-header">
                            <div>
                                <h1>Dashboard</h1>

                                <p className="welcome-text">
                                    Welcome back, {userName} 👋
                                </p>
                            </div>
                        </div>

                        <div className="dashboard-cards">

                            <div className="dashboard-card">
                                <h3>💊 My Medicines</h3>

                                <div className="dashboard-number">
                                    Manage
                                </div>

                                <p>
                                    Add and manage your medicines.
                                </p>
                            </div>

                            <div className="dashboard-card">
                                <h3>⏰ Reminders</h3>

                                <div className="dashboard-number">
                                    Today
                                </div>

                                <p>
                                    Check your medicine timings.
                                </p>
                            </div>

                            <div className="dashboard-card">
                                <h3>📋 Prescriptions</h3>

                                <div className="dashboard-number">
                                    Records
                                </div>

                                <p>
                                    Manage your prescription records.
                                </p>
                            </div>

                        </div>

                        <div className="home-section">

                            <h2>
                                Welcome to Smart Medicine System
                            </h2>

                            <p>
                                Manage your medicines, reminders,
                                prescriptions and personal information
                                easily from one place.
                            </p>

                            <div className="quick-actions">

                                <button
                                    className="quick-action"
                                    onClick={() => setPage("add")}
                                >
                                    ➕ Add Medicine
                                </button>

                                <button
                                    className="quick-action"
                                    onClick={() => setPage("reminders")}
                                >
                                    ⏰ View Reminders
                                </button>

                                <button
                                    className="quick-action"
                                    onClick={() =>
                                        setPage("prescriptions")
                                    }
                                >
                                    📋 Prescriptions
                                </button>

                            </div>

                        </div>
                    </>
                )}

                {page === "add" && <AddMedicine />}

                {page === "medicines" && <MyMedicines />}

                {page === "reminders" && <Reminders />}

                {page === "prescriptions" && <Prescriptions />}

                {page === "profile" && <Profile />}

            </main>

        </div>
    );
}

export default App;