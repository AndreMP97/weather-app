import { Navigate } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="navbar navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" href="/weather-app">Weather Forecast</a>
                {/*<a className="btn btn-primary" href="#signup">Sign Up</a>*/}
            </div>
        </nav>
    );
}

export default Nav;