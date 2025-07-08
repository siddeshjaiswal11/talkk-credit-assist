import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import { PrimaryOutlineButton } from '../../components/utils/buttons/Buttons';

const Header = () => {
  const [dropDown, setDropDown] = useState()

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="Talkk Logo" className="logo" />
          </Link>
        </div>

        <div className="header-title">
          <h1>Credit Assist</h1>
        </div>

        {/* <div className="header-right">
          <div className='notification'>
            <span className="smm smm-bell"></span>
          </div>
          <div className="profile-section">

            <div className="profile-image" onClick={() => setDropDown(!dropDown)}>
              {
                user?.name ?
                  <span className='user-name'> {user?.name.slice(0, 1)} </span>
                  :
                  <img src={profile} alt="Profile" />
              }
              <span className="user-name">{user?.name || 'User'}</span>
            </div>
          </div> */}
          {/* {
            dropDown &&
            <div className='profile-dd'>
              <div>
                <div className="profile-user">{user?.name || 'User'}</div>
                <PrimaryOutlineButton onClick={handleLogout}>Logout</PrimaryOutlineButton>
              </div>
            </div>
          } */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;
