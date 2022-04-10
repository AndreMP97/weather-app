import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class Now extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { 
            location: localStorage.getItem("location") || "",
            current: JSON.parse(localStorage.getItem("current")) || "",
            unit: localStorage.getItem("unit") || ""
        };
    }

    componentDidMount() {
        this._isMounted = true;
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if(this.state.location && this.state.current && this.state.unit) {
            localStorage.removeItem("current");
            return(
                <>
                    <section className="results bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light ">
                                <div className="card-header">
                                    <img src={this.state.current.condition.icon} alt="Weather"/>
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.current.condition.text}</h5>
                                    <ul className="nav nav-tabs card-header-tabs nav-fill">
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link active disabled" aria-current="true">Now</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link text-dark" onClick={() => localStorage.setItem("nav", "today")}>Today</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link text-dark" onClick={() => localStorage.setItem("nav", "tomorrow")}>Tomorrow</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="row row-cols-1 row-cols-md-3 g-4">
                                        <div className="col">
                                            <div className="card h-100 ">
                                                <div className="card-body">
                                                    <i className="bi bi-thermometer-half" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Temperature</h5>
                                                    {this.state.unit === "celsius" ? (
                                                            <>
                                                                <p className="card-text">{this.state.current.temp_c}ºC</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="card-text">{this.state.current.temp_f}ºF</p>
                                                            </>
                                                    )}
                                                    {this.state.unit === "celsius" ? (
                                                            <>
                                                                <p className="card-text">Feels like {this.state.current.feelslike_c}ºC</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="card-text">Feels like {this.state.current.feelslike_f}ºF</p>
                                                            </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <i className="bi bi-wind" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Wind</h5>
                                                    <p className="card-text">Direction: {this.state.current.wind_dir} | {this.state.current.wind_degree}º</p>
                                                    {this.state.unit === "celsius" ? (
                                                            <>
                                                                <p className="card-text">{this.state.current.wind_kph} kph</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="card-text">{this.state.current.wind_mph} mph</p>
                                                            </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <i className="bi bi-cloud-rain" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Precipitation</h5>
                                                    {this.state.unit === "celsius" ? (
                                                            <>
                                                                <p className="card-text">{this.state.current.precip_mm} mm</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="card-text">{this.state.current.precip_in} in</p>
                                                            </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <i className="bi bi-clouds" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Clouds</h5>
                                                    <p className="card-text">{this.state.current.cloud}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <i className="bi bi-moisture" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Humidity</h5>
                                                    <p className="card-text">{this.state.current.humidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <i className="bi bi-cloud-fog2" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                    <h5 className="card-title">Visibility</h5>
                                                    {this.state.unit === "celsius" ? (
                                                            <>
                                                                <p className="card-text">{this.state.current.vis_km} km</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="card-text">{this.state.current.vis_miles} miles</p>
                                                            </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-center">
                                        {this.state.unit === "celsius" ? (
                                                <>
                                                    <button type="button" className="btn btn-sm text-primary">ºC</button>
                                                    <button type="button" className="btn btn-sm text-secondary" onClick={() => this.setState({unit: "fahrenheit"})}>ºF</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type="button" className="btn btn-sm text-secondary" onClick={() => this.setState({unit: "celsius"})}>ºC</button>
                                                    <button type="button" className="btn btn-sm text-primary">ºF</button>
                                                </>
                                        )}
                                    </div>
                                    
                                    <small className="text-muted">Last updated {parseInt((Date.now()/1000 - this.state.current.last_updated_epoch)/60)} minutes ago</small>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            );
        }
        else {
            return(
                <>
                    <Navigate to={-1} />
                </>
            );
        }
    }
}

export default Now;