import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Header.css'

const navItems = [
  { to: '/', label: 'Projects' },
  { to: '/sound-design', label: 'Sound Design' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__start">
          <NavLink to="/" className="site-header__logo-link" end aria-label="Marcus Lim — home">
            <img src={logo} alt="" className="site-header__logo" width={36} height={36} />
          </NavLink>
          <NavLink to="/" className="site-header__brand" end>
            Marcus Lim
          </NavLink>
        </div>

        <nav className="site-header__nav" aria-label="Main">
          <ul className="site-header__list">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `site-header__link${isActive ? ' site-header__link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
