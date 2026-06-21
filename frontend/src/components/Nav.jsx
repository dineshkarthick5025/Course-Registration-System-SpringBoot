import { NavLink } from "react-router-dom";
import { Home as HomeIcon, BookOpen, UserPlus, GraduationCap } from "lucide-react";

function Nav(){
    return(
        <div className="navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/eduflow_logo.png" alt="EduFlow Logo" style={{ height: '38px', width: '38px', borderRadius: '8px', objectFit: 'cover' }} />
                <h2>EduFlow</h2>
            </div>
            <ul>
                <li>
                    <NavLink to='/' end style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <HomeIcon size={16} />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/courses' style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={16} />
                        <span>Courses</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/register' style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserPlus size={16} />
                        <span>Register</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/students' style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GraduationCap size={16} />
                        <span>Students</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
export default Nav;
