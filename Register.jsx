import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                setName("");
                setEmail("");
                setPassword("");
            }

        } catch (error) {
            setMessage(
                "Registration failed. Please check the backend."
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-icon">
                    💊
                </div>

                <h1>Create Account</h1>

                <p className="login-subtitle">
                    Register for Smart Medicine System
                </p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Create Account
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Register;