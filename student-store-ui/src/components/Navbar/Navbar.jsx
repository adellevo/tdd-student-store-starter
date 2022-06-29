import * as React from 'react';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <p>Home</p>
      <p>About</p>
      <p>Contact Us</p>
    </nav>
  );
}
