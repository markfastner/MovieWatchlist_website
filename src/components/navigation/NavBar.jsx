// import React, {useState, useEffect} from 'react';
// import { Button } from '../Button.js';
import { Link } from 'react-router-dom';
// import './Navbar.css';
// import '../../App.css'

import { Nav } from "react-bootstrap"

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const showbutton = () => {
//     if(window.innerWidth <= 960) {
//       setButton(false);
//     } else {
//       setButton(true);
//     }
//   };

//   useEffect(() => {
//     showbutton();
//   }, []);

//   window.addEventListener('resize', showbutton);

//   return (
//     <>
//     <nav className='navbar'>
//       <div className='navbar-container'>
//         <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
//           RT <i className="fa-thin fa-camera-movie" />
//         </Link>
//         <div className="menu-icon" onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
//               Dashboard
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/watchlist' className='nav-links' onClick={closeMobileMenu}>
//               Watchlist
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/friends' className='nav-links' onClick={closeMobileMenu}>
//               Friends
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/account' className='nav-links' onClick={closeMobileMenu}>
//               Account
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//         {button && <Button buttonStyle='btn--outline'>sign up</Button>}
//       </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar

const NavBarLinks = ["Dashboard","Watchlist", "Friends", "Profile", "Hello"," mushroom"]

export const Navbar=()=>{
  return(<nav className="flex justify-between px-8 py-4 bg-blue-900">
    <div>
      <Link to='/' className="text-white tracking-wide">
        RT <i className="fa-thin fa-camera-movie text-white" />
      </Link>
    </div>
    <div className="flex justify-center items-center space-x-8">
    <ul className="flex items-center justify-end space-x-4">
      {
        NavBarLinks.map(link => {
          return <li>
            <Link to={`/${link}`} className="text-white tracking-wider">{link}</Link>
          </li>
        })
      }
    </ul>
    <div className="space-x-2">
      <button className="px-4 py-0.5 bg-white rounded ">
        Sign Up
      </button>
      <button className="px-4 py-0.5 bg-white rounded ">
        Sign In
      </button>
    </div>
    </div>
  </nav>
  );

}

export default Navbar;