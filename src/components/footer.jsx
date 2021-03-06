import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-center">
            <div className="container py-2 px-lg-5">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item">
                                <Link to="disclaimer" className="link-light">Disclaimer</Link>
                            </li>
                        </ul>
                        <p className="text-light small mb-4 mb-lg-0">&copy; Weather Forecast APP Demo. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-6 h-100 text-center text-lg-end">
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