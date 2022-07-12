import { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class showResults extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { 
            loading: true,
            location: localStorage.getItem("location") || "",
            current: [],
            forecast: [],
            nav: localStorage.getItem("nav") || "current",
            unit: localStorage.getItem("unit") || "celsius"
        };
        this.handleCurrent = this.handleCurrent.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleTomorrow = this.handleTomorrow.bind(this);
        this.showUnits = this.showUnits.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        localStorage.setItem("results", "true");
        try {
            const response = await axios.get("https://api.weatherapi.com/v1/forecast.json",{
                params: {
                    key: process.env.REACT_APP_WEATHER_API_KEY,
                    q: this.state.location,
                    days: "2",
                    aqi: "no",
                    alerts: "yes"
                }
            })
            //console.log(response);
            if (response.data.current) {
                this.setState({current: response.data.current}, () => {
                    //console.log("state", this.state.current);
                });
            }
            if (response.data.forecast.forecastday) {
                this.setState({forecast: response.data.forecast.forecastday}, () => {
                    //console.log("state", this.state.forecast);
                });
            }
            await new Promise(resolve => setTimeout(resolve, 500)); //wait at least half a second
            this.setState({loading: false}, () => {
                //console.log("loading", this.state.loading);
            });
        }   
        catch (error) {
            console.error(error);
            this.setState({loading: true}, () => {
                //console.log("loading", this.state.loading);
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleCurrent(event) {
        event.preventDefault();
        this.setState({nav: "current"}, () => {
            //console.log("nav " + this.state.show);
            localStorage.setItem("nav", this.state.nav);
        });
    }

    handleToday(event) {
        event.preventDefault();
        this.setState({nav: "today"}, () => {
            //console.log("nav " + this.state.show);
            localStorage.setItem("nav", this.state.nav);
        });
    }

    handleTomorrow(event) {
        event.preventDefault();
        this.setState({nav: "tomorrow"}, () => {
            //console.log("nav " + this.state.show);
            localStorage.setItem("nav", this.state.nav);
        });
    }

    parseDate() {
        if (this.state.nav === "today") {
            const [year, month, day] = this.state.forecast[0].date.split('-');
            if (this.state.unit === "celsius") {
                return(
                    <small className="text-muted">Today: {day}-{month}-{year}</small>
                );
            }
            else
                return(<small className="text-muted">Today: {month}-{day}-{year}</small>);
        }
        else if (this.state.nav === "tomorrow") {
            const [year, month, day] = this.state.forecast[1].date.split('-');
            if (this.state.unit === "celsius") {
                return(
                    <small className="text-muted">Tomorrow: {day}-{month}-{year}</small>
                );
            }
            else
                return(<small className="text-muted">Tomorrow: {month}-{day}-{year}</small>);
        }
    }

    showUnits() {
        if(this.state.unit === "celsius") {
            return(
                <>
                    <button type="button" className="btn btn-xs text-primary shadow-none">ºC</button>
                    <button type="button" className="btn btn-xs text-secondary shadow-none disabled">|</button>
                    <button type="button" className="btn btn-xs text-secondary shadow-none" onClick={() => this.setState({unit: "fahrenheit"}) & localStorage.setItem("unit", "fahrenheit")}>ºF</button>
                </>
            );
        }
        else {
            return(
                <>
                    <button type="button" className="btn btn-xs text-secondary shadow-none" onClick={() => this.setState({unit: "celsius"}) & localStorage.setItem("unit", "celsius")}>ºC</button>
                    <button type="button" className="btn btn-xs text-secondary shadow-none disabled">|</button>
                    <button type="button" className="btn btn-xs text-primary shadow-none">ºF</button>
                </>
            );
        }
    }

    render() {
        if(this.state.loading === false && this.state.nav === "current") {
            return(
                <>
                    <section className="masthead-results">
                        <div className="container pt-6 pb-6 px-lg-5 h-100 align-items-center justify-content-center">
                            <div className="row h-100 align-items-center justify-content-center text-center">
                                <div className="col">
                                    <div className="card mb-3 bg-light">
                                        <div className="card-header">
                                            <img src={this.state.current.condition.icon} alt="Weather"/>
                                            {this.showUnits()}
                                            <h5>{this.state.location}</h5>
                                            <h5>{this.state.current.condition.text}</h5>
                                            <ul className="nav nav-tabs card-header-tabs nav-fill">
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link active disabled" aria-current="true">Current</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleToday}>Today</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleTomorrow}>Tomorrow</Link>
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
                                                                        <p className="card-text">{Math.round(this.state.current.temp_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">{Math.round(this.state.current.temp_f)} ºF</p>
                                                                    </>
                                                            )}
                                                            {this.state.unit === "celsius" ? (
                                                                    <>
                                                                        <p className="card-text">Feels like {Math.round(this.state.current.feelslike_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Feels like {Math.round(this.state.current.feelslike_f)} ºF</p>
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
                                                                        <p className="card-text">{Math.round(this.state.current.wind_kph)} kph</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">{Math.round(this.state.current.wind_mph)} mph</p>
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
                                        <div className="card-footer" style={{"paddingTop": "0.25rem", "paddingBottom": "0.4rem"}}>
                                            {/*console.log("Debug epoch " + Date.now())*/}
                                            {/*console.log("API epoch " + this.state.current.last_updated_epoch)*/}
                                            <small className="text-muted">Last updated: {parseInt((Date.now()/1000 - this.state.current.last_updated_epoch)/60)} minutes ago</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        }

        else if(this.state.loading === false && this.state.nav === "today") {
            return(
                <>
                    <section className="masthead-results">
                        <div className="container pt-6 pb-6 px-lg-5 h-100 align-items-center justify-content-center">
                            <div className="row h-100 align-items-center justify-content-center text-center">
                                <div className="col">
                                    <div className="card mb-3 bg-light">
                                        <div className="card-header">
                                            <img src={this.state.forecast[0].day.condition.icon} alt="Weather"/>
                                            {this.showUnits()}
                                            <h5>{this.state.location}</h5>
                                            <h5>{this.state.forecast[0].day.condition.text}</h5>
                                            <ul className="nav nav-tabs card-header-tabs nav-fill">
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleCurrent}>Current</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link active disabled" aria-current="true" >Today</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleTomorrow}>Tomorrow</Link>
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
                                                                        <p className="card-text">Min: {Math.round(this.state.forecast[0].day.mintemp_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Min: {Math.round(this.state.forecast[0].day.mintemp_f)} ºF</p>
                                                                    </>
                                                            )}
                                                            {this.state.unit === "celsius" ? (
                                                                    <>
                                                                        <p className="card-text">Max: {Math.round(this.state.forecast[0].day.maxtemp_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Max: {Math.round(this.state.forecast[0].day.maxtemp_f)}ºF</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-sun" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Sun</h5>
                                                            <p className="card-text">Sunrise: {this.state.forecast[0].astro.sunrise}</p>
                                                            <p className="card-text">Sunset: {this.state.forecast[0].astro.sunset}</p>
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
                                                                        <p className="card-text">Total: {this.state.forecast[0].day.totalprecip_mm} mm</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Total: {this.state.forecast[0].day.totalprecip_in} in</p>
                                                                    </>
                                                            )}
                                                            <p className="card-text">Chance of rain: {this.state.forecast[0].day.daily_chance_of_rain}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-wind" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Wind</h5>
                                                            {this.state.unit === "celsius" ? (
                                                                    <>
                                                                        <p className="card-text ">Max: {Math.round(this.state.forecast[0].day.maxwind_kph)} kph</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text ">Max: {Math.round(this.state.forecast[0].day.maxwind_mph)} mph</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-moisture" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Humidity</h5>
                                                            <p className="card-text">Average: {this.state.forecast[0].day.avghumidity}%</p>
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
                                                                        <p className="card-text">Average: {this.state.forecast[0].day.avgvis_km} km</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Average: {this.state.forecast[0].day.avgvis_miles} miles</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{"paddingTop": "0.25rem", "paddingBottom": "0.4rem"}}>
                                            {this.parseDate()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        }

        else if(this.state.loading === false && this.state.nav === "tomorrow") {
            return(
                <>
                    <section className="masthead-results">
                        <div className="container pt-6 pb-6 px-lg-5 h-100 align-items-center justify-content-center">
                            <div className="row h-100 align-items-center justify-content-center text-center">
                                <div className="col">
                                    <div className="card mb-3 bg-light">
                                        <div className="card-header">
                                            <img src={this.state.forecast[1].day.condition.icon} alt="Weather"/>
                                            {this.showUnits()}
                                            <h5>{this.state.location}</h5>
                                            <h5>{this.state.forecast[1].day.condition.text}</h5>
                                            <ul className="nav nav-tabs card-header-tabs nav-fill">
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleCurrent}>Current</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link text-dark" onClick={this.handleToday}>Today</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="#" className="nav-link active disabled" aria-current="true">Tomorrow</Link>
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
                                                                        <p className="card-text">Min: {Math.round(this.state.forecast[1].day.mintemp_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Min: {Math.round(this.state.forecast[1].day.mintemp_f)} ºF</p>
                                                                    </>
                                                            )}
                                                            {this.state.unit === "celsius" ? (
                                                                    <>
                                                                        <p className="card-text">Max: {Math.round(this.state.forecast[1].day.maxtemp_c)} ºC</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Max: {Math.round(this.state.forecast[1].day.maxtemp_f)}ºF</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-sun" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Sun</h5>
                                                            <p className="card-text">Sunrise: {this.state.forecast[1].astro.sunrise}</p>
                                                            <p className="card-text">Sunset: {this.state.forecast[1].astro.sunset}</p>
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
                                                                        <p className="card-text">Total: {this.state.forecast[1].day.totalprecip_mm} mm</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Total: {this.state.forecast[1].day.totalprecip_in} in</p>
                                                                    </>
                                                            )}
                                                            <p className="card-text">Chance of rain: {this.state.forecast[1].day.daily_chance_of_rain}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-wind" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Wind</h5>
                                                            {this.state.unit === "celsius" ? (
                                                                    <>
                                                                        <p className="card-text ">Max: {Math.round(this.state.forecast[1].day.maxwind_kph)} kph</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text ">Max: {Math.round(this.state.forecast[1].day.maxwind_mph)} mph</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <i className="bi bi-moisture" style={{"fontSize": "3rem", "color": "bs-dark"}} aria-hidden="true"></i>
                                                            <h5 className="card-title">Humidity</h5>
                                                            <p className="card-text">Average: {this.state.forecast[1].day.avghumidity}%</p>
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
                                                                        <p className="card-text">Average: {this.state.forecast[1].day.avgvis_km} km</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="card-text">Average: {this.state.forecast[1].day.avgvis_miles} miles</p>
                                                                    </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{"paddingTop": "0.25rem", "paddingBottom": "0.4rem"}}>
                                            {this.parseDate()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        }

        else {
           return(
                <>
                    <section className="masthead">
                        <div className="container px-lg-5 d-flex h-100 align-items-center justify-content-center">
                                <div className="row">
                                    <div className="col-lg-4">
                                            <Spinner animation="border" variant="light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                    </div>
                                </div>
                            </div>
                    </section>
                </>
           )
        }
    }
}

export default showResults;