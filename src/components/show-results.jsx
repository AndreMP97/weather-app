import { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Location from '../assets/svg/location.svg';
import Thermometer from '../assets/svg/thermometer.svg';
import Wind from '../assets/svg/wind.svg';
import Rain from '../assets/svg/rain.svg';
import Pressure from '../assets/svg/pressure.svg';
import Humidity from '../assets/svg/humidity.svg';
import Fog from '../assets/svg/fog.svg';
import Forecast from '../assets/svg/forecast.svg';
import Sun from '../assets/svg/sun.svg';

class showResults extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { 
            loading: false,
            location: localStorage.getItem("location") || "",
            current: [],
            forecast: [],
            astro: [],
            date: "",
            currentcondition: "",
            forecastcondition: "",
            nav: "now"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        /*try {
            const response = await axios.get("https://api.weatherapi.com/v1/forecast.json",{
                params: {
                    key: process.env.REACT_APP_WEATHER_API_KEY,
                    q: this.state.location,
                    days: "1",
                    aqi: "no",
                    alerts: "yes"
                }
            })
            //console.log(response);
            if (response.data.current) {
                this.setState({current: response.data.current}, () => {
                    //console.log("state", this.state.current);
                });
                this.setState({currentcondition: response.data.current.condition.text}, () => {
                    //console.log("state", this.state.currentcondition);
                });
            }
            if (response.data.forecast.forecastday) {
                this.setState({forecast: response.data.forecast.forecastday[0].day}, () => {
                    //console.log("state", this.state.forecast);
                });
                this.setState({astro: response.data.forecast.forecastday[0].astro}, () => {
                    //console.log("state", this.state.forecast);
                });
                this.setState({date: response.data.forecast.forecastday[0].date}, () => {
                    //console.log("state", this.state.date);
                });
                this.setState({forecastcondition: response.data.forecast.forecastday[0].day.condition.text}, () => {
                    //console.log("state", this.state.forecastcondition);
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
        }*/
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClick() {
        if(this.state.nav === "now") {
            this.setState({nav: "today"}, () => {
                //console.log("nav " + this.state.show);
            });
        }
        else if (this.state.nav === "today") {
            this.setState({nav: "now"}, () => {
                //console.log("nav " + this.state.show);
            });
        }
    }

    render() {
        if(this.state.loading === false && this.state.nav === "now") {
            return(
                <>
                    <section className="features-icons bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light">
                                <div className="card-header">
                                    {/*<img src={Location} alt="Location"/>*/}
                                    <h5>Current Weather in </h5>
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.currentcondition}</h5>
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="true" onClick={this.handleClick}>Now</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-dark"  onClick={this.handleClick}>Today</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="row row-cols-1 row-cols-md-3 g-4">
                                        <div className="col">
                                            <div className="card h-100 ">
                                                <div className="card-body">
                                                    <img src={Thermometer} alt="Thermometer" className="card-title"/>
                                                    <h5 className="card-title">Temperature</h5>
                                                    <p className="card-text">{this.state.current.temp_c}ºC / {this.state.current.temp_f}ºF</p>
                                                    <p className="card-text">Feels like {this.state.current.feelslike_c}ºC / {this.state.current.feelslike_f}ºF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Wind} alt="Wind" className="card-title"/>
                                                    <h5 className="card-title">Wind</h5>
                                                    <p className="card-text">Direction: {this.state.current.wind_dir} / {this.state.current.wind_degree}º</p>
                                                    <p className="card-text">{this.state.current.wind_kph} kph / {this.state.current.wind_mph} mph</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Rain} alt="Rain" className="card-title"/>
                                                    <h5 className="card-title">Precipitation</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.precip_mm} mm / {this.state.current.precip_in} in</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Pressure} alt="Pressure" className="card-title"/>
                                                    <h5 className="card-title">Air Pressure</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.pressure_mb} mb / {this.state.current.pressure_in} in</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Humidity} alt="Humidity" className="card-title"/>
                                                    <h5 className="card-title">Humidity</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.humidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Fog} alt="Fog" className="card-title"/>
                                                    <h5 className="card-title">Visibility</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.vis_km} km / {this.state.current.vis_miles} miles</p>
                                                </div>
                                            </div>
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
                    <section className="features-icons bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light">
                                <div className="card-header">
                                    {/*<img src={Location} alt="Location"/>*/}
                                    <h5>Forecast for</h5>
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.currentcondition}</h5>
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link text-dark" aria-current="true"  onClick={this.handleClick}>Now</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active"  onClick={this.handleClick}>Today</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="row row-cols-1 row-cols-md-3 g-4">
                                        <div className="col">
                                            <div className="card h-100 ">
                                                <div className="card-body">
                                                    <img src={Thermometer} alt="Thermometer" className="card-title"/>
                                                    <h5 className="card-title">Temperature</h5>
                                                    <p className="card-text">{this.state.current.temp_c}ºC / {this.state.current.temp_f}ºF</p>
                                                    <p className="card-text">Feels like {this.state.current.feelslike_c}ºC / {this.state.current.feelslike_f}ºF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Wind} alt="Wind" className="card-title"/>
                                                    <h5 className="card-title">Wind</h5>
                                                    <p className="card-text">Direction: {this.state.current.wind_dir} / {this.state.current.wind_degree}º</p>
                                                    <p className="card-text">{this.state.current.wind_kph} kph / {this.state.current.wind_mph} mph</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Rain} alt="Rain" className="card-title"/>
                                                    <h5 className="card-title">Precipitation</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.precip_mm} mm / {this.state.current.precip_in} in</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Pressure} alt="Pressure" className="card-title"/>
                                                    <h5 className="card-title">Air Pressure</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.pressure_mb} mb / {this.state.current.pressure_in} in</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Humidity} alt="Humidity" className="card-title"/>
                                                    <h5 className="card-title">Humidity</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.humidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Fog} alt="Fog" className="card-title"/>
                                                    <h5 className="card-title">Visibility</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">{this.state.current.vis_km} km / {this.state.current.vis_miles} miles</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        }

        if(this.state.loading === false) {
            return (
                <>
                    <section className="features-icons bg-secondary text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Location} alt="Location" />
                                        <h3 className="text-light">Current Weather in </h3>
                                        <p className="lead mb-0 text-light">{this.state.location}</p>
                                        <p className="lead mb-0 text-light">{this.state.currentcondition}</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Thermometer} alt="Thermometer" />
                                        <h3 className="text-light">Temperature</h3>
                                        <p className="lead mb-0 text-light">{this.state.current.temp_c}ºC / {this.state.current.temp_f}ºF</p>
                                        <p className="lead mb-0 text-light">Feels like {this.state.current.feelslike_c}ºC / {this.state.current.feelslike_f}ºF</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Wind} alt="Wind" />
                                        <h3 className="text-light">Wind</h3>
                                        <p className="lead mb-0 text-light">Direction: {this.state.current.wind_dir} / {this.state.current.wind_degree}º</p>
                                        <p className="lead mb-0 text-light">{this.state.current.wind_kph} kph / {this.state.current.wind_mph} mph</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <img src={Rain} alt="Rain" />
                                        <h3 className="text-light">Precipitation</h3>
                                        <p className="lead mb-0 text-light">{this.state.current.precip_mm} mm / {this.state.current.precip_in} in</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Pressure} alt="Pressure" />
                                        <h3 className="text-light">Air Pressure</h3>
                                        <p className="lead mb-0 text-light">{this.state.current.pressure_mb} mb / {this.state.current.pressure_in} in</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Humidity} alt="Humidity" />
                                        <h3 className="text-light">Humidity</h3>
                                        <p className="lead mb-0 text-light">{this.state.current.humidity}%</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <img src={Fog} alt="Fog" />
                                        <h3 className="text-light">Visibility</h3>
                                        <p className="lead mb-0 text-light">{this.state.current.vis_km} km / {this.state.current.vis_miles} miles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="testimonials bg-secondary text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Forecast} alt="Forecast" />
                                        <h3 className="text-light">Forecast </h3>
                                        <p className="lead mb-0 text-light">For Today {this.state.date.split('-').reverse().join('-')}</p>
                                        <p className="lead mb-0 text-light">{this.state.forecastcondition}</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Thermometer} alt="Thermometer" />
                                        <h3 className="text-light">Temperature</h3>
                                        <p className="lead mb-0 text-light">Min: {this.state.forecast.mintemp_c}ºC / {this.state.forecast.mintemp_f}ºF</p>
                                        <p className="lead mb-0 text-light">Average: {this.state.forecast.avgtemp_c}ºC / {this.state.forecast.avgtemp_f}ºF</p>
                                        <p className="lead mb-0 text-light">Max: {this.state.forecast.maxtemp_c}ºC / {this.state.forecast.maxtemp_f}ºF</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Wind} alt="Wind" />
                                        <h3 className="text-light">Wind</h3>
                                        <p className="lead mb-0 text-light">Max: {this.state.forecast.maxwind_kph} kph / {this.state.forecast.maxwind_mph} mph</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <img src={Rain} alt="Rain" />
                                        <h3 className="text-light">Precipitation</h3>
                                        <p className="lead mb-0 text-light">Total: {this.state.forecast.totalprecip_mm} mm / {this.state.forecast.totalprecip_in} in</p>
                                        <p className="lead mb-0 text-light">Chance of rain: {this.state.forecast.daily_chance_of_rain}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Sun} alt="Sun" />
                                        <h3 className="text-light">Sun</h3>
                                        <p className="lead mb-0 text-light">Sunrise: {this.state.astro.sunrise}</p>
                                        <p className="lead mb-0 text-light">Sunset: {this.state.astro.sunset}</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                        <img src={Humidity} alt="Humidity" />
                                        <h3 className="text-light">Humidity</h3>
                                        <p className="lead mb-0 text-light">Average: {this.state.forecast.avghumidity}%</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                        <img src={Fog} alt="Fog" />
                                        <h3 className="text-light">Visibility</h3>
                                        <p className="lead mb-0 text-light">Average: {this.state.forecast.avgvis_km} km / {this.state.forecast.avgvis_miles} miles</p>
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
                    <section className="features-icons bg-secondary text-center"></section>
                    <section className="features-icons bg-secondary text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4">
                                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                            <Spinner animation="border" variant="light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                    </section>
                    <section className="features-icons bg-secondary text-center"></section>
                </>
           )
        }
    }
}

export default showResults;