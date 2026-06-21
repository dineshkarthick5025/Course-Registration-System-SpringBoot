import { NavLink } from "react-router-dom";

function Nav(){
    return(
        <div className="navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/eduflow_logo.png" alt="EduFlow Logo" style={{ height: '36px', width: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <h2>EduFlow</h2>
            </div>
            <ul>
                <li><NavLink to='/' end>Home</NavLink></li>
                <li><NavLink to='/courses'>Courses</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
                <li><NavLink to='/students'>Students</NavLink></li>
            </ul>
        </div>
    )
}
export default Nav;
