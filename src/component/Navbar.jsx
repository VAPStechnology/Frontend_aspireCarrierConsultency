import React from "react";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Aspire Consultancy</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                    <li tabIndex={0}>
                        <a>
                            Services
                            <svg
                                className="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                        <ul className="p-2 bg-base-100">
                            <li>
                                <a>Consulting</a>
                            </li>
                            <li>
                                <a>Training</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;