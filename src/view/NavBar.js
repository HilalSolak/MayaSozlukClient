import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from "react";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-credit">
                MAYA
            </Link>
            <ul className="menu">
                <li>
                    <CustomLink to="/add-word">Kelime Ekle</CustomLink>
                </li>
                <li>
                    <CustomLink to="/show-list">Kelime Listele</CustomLink>
                </li>
            </ul>
        </nav>
    )
}



function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}