import { useEffect, useState } from "react";

function MyMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [message, setMessage] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");
    const [instructions, setInstructions] = useState("");

    const fetchMedicines = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("Please login first.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/medicine/${userId}`
            );

            const data = await response.json();

            if (response.ok) {
                setMedicines(data);
            } else {
                setMessage("Failed to load medicines.");
            }
        } catch (error) {
            setMessage("Failed to connect to backend.");
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleEdit = (medicine) => {
        setEditingId(medicine._id);
        setMedicineName(medicine.medicineName);
        setDosage(medicine.dosage);
        setTime(medicine.time);
        setInstructions(medicine.instructions);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/api/medicine/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        medicineName,
                        dosage,
                        time,
                        instructions
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEditingId(null);
                setMedicineName("");
                setDosage("");
                setTime("");
                setInstructions("");
                fetchMedicines();
            } else {
                setMessage("Failed to update medicine.");
            }

        } catch (error) {
            setMessage("Failed to connect to backend.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this medicine?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/medicine/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                fetchMedicines();
            } else {
                setMessage("Failed to delete medicine.");
            }

        } catch (error) {
            setMessage("Failed to connect to backend.");
        }
    };

    return (
        <div className="medicine-page">

            <div className="page-header">
                <div>
                    <h2>My Medicines</h2>
                    <p>
                        View and manage your saved medicines.
                    </p>
                </div>

                <div className="medicine-count">
                    {medicines.length} Medicine
                    {medicines.length !== 1 ? "s" : ""}
                </div>
            </div>

            {message && (
                <div className="medicine-message">
                    {message}
                </div>
            )}

            {/* Edit Form */}
            {editingId && (
                <div className="edit-card">

                    <h3>✏️ Edit Medicine</h3>

                    <form onSubmit={handleUpdate}>

                        <label>Medicine Name</label>

                        <input
                            type="text"
                            value={medicineName}
                            onChange={(e) =>
                                setMedicineName(e.target.value)
                            }
                            required
                        />

                        <label>Dosage</label>

                        <input
                            type="text"
                            value={dosage}
                            onChange={(e) =>
                                setDosage(e.target.value)
                            }
                            required
                        />

                        <label>Time</label>

                        <input
                            type="time"
                            value={time}
                            onChange={(e) =>
                                setTime(e.target.value)
                            }
                            required
                        />

                        <label>Instructions</label>

                        <input
                            type="text"
                            value={instructions}
                            onChange={(e) =>
                                setInstructions(e.target.value)
                            }
                        />

                        <div className="edit-buttons">

                            <button
                                type="submit"
                                className="update-button"
                            >
                                ✓ Update Medicine
                            </button>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => {
                                    setEditingId(null);
                                    setMedicineName("");
                                    setDosage("");
                                    setTime("");
                                    setInstructions("");
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* Medicine List */}
            {medicines.length === 0 ? (

                <div className="empty-state">
                    <div className="empty-icon">💊</div>

                    <h3>No Medicines Added</h3>

                    <p>
                        You haven't added any medicines yet.
                    </p>
                </div>

            ) : (

                <div className="medicine-grid">

                    {medicines.map((medicine) => (

                        <div
                            className="medicine-card"
                            key={medicine._id}
                        >

                            <div className="medicine-card-top">

                                <div className="medicine-icon">
                                    💊
                                </div>

                                <div>
                                    <h3>
                                        {medicine.medicineName}
                                    </h3>

                                    <span>
                                        {medicine.dosage}
                                    </span>
                                </div>

                            </div>

                            <div className="medicine-info">

                                <div className="info-row">
                                    <span>⏰ Time</span>
                                    <strong>
                                        {medicine.time}
                                    </strong>
                                </div>

                                <div className="info-row">
                                    <span>📝 Instructions</span>
                                    <strong>
                                        {medicine.instructions ||
                                            "No instructions"}
                                    </strong>
                                </div>

                            </div>

                            <div className="medicine-actions">

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        handleEdit(medicine)
                                    }
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            medicine._id
                                        )
                                    }
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyMedicines;