import { useState, useEffect } from "react";
import Nav from "../components/Nav";

function Students() {
    const [registries, setRegistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/registry")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch registered students");
                }
                return res.json();
            })
            .then((data) => {
                setRegistries(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not connect to the backend server. Make sure your Spring Boot backend is running.");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Nav />
            <div className="app-container">
                <h1>Registered Students</h1>
                <p style={{ textAlign: "center", marginBottom: "2rem" }}>
                    View and manage all active course enrollments.
                </p>

                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error">
                        ⚠️ {error}
                    </div>
                )}

                {!loading && !error && registries.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">🎓</div>
                        <h3>No students registered yet</h3>
                        <p>Go to the Register tab to enroll the first student.</p>
                    </div>
                )}

                {!loading && !error && registries.length > 0 && (
                    <div className="student-grid">
                        {registries.map((student) => (
                            <div key={student.id} className="student-card">
                                <h3 className="student-name">{student.name}</h3>
                                <div className="student-email">{student.email}</div>
                                <span className="student-course-badge">
                                    📚 {student.CourseName}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Students;
