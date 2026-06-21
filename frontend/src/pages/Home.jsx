import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { 
    BookOpen, 
    UserPlus, 
    GraduationCap, 
    ArrowRight, 
    CheckCircle2, 
    Sparkles, 
    Layers, 
    Activity, 
    CheckCircle
} from "lucide-react";

function Home() {
    const [stats, setStats] = useState({
        coursesCount: 0,
        enrolledCount: 0,
        status: "Connecting..."
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/courses")
                .then((res) => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })
                .catch(() => []),
            fetch("http://localhost:8080/registry")
                .then((res) => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })
                .catch(() => [])
        ])
        .then(([courses, registries]) => {
            setStats({
                coursesCount: courses.length,
                enrolledCount: registries.length,
                status: "Active"
            });
        })
        .catch(() => {
            setStats({
                coursesCount: 0,
                enrolledCount: 0,
                status: "Offline"
            });
        });
    }, []);

    return (
        <>
            <Nav />

            <div className="app-container">
                <div className="home-hero">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.2)", borderRadius: "99px", padding: "6px 16px", marginBottom: "1.5rem", fontSize: "0.85rem", fontWeight: "600", color: "#a5b4fc" }}>
                        <Sparkles size={14} />
                        <span>Connected to Spring Boot API v1.0</span>
                    </div>
                    <h1>Simplify Your Learning Journey with EduFlow</h1>
                    <p style={{ maxWidth: "680px", margin: "0 auto 2.5rem", color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.8" }}>
                        EduFlow provides a modern, high-performance course enrollment platform. 
                        Explore available programs, track registrations, and manage student admissions seamlessly.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <Link to="/courses" className="btn" style={{ width: "auto", minWidth: "180px" }}>
                            Browse Courses <ArrowRight size={16} />
                        </Link>
                        <Link to="/register" className="btn btn-secondary" style={{ width: "auto", minWidth: "180px" }}>
                            Register Student
                        </Link>
                    </div>
                </div>

                {/* Dashboard Metrics */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <BookOpen size={24} />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{stats.coursesCount}</div>
                            <div className="stat-label">Available Courses</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <GraduationCap size={24} />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{stats.enrolledCount}</div>
                            <div className="stat-label">Enrolled Students</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ 
                            color: stats.status === "Active" ? "#10b981" : stats.status === "Offline" ? "#ef4444" : "#eab308",
                            background: stats.status === "Active" ? "rgba(16, 185, 129, 0.08)" : stats.status === "Offline" ? "rgba(239, 68, 68, 0.08)" : "rgba(234, 179, 8, 0.08)",
                            borderColor: stats.status === "Active" ? "rgba(16, 185, 129, 0.15)" : stats.status === "Offline" ? "rgba(239, 68, 68, 0.15)" : "rgba(234, 179, 8, 0.15)"
                        }}>
                            <Activity size={24} />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value" style={{ 
                                color: stats.status === "Active" ? "#34d399" : stats.status === "Offline" ? "#f87171" : "#fbbf24"
                            }}>{stats.status}</div>
                            <div className="stat-label">Database Status</div>
                        </div>
                    </div>
                </div>

                {/* Action Sections */}
                <div className="card home-section">
                    <h2 style={{ borderBottom: "none", margin: "0 0 2rem", justifyContent: "center" }}>
                        Quick Actions & Features
                    </h2>
                    <div className="home-features">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <BookOpen size={24} />
                            </div>
                            <h3>Explore Programs</h3>
                            <p>Browse a rich catalog of academic and professional courses with detailed information.</p>
                            <Link to="/courses" style={{ marginTop: "1rem", color: "#818cf8", textDecoration: "none", fontSize: "0.9rem", fontWeight: "650", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                View Catalog <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <UserPlus size={24} />
                            </div>
                            <h3>Instant Registration</h3>
                            <p>Fast track enrollment in a single click by providing basic details and choosing your course.</p>
                            <Link to="/register" style={{ marginTop: "1rem", color: "#818cf8", textDecoration: "none", fontSize: "0.9rem", fontWeight: "650", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                Enroll Now <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <GraduationCap size={24} />
                            </div>
                            <h3>Student Directory</h3>
                            <p>Access the central database of all student registrations, course details, and emails.</p>
                            <Link to="/students" style={{ marginTop: "1rem", color: "#818cf8", textDecoration: "none", fontSize: "0.9rem", fontWeight: "650", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                View Registry <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Core Benefits */}
                <div className="card home-section">
                    <h2 style={{ borderBottom: "none", margin: "0 0 2rem", justifyContent: "center" }}>
                        Why EduFlow?
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
                        <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.01)", borderRadius: "16px", border: "1px solid var(--card-border)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                            <div style={{ color: "#34d399", padding: "4px", background: "rgba(52, 211, 153, 0.08)", borderRadius: "8px", border: "1px solid rgba(52, 211, 153, 0.15)" }}>
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "700", marginBottom: "0.25rem" }}>Reliable Performance</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>Built with robust React frontend and high-speed Spring Boot REST backend endpoints.</p>
                            </div>
                        </div>
                        <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.01)", borderRadius: "16px", border: "1px solid var(--card-border)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                            <div style={{ color: "#34d399", padding: "4px", background: "rgba(52, 211, 153, 0.08)", borderRadius: "8px", border: "1px solid rgba(52, 211, 153, 0.15)" }}>
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "700", marginBottom: "0.25rem" }}>Modern UI Aesthetics</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>Designed with rich glassmorphism elements, dark mode values, and beautiful typography.</p>
                            </div>
                        </div>
                        <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.01)", borderRadius: "16px", border: "1px solid var(--card-border)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                            <div style={{ color: "#34d399", padding: "4px", background: "rgba(52, 211, 153, 0.08)", borderRadius: "8px", border: "1px solid rgba(52, 211, 153, 0.15)" }}>
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "700", marginBottom: "0.25rem" }}>Intuitive Navigation</h4>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>Seamless linking between course catalog selection and autofilled enrollment forms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;