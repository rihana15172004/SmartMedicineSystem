import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("token", data.token);

                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Login failed. Please check the backend.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-icon">💊</div>

                <h1 className="login-logo">
                    <span className="logo-smart">Smart</span>
                    <span className="logo-medicine">Medicine</span>
                </h1>

                <p className="login-subtitle">
                    Login to manage your medicines
                </p>

                <form onSubmit={handleLogin}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                {message && (
                    <p className="login-message">{message}</p>
                )}
            </div>
        </div>
    );
}

export default Login;