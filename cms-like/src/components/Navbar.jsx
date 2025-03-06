import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ formConfigs }) => {
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
    }, [path])
    return (
        <nav style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "20", justifyContent: "center" }} className="sticky top-0">
            <Link
                to={"/form-config"}
                style={{ marginRight: "10px" }}
            >
                Form Config
            </Link>

            {formConfigs.map((config, index) => (
                <Link
                    key={index}
                    className={`my-2 p-2 ${path.includes(config.apiEndpoint.replace("http://localhost:5000/api", "")) ? "bg-white rounded" : ""}`}
                    to={config.apiEndpoint.replace("http://localhost:5000/api", "")}
                    style={{ marginRight: "10px" }}
                >
                    {config.formName}
                </Link>
            ))}
        </nav>
    )
}

export default Navbar
