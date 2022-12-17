import Link from "next/link";
import React from "react";

const SimpleHeader = () => {
    return (
        <header>
            <Link href="/">
                TW-Analyze
            </Link>
            <Link id="navbar-elem" href="/metricsDescription">
                Metrics Description
            </Link>
            <Link id="navbar-elem" href="/recommendations">
                Recommendations
            </Link>
            <Link id="navbar-elem" href="/about">
                About
            </Link>
        </header>
    );
};

export default SimpleHeader;
