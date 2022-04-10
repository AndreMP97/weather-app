import { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class Form extends Component {
    constructor() {
        super();
        this.state = { 
            location: '',
            result: '',
            autoComplete: [],
            results: false,
            show: false
        };
        this.fetchCity = this.fetchCity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async fetchCity() {
        try {
            const response = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.state.location + ".json",{
                params: {
                    access_token: process.env.REACT_APP_CITY_API_KEY,
                    autocomplete: "true",
                    types: "place"
                }
            })
            //console.log(response);
            if (response.data.features) {
                const locations = response.data.features.map((place) => place.place_name.toUpperCase());
                this.setState({autoComplete: locations}, () => {
                    //console.log("state", this.state.autoComplete);
                });
            }
        }   
        catch (error) {
            console.error(error);
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({location: event.target.value.toUpperCase()}, () => {
                if (this.state.location.length >= 3 && !this.state.autoComplete.includes(this.state.location)) {
                    //console.log("search");
                    this.fetchCity();
                }
            }
        );
    }

    handleSubmit(event) {
        localStorage.clear();
        event.preventDefault();
        if(this.state.autoComplete.includes(this.state.location)) {
            this.setState({results: true}, () => {
                localStorage.setItem("location", this.state.location);
            });
        }
        else {
            this.setState({show: true}, () => {
                //console.log("debug " + this.state.show);
            });
        }
    }

    handleClose() {
        this.setState({show: false}, () => {
            //console.log("debug " + this.state.show);
        });
    }

    render() {
        if (this.state.results === false) {
            return (
            
                <form className="form-subscribe" id="contactForm" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <input className="form-control form-control-lg" id="city" type="text" placeholder="LOCATION" value={this.state.location} onChange={this.handleChange} autoComplete="off" list="locations" required/>
                            <datalist id="locations"> {this.state.autoComplete.map((opt, i) => (<option key={i}>{opt}</option>))} </datalist>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-secondary btn-lg" id="submitButton" type="submit">FIND</button>
                        </div>
                        <Modal show={this.state.show} centered>
                            <Modal.Header><div className="text-danger mb-1">ERROR</div></Modal.Header>
                            <Modal.Body><div className="text-center text-danger mb-1">Please select a location!</div></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal> 
                    </div>
                </form>
            );
        }
        else {
            return(
                <Navigate to="result" />
            );
        }
    }
}

export default Form;