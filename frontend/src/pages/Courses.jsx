import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not connect to the backend server. Make sure your Spring Boot backend is running.");
                setLoading(false);
            });
    }, []);

    const handleRegisterClick = (courseName) => {
        navigate("/register", { state: { courseName } });
    };

    return (
        <>
            <Nav />
            <div className="app-container">
                <h1>Available Courses</h1>
                <p style={{ textAlign: "center", marginBottom: "2rem" }}>
                    Explore our curated programs and enroll to level up your skills today.
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

                {!loading && !error && courses.length === 0 && (
                    <div className="card empty-state">
                        <div className="empty-state-icon">📚</div>
                        <h3>No courses available</h3>
                        <p>Check back later for new course offerings.</p>
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (
                    <div className="grid">
                        {courses.map((course) => (
                            <div key={course.courseId} className="card course-card">
                                <div>
                                    <div className="course-header">
                                        <span className="course-tag">{course.courseId}</span>
                                        <span className="course-duration">⏱️ {course.duration} hours</span>
                                    </div>
                                    <h3 className="course-title">{course.courseName}</h3>
                                    <div className="course-trainer">
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