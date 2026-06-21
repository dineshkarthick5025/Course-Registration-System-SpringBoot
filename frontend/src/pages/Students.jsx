import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Search, Mail, BookOpen, GraduationCap, AlertCircle } from "lucide-react";

function Students() {
    const [registries, setRegistries] = useState([]);
    const [filteredRegistries, setFilteredRegistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
                setFilteredRegistries(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not connect to the backend server. Make sure your Spring Boot backend is running.");
                setLoading(false);
            });
    }, []);

    // Filter registries on search term change
    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = registries.filter((student) => {
            return (
                student.name.toLowerCase().includes(lowerSearch) ||
                student.email.toLowerCase().includes(lowerSearch) ||
                student.CourseName.toLowerCase().includes(lowerSearch)
            );
        });
        setFilteredRegistries(filtered);
    }, [searchTerm, registries]);

    // Generate deterministic initials avatar
    const getInitials = (name) => {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    return (
        <>
            <Nav />
            <div className="app-container">
                <h1>Registered Students</h1>
                <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-secondary)" }}>
                    View and manage all active student course enrollments.
                </p>

                {!loading && !error && registries.length > 0 && (
                    <div className="search-container">
                        <div className="search-icon">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search students, emails, or courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                {loading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error" style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {!loading && !error && registries.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">
                            <GraduationCap size={48} />
                        </div>
                        <h3>No students registered yet</h3>
                        <p>Go to the Register tab to enroll the first student.</p>
                    </div>
                )}

                {!loading && !error && registries.length > 0 && filteredRegistries.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">
                            <Search size={48} />
                        </div>
                        <h3>No students found</h3>
                        <p>No results match your search term.</p>
                    </div>
                )}

                {!loading && !error && filteredRegistries.length > 0 && (
                    <div className="student-grid">
                        {filteredRegistries.map((student) => (
                            <div key={student.id} className="student-card">
                                <div className="student-card-header">
                                    <div className="student-avatar">
                                        {getInitials(student.name)}
                                    </div>
                                    <div className="student-details">
                                        <h3 className="student-name">{student.name}</h3>
                                        <div className="student-email">
                                            <Mail size={12} style={{ color: "var(--text-muted)" }} />
                                            {student.email}
                                        </div>
                                    </div>
                                </div>
                                <span className="student-course-badge">
                                    <BookOpen size={13} />
                                    {student.CourseName}
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
