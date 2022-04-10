import { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Location from '../assets/svg/location.svg';
import Thermometer from '../assets/svg/thermometer.svg';
import Wind from '../assets/svg/wind.svg';
import Rain from '../assets/svg/rain.svg';
import Pressure from '../assets/svg/pressure.svg';
import Humidity from '../assets/svg/humidity.svg';
import Fog from '../assets/svg/fog.svg';
//import Forecast from '../assets/svg/forecast.svg';
import Sun from '../assets/svg/sun.svg';

class showResults extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { 
            loading: true,
            location: localStorage.getItem("location") || "",
            current: [],
            forecast: [],
            nav: localStorage.getItem("nav") || "now"
        };
        this.handleNow = this.handleNow.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleTomorrow = this.handleTomorrow.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
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

    handleNow(event) {
        event.preventDefault();
        this.setState({nav: "now"}, () => {
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

    render() {
        if(this.state.loading === false && this.state.nav === "now") {
            return(
                <>
                    <section className="results bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light">
                                <div className="card-header">
                                    <img src={this.state.current.condition.icon} alt="Weather"/>
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.current.condition.text}</h5>
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link active disabled" aria-current="true">Now</Link>
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
                                <div className="card-footer">
                                    {/*console.log("Debug epoch " + Date.now())*/}
                                    {/*console.log("API epoch " + this.state.current.last_updated_epoch)*/}
                                    <small className="text-muted">Last updated {parseInt((Date.now()/1000 - this.state.current.last_updated_epoch)/60)} minutes ago</small>
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
                    <section className="results bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light">
                                <div className="card-header">
                                    <img src={this.state.forecast[0].day.condition.icon} alt="Weather"/>
                                    {/*<h5>Forecast for {this.state.forecast[0].date.split('-').reverse().join('-')} in</h5>*/}
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.forecast[0].day.condition.text}</h5>
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link text-dark" onClick={this.handleNow}>Now</Link>
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
                                                    <img src={Thermometer} alt="Thermometer" className="card-title"/>
                                                    <h5 className="card-title">Temperature</h5>
                                                    <p className="card-text">Min: {this.state.forecast[0].day.mintemp_c}ºC / {this.state.forecast[0].day.mintemp_f}ºF</p>
                                                    <p className="card-text">Average: {this.state.forecast[0].day.avgtemp_c}ºC / {this.state.forecast[0].day.avgtemp_f}ºF</p>
                                                    <p className="card-text">Max: {this.state.forecast[0].day.maxtemp_c}ºC / {this.state.forecast[0].day.maxtemp_f}ºF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Wind} alt="Wind" className="card-title"/>
                                                    <h5 className="card-title">Wind</h5>
                                                    <p className="card-text">Max: {this.state.forecast[0].day.maxwind_kph} kph / {this.state.forecast[0].day.maxwind_mph} mph</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Rain} alt="Rain" className="card-title"/>
                                                    <h5 className="card-title">Precipitation</h5>
                                                    <p className="card-text">Total: {this.state.forecast[0].day.totalprecip_mm} mm / {this.state.forecast[0].day.totalprecip_in} in</p>
                                                    <p className="card-text">Chance of rain: {this.state.forecast[0].day.daily_chance_of_rain}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Sun} alt="Sun" className="card-title"/>
                                                    <h5 className="card-title">Sun</h5>
                                                    <p className="card-text">Sunrise: {this.state.forecast[0].astro.sunrise}</p>
                                                    <p className="card-text">Sunset: {this.state.forecast[0].astro.sunset}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Humidity} alt="Humidity" className="card-title"/>
                                                    <h5 className="card-title">Humidity</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">Average: {this.state.forecast[0].day.avghumidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Fog} alt="Fog" className="card-title"/>
                                                    <h5 className="card-title">Visibility</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">Average: {this.state.forecast[0].day.avgvis_km} km / {this.state.forecast[0].day.avgvis_miles} miles</p>
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

        else if(this.state.loading === false && this.state.nav === "tomorrow") {
            return(
                <>
                    <section className="results bg-secondary text-center">
                        <div className="container">
                            <div className="card mb-3 bg-light">
                                <div className="card-header">
                                    <img src={this.state.forecast[1].day.condition.icon} alt="Weather"/>
                                    {/*<h5>Forecast for {this.state.forecast[1].date.split('-').reverse().join('-')} in</h5>*/}
                                    <h5>{this.state.location}</h5>
                                    <h5>{this.state.forecast[1].day.condition.text}</h5>
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link text-dark" onClick={this.handleNow}>Now</Link>
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
                                                    <img src={Thermometer} alt="Thermometer" className="card-title"/>
                                                    <h5 className="card-title">Temperature</h5>
                                                    <p className="card-text">Min: {this.state.forecast[1].day.mintemp_c}ºC / {this.state.forecast[1].day.mintemp_f}ºF</p>
                                                    <p className="card-text">Average: {this.state.forecast[1].day.avgtemp_c}ºC / {this.state.forecast[1].day.avgtemp_f}ºF</p>
                                                    <p className="card-text">Max: {this.state.forecast[1].day.maxtemp_c}ºC / {this.state.forecast[1].day.maxtemp_f}ºF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Wind} alt="Wind" className="card-title"/>
                                                    <h5 className="card-title">Wind</h5>
                                                    <p className="card-text">Max: {this.state.forecast[1].day.maxwind_kph} kph / {this.state.forecast[1].day.maxwind_mph} mph</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Rain} alt="Rain" className="card-title"/>
                                                    <h5 className="card-title">Precipitation</h5>
                                                    <p className="card-text">Total: {this.state.forecast[1].day.totalprecip_mm} mm / {this.state.forecast[1].day.totalprecip_in} in</p>
                                                    <p className="card-text">Chance of rain: {this.state.forecast[1].day.daily_chance_of_rain}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Sun} alt="Sun" className="card-title"/>
                                                    <h5 className="card-title">Sun</h5>
                                                    <p className="card-text">Sunrise: {this.state.forecast[1].astro.sunrise}</p>
                                                    <p className="card-text">Sunset: {this.state.forecast[1].astro.sunset}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Humidity} alt="Humidity" className="card-title"/>
                                                    <h5 className="card-title">Humidity</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">Average: {this.state.forecast[1].day.avghumidity}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <img src={Fog} alt="Fog" className="card-title"/>
                                                    <h5 className="card-title">Visibility</h5>
                                                    <p className="card-text"></p>
                                                    <p className="card-text">Average: {this.state.forecast[1].day.avgvis_km} km / {this.state.forecast[1].day.avgvis_miles} miles</p>
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

        else {
           return(
                <>
                    <section className="loading bg-secondary text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4">
                                            <Spinner animation="border" variant="light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                    </section>
                </>
           )
        }
    }
}

export default showResults;