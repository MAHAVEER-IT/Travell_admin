import { NavLink } from 'react-router-dom'
import './Layout.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/destinations"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/bookings"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/users"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar 