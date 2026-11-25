import { useEffect, useState } from "react";

function Prescriptions() {
    const [doctorName, setDoctorName] = useState("");
    const [prescriptionDate, setPrescriptionDate] = useState("");
    const [notes, setNotes] = useState("");

    const [prescriptions, setPrescriptions] = useState([]);
    const [message, setMessage] = useState("");

    const fetchPrescriptions = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/prescription/${userId}`
            );

            const data = await response.json();

            if (response.ok) {
                setPrescriptions(data);
            } else {
                setMessage("Failed to load prescriptions.");
            }
        } catch (error) {
            setMessage("Failed to connect to backend.");
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleAddPrescription = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/prescription/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId,
                        doctorName,
                        prescriptionDate,
                        notes
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                setDoctorName("");
                setPrescriptionDate("");
                setNotes("");

                fetchPrescriptions();
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            setMessage("Failed to add prescription.");
        }
    };

    return (
        <div className="prescription-page">

            <div className="page-header">
                <div>
                    <h2>Prescriptions</h2>

                    <p>
                        Add and manage your prescription records.
                    </p>
                </div>

                <div className="prescription-count">
                    {prescriptions.length} Record
                    {prescriptions.length !== 1 ? "s" : ""}
                </div>
            </div>

            {/* Add Prescription */}

            <div className="prescription-form-card">

                <div className="prescription-title">
                    <div className="prescription-icon">
                        📋
                    </div>

                    <div>
                        <h3>Add Prescription</h3>

                        <p>
                            Save your doctor prescription details.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleAddPrescription}>

                    <label>Doctor Name</label>

                    <input
                        type="text"
                        placeholder="Example: Dr. Ahmed"
                        value={doctorName}
                        onChange={(e) =>
                            setDoctorName(e.target.value)
                        }
                        required
                    />

                    <label>Prescription Date</label>

                    <input
                        type="date"
                        value={prescriptionDate}
                        onChange={(e) =>
                            setPrescriptionDate(e.target.value)
                        }
                        required
                    />

                    <label>Prescription Notes</label>

                    <textarea
                        placeholder="Enter prescription details..."
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        rows="5"
                    />

                    <button
                        type="submit"
                        className="prescription-submit"
                    >
                        ➕ Add Prescription
                    </button>

                </form>

                {message && (
                    <div className="prescription-message">
                        {message}
                    </div>
                )}

            </div>

            {/* Saved Prescriptions */}

            <div className="saved-prescriptions">

                <h3>My Prescription Records</h3>

                {prescriptions.length === 0 ? (

                    <div className="empty-state">
                        <div className="empty-icon">
                            📋
                        </div>

                        <h3>No Prescriptions Added</h3>

                        <p>
                            Your saved prescriptions will appear here.
                        </p>
                    </div>

                ) : (

                    <div className="prescription-grid">

                        {prescriptions.map((prescription) => (

                            <div
                                className="prescription-card"
                                key={prescription._id}
                            >

                                <div className="prescription-card-header">

                                    <div className="doctor-icon">
                                        👨‍⚕️
                                    </div>

                                    <div>
                                        <h3>
                                            Dr.{" "}
                                            {prescription.doctorName}
                                        </h3>

                                        <span>
                                            Prescription Record
                                        </span>
                                    </div>

                                </div>

                                <div className="prescription-date">
                                    📅{" "}
                                    <strong>Date:</strong>{" "}
                                    {prescription.prescriptionDate}
                                </div>

                                <div className="prescription-notes">

                                    <strong>
                                        📝 Notes
                                    </strong>

                                    <p>
                                        {prescription.notes ||
                                            "No notes added"}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Prescriptions;