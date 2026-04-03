import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Task Manager</h1>
      </div>
      {user && (
        <div className="navbar-menu">
          <span className="navbar-user">Hello, {user.name}</span>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
