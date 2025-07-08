import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const SidebarLayout = () => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState('home');

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link 
          to="/"
          className={`nav-link ${activeIcon === 'home' ? 'active' : ''}`}
          onClick={() => setActiveIcon('home')}
          data-tooltip="Home"
        >
          <span className={`smm smm-home nav-icon ${activeIcon === 'home' ? 'active' : 'inactive'}`}></span>

        </Link>

        <Link 
          to="/application-list"
          className={`nav-link ${activeIcon === 'list' ? 'active' : ''}`}
          onClick={() => setActiveIcon('list')}
          data-tooltip="Application List"
        >
          <span className={`smm smm-list nav-icon ${activeIcon === 'list' ? 'active' : 'inactive'}`}></span>

        </Link>

        <Link 
          to="/application-review"
          className={`nav-link ${activeIcon === 'create' ? 'active' : ''}`}
          onClick={() => setActiveIcon('create')}
          data-tooltip="Application Review"
        >
          <span className={`smm smm-add-icon nav-icon ${activeIcon === 'create' ? 'active' : 'inactive'}`}></span>

        </Link>

        {/* <Link 
          to="/account"
          className={`nav-link ${activeIcon === 'account' ? 'active' : ''}`}
          onClick={() => setActiveIcon('account')}
          data-tooltip="Account"
        >
          <span className={`smm smm-account nav-icon ${activeIcon === 'account' ? 'active' : 'inactive'}`}></span>

        </Link> */}

      </nav>
    </aside>
  );
};

export default SidebarLayout;
