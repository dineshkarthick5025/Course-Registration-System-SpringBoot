import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Search, Clock, User, BookOpen, AlertTriangle } from "lucide-react";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/courses")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return res.json();
            })
            .then((data) => {
                setCourses(data);
                setFilteredCourses(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not connect to the backend server. Make sure your Spring Boot backend is running.");
                setLoading(false);
            });
    }, []);

    // Handle search input change
    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = courses.filter((course) => {
            return (
                course.courseName.toLowerCase().includes(lowerSearch) ||
                course.courseId.toLowerCase().includes(lowerSearch) ||
                course.trainer.toLowerCase().includes(lowerSearch)
            );
        });
        setFilteredCourses(filtered);
    }, [searchTerm, courses]);

    const handleRegisterClick = (courseName) => {
        navigate("/register", { state: { courseName } });
    };

    return (
        <>
            <Nav />
            <div className="app-container">
                <h1>Available Courses</h1>
                <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-secondary)" }}>
                    Explore our curated programs and enroll to level up your skills today.
                </p>

                {!loading && !error && courses.length > 0 && (
                    <div className="search-container">
                        <div className="search-icon">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search courses, IDs, or instructors..."
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
                        <AlertTriangle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">
                            <BookOpen size={48} />
                        </div>
                        <h3>No courses available</h3>
                        <p>Check back later for new course offerings.</p>
                    </div>
                )}

                {!loading && !error && courses.length > 0 && filteredCourses.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">
                            <Search size={48} />
                        </div>
                        <h3>No matches found</h3>
                        <p>Try refining your search terms or keywords.</p>
                    </div>
                )}

                {!loading && !error && filteredCourses.length > 0 && (
                    <div className="grid">
                        {filteredCourses.map((course) => (
                            <div key={course.courseId} className="card course-card">
                                <div>
                                    <div className="course-header">
                                        <span className="course-tag">{course.courseId}</span>
                                        <span className="course-duration">
                                            <Clock size={14} />
                                            {course.duration} hours
                                        </span>
                                    </div>
                                    <h3 className="course-title">{course.courseName}</h3>
                                    <div className="course-trainer">
                                        <User size={14} style={{ color: "var(--text-muted)" }} />
                                        <span>Instructor:</span> {course.trainer}
                                    </div>
                                </div>
                                <button 
                                    className="btn" 
                                    onClick={() => handleRegisterClick(course.courseName)}
                                >
                                    Register Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Courses;