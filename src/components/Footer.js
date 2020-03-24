import React from "react";

function Footer() {
  return (
    <>
      <nav>
        <p>{`© All rights are reserved | ${new Date().getFullYear()}`}</p>
      </nav>
      <footer>
        <p>Mady by Solución Digital</p>
      </footer>
    </>
  );
}

export default Footer;
