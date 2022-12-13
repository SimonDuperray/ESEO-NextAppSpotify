import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer>
            <Link
                href="https://github.com/SimonDuperray/ESEO-NextAppSpotify"
                target="_blank"
                rel="noopener noreferrer"
            >
                © AUGER Caroline - DUPERRAY Simon
            </Link>
        </footer>
    );
};

export default Footer;
