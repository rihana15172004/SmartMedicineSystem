function Profile() {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    return (
        <div className="profile-page">

            <div className="page-header">
                <div>
                    <h2>My Profile</h2>

                    <p>
                        View your personal account information.
                    </p>
                </div>
            </div>

            <div className="profile-card">

                <div className="profile-top">

                    <div className="profile-avatar">
                        {userName
                            ? userName.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div>
                        <h2>{userName}</h2>
                        <p>{userEmail}</p>
                    </div>

                </div>

                <div className="profile-section">

                    <h3>Personal Information</h3>

                    <div className="profile-info">

                        <div className="profile-row">
                            <span>👤 Full Name</span>
                            <strong>{userName}</strong>
                        </div>

                        <div className="profile-row">
                            <span>📧 Email Address</span>
                            <strong>{userEmail}</strong>
                        </div>

                        <div className="profile-row">
                            <span>🆔 User ID</span>
                            <strong>{userId}</strong>
                        </div>

                    </div>

                </div>

                <div className="profile-status">
                    ✓ Account Active
                </div>

            </div>

        </div>
    );
}

export default Profile;