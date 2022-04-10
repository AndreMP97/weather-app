import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item">
                                <Link to="disclaimer" className="link-light" onClick={() => localStorage.setItem("results", "true")}>Disclaimer</Link>
                            </li>
                        </ul>
                        <p className="text-light small mb-4 mb-lg-0">&copy; Weather Forecast APP Demo. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item me-4">
                                <a href="https://github.com/AndreMP97/weather-app"><i className="bi-github btn-dark fs-3"></i></a>
                            </li>
                            <li className="list-inline-item me-4">
                                <a href="https://www.linkedin.com/in/andrempacheco97/"><i className="bi-linkedin btn-dark fs-3"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;