import { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class FormComponent extends Component {
    _isMounted = false;

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
        this.upperCase = this.upperCase.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                const locations = response.data.features.map((place) => place.place_name);
                this.setState({autoComplete: locations}, () => {
                    //console.log("state", this.state.autoComplete);
                });
            }
        }   
        catch (error) {
            console.error(error);
        }
    }

    upperCase(string) {
        var splitString = string.toLowerCase().split(' ');
        for (var i = 0; i < splitString.length; i++) {
            splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);     
        }
        return splitString.join(' '); 
     }

    handleChange(event) {
        event.preventDefault();
        var string = this.upperCase(event.target.value);
        //console.log(string);
        this.setState({location: string}, () => {
                if (this.state.location.length >= 3 && !this.state.autoComplete.includes(this.state.location) && !this.state.location.includes(",")) {
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
                <form onSubmit={this.handleSubmit}>
                    <div class="mb-3">
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <input className="form-control form-control-lg" id="city" type="text" placeholder="Location" value={this.state.location} onChange={this.handleChange} autoComplete="off" list="locations" required/>
                                <datalist id="locations"> {this.state.autoComplete.map((opt, i) => (<option key={i}>{opt}</option>))} </datalist>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-secondary btn-lg shadow-none" id="submitButton" type="submit"><i className="bi bi-search"></i></button>
                            </div>
                            <Modal show={this.state.show} centered>
                                <Modal.Header><div className="text-danger mb-1">ERROR</div></Modal.Header>
                                <Modal.Body><div className="text-center text-danger mb-1">Please select a location!</div></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal> 
                        </div>
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

export default FormComponent;