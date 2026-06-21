import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function Register() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        courseName: ""
    });

    const [courses, setCourses] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Fetch courses for the dropdown select
    useEffect(() => {
        fetch("http://localhost:8080/courses")
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error();
            })
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses for select:", err));
    }, []);

    // Set course name if navigated from courses list
    useEffect(() => {
        if (location.state && location.state.courseName) {
            setFormData((prev) => ({
                ...prev,
                courseName: location.state.courseName
            }));
        }
    }, [location]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const response = await fetch("http://localhost:8080/registry/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    CourseName: formData.courseName // Maps to private String CourseName on backend
                })
            });

            if (response.ok) {
                setSuccessMsg("🎉 Enrollment successful! Redirecting to student registry...");
                setFormData({ name: "", email: "", courseName: "" });
                setTimeout(() => {
                    navigate("/students");
                }, 2000);
            } else {
                const text = await response.text();
                setErrorMsg(text || "Failed to register. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("⚠️ Network error. Make sure your Spring Boot backend is running.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Nav />

            <div className="app-container" style={{ maxWidth: "600px" }}>
                <h1>Register for a Course</h1>
                <p style={{ textAlign: "center", marginBottom: "2rem" }}>
                    Fill out the form below to enroll in your desired course.
                </p>

                <div className="card">
                    {successMsg && (
                        <div className="alert alert-success">
                            {successMsg}
                        </div>
                    )}

                    {errorMsg && (
                        <div className="alert alert-error">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseName">Select Course</label>
                            <select
                                id="courseName"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Choose a course --</option>
                                {courses.map((c) => (
                                    <option key={c.courseId} value={c.courseName}>
                                        {c.courseName} ({c.duration} hrs)
                                    </option>
                                ))}
                                {formData.courseName && !courses.some(c => c.courseName === formData.courseName) && (
                                    <option value={formData.courseName}>{formData.courseName}</option>
                                )}
                            </select>
                        </div>

                        <button type="submit" className="btn" style={{ marginTop: "1rem" }} disabled={submitting}>
                            {submitting ? "Registering..." : "Submit Registration"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;