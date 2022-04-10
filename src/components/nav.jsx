import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="navbar navbar-dark bg-dark static-top">
            <div className="container">
                <h1><Link to="weather-app" className="navbar-brand link-light">Weather Forecast</Link></h1>
                {/*<a className="btn btn-primary" href="#signup">Sign Up</a>*/}
            </div>
        </nav>
    );
}

export default Nav;