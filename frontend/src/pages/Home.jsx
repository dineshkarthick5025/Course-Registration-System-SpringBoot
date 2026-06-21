import Nav from "../components/Nav";

function Home() {
    return (
        <>
            <Nav />

            <div className="app-container">
                <div className="home-hero">
                    <h1>Welcome to EduFlow</h1>
                    <p>
                        EduFlow allows students to seamlessly explore
                        available courses and register for them easily. Our platform
                        provides a simple, fluid, and efficient way to manage course enrollments.
                    </p>
                </div>

                <div className="card home-section">
                    <h2>What can you do?</h2>
                    <div className="home-features">
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>Courses</h3>
                            <p>Browse all courses offered by the institution.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📝</div>
                            <h3>Register</h3>
                            <p>Fill out the registration form and enroll in a course.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>Students</h3>
                            <p>View the list of students who have registered.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Manage</h3>
                            <p>Manage course enrollments efficiently.</p>
                        </div>
                    </div>
                </div>

                <div className="card home-section">
                    <h2>Why use this system?</h2>
                    <ul style={{ listStyleType: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                        <li style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                            ✨ <strong>Easy Process:</strong> Single-form course enrollment.
                        </li>
                        <li style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                            🎨 <strong>Modern UI:</strong> User-friendly interface.
                        </li>
                        <li style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                            🗂️ <strong>Centralized Records:</strong> Instant registration access.
                        </li>
                        <li style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                            🚀 <strong>Fast Integration:</strong> Connected directly to Spring Boot.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home;