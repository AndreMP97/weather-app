import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const [nav, setNav] = useState({});
    useEffect(() => {
        setInterval(() => {
            const resultString = localStorage.getItem("results");
            const result = JSON.parse(resultString);
            setNav(result);
            }, [])
    }, []);

    if(nav === true) {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div className="container px-lg-5">
                    <Link to="/" className="navbar-brand link-light">Weather Forecast</Link>
                    <Link to="/" className="bi bi-arrow-left btn-dark shadow-none" style={{"fontSize": "1.5rem"}} aria-hidden="true"></Link>
                </div>
            </nav>
        );
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div className="container px-lg-5">
                    <Link to="/" className="navbar-brand link-light">Weather Forecast</Link>
                </div>
            </nav>
            /*<header>
                <nav className="navbar navbar-dark bg-dark" style={{"paddingTop": "0.25rem", "paddingBottom": "0.25rem"}}>
                    <div className="container">
                        <h1><Link to="/" className="navbar-brand link-light">Weather Forecast</Link></h1>
                    </div>
                </nav>
            </header>*/
        );
    }
}

export default Nav;