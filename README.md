# EduFlow — Course Registration System

EduFlow is a modern, responsive, full-stack course enrollment and registration system. It is built with a React (Vite) frontend and a Spring Boot backend connected to a MySQL database.

---

## 🚀 Tech Stack

### Frontend
* **Core**: React 18 (with Vite)
* **Routing**: React Router DOM (v6)
* **Styling**: Custom CSS variables with a modern dark theme and responsive glassmorphism layouts.

### Backend
* **Core**: Spring Boot
* **ORM & Database**: Spring Data JPA / Hibernate with MySQL Database
* **Utilities**: Lombok for clean boilerplates
* **CORS Configuration**: Configured for local development integration

---

## 📂 Project Structure

```text
Course-Registration/
├── Backend/                 # Spring Boot Java Application
│   ├── src/main/java/       # Java source files (Controllers, Models, Repositories, Services)
│   ├── src/main/resources/  # Application properties (DB credentials & server config)
│   └── pom.xml              # Maven dependencies
├── frontend/                # React Vite Application
│   ├── public/              # Static files & assets (EduFlow logo icon)
│   ├── src/                 # React source files (Components, Pages, CSS)
│   │   ├── components/      # Reusable UI components (Nav.jsx)
│   │   ├── pages/           # Page routes (Home, Courses, Register, Students)
│   │   ├── App.css          # Vite defaults
│   │   ├── index.css        # Custom theme style sheets
│   │   └── main.jsx         # App mounting entrypoint
│   └── package.json         # npm dependencies
└── README.md                # Global documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
* **Java Development Kit (JDK 21 or higher)**
* **Node.js (v18 or higher)** and **npm**
* **MySQL Server**

---

### 1. Database Configuration
Before launching the backend, ensure your MySQL instance is running and create the `courses` database:
```sql
CREATE DATABASE courses;
```
Verify the credentials in `Backend/src/main/resources/application.properties`:
```properties
spring.datasource.url = jdbc:mysql://localhost:3306/courses
spring.datasource.username = root
spring.datasource.password = your_mysql_password
```

---

### 2. Run the Backend
Navigate to the `Backend` directory and start the server using the Maven wrapper:
```bash
cd Backend
./mvnw spring-boot:run
```
The server will start on port **`8080`**.

---

### 3. Run the Frontend
Navigate to the `frontend` directory, install packages, and launch the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The application will launch on **`http://localhost:5173`**.

---

## 🔌 API Endpoints

The Spring Boot backend exposes the following REST APIs:

| HTTP Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/courses` | *None* | Retrieve all available courses. |
| **POST** | `/courses/add` | `course` JSON | Add a new course. |
| **GET** | `/registry` | *None* | Retrieve all student course registrations. |
| **POST** | `/registry/add` | `courseRegistry` JSON | Register a student for a course. |

### Payload Formats

#### Course (`/courses/add`)
```json
{
  "courseId": "C109",
  "courseName": "Full Stack Web Development",
  "trainer": "Alice Smith",
  "duration": 45
}
```

#### Registry (`/registry/add`)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "CourseName": "Full Stack Web Development"
}
```
*(Note: `CourseName` contains a capital "C" to match the Java model serialization structure.)*
