import { useState } from "react";

function AddMedicine() {
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");
    const [instructions, setInstructions] = useState("");
    const [message, setMessage] = useState("");

    const handleAddMedicine = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/medicine/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId,
                        medicineName,
                        dosage,
                        time,
                        instructions
                    })
                }
            );

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                setMedicineName("");
                setDosage("");
                setTime("");
                setInstructions("");
            }

        } catch (error) {
            setMessage(
                "Failed to add medicine. Please check the backend."
            );
        }
    };

    return (
        <div className="form-page">

            <div className="form-card">

                <div className="form-icon">
                    💊
                </div>

                <h2>Add Medicine</h2>

                <p className="form-description">
                    Add your medicine details and reminder time.
                </p>

                <form onSubmit={handleAddMedicine}>

                    <label>Medicine Name</label>

                    <input
                        type="text"
                        placeholder="Example: Paracetamol"
                        value={medicineName}
                        onChange={(e) =>
                            setMedicineName(e.target.value)
                        }
                        required
                    />

                    <label>Dosage</label>

                    <input
                        type="text"
                        placeholder="Example: 500 mg"
                        value={dosage}
                        onChange={(e) =>
                            setDosage(e.target.value)
                        }
                        required
                    />

                    <label>Medicine Time</label>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)
                        }
                        required
                    />

                    <label>Instructions</label>

                    <textarea
                        placeholder="Example: Take after food"
                        value={instructions}
                        onChange={(e) =>
                            setInstructions(e.target.value)
                        }
                        rows="4"
                    />

                    <button
                        type="submit"
                        className="form-submit-button"
                    >
                        ➕ Add Medicine
                    </button>

                </form>

                {message && (
                    <div className="form-message">
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}

export default AddMedicine;