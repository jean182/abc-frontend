import React from "react";

function Footer() {
  return (
    <div className="footer-nav">
      <footer>
        <p>Crafted by Solución Digital</p>
      </footer>
      <nav>
        <p>{`© All rights are reserved | ${new Date().getFullYear()}`}</p>
      </nav>
    </div>
  );
}

export default Footer;
