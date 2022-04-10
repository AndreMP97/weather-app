import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

class Error extends Component {
    constructor() {
        super();
        this.state = { 
            show: true,
            redirect: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event) {
        event.preventDefault();
        this.setState({show: false}, () => {
            this.setState({redirect: true});
            //console.log("debug " + this.state.show);
        });
    }

    render() {
        if (this.state.redirect === false) {
            return (
                <>
                    <section className="notfound bg-secondary text-center">
                        <div className="container">
                        <Modal show={this.state.show} centered>
                            <Modal.Header><div className="text-danger mb-1">PAGE NOT FOUND</div></Modal.Header>
                            <Modal.Body><div className="text-center text-danger mb-1">The page you're trying to access does not exist!</div></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        </div>
                    </section>
                </>
            )
        }
        else {
            return(
                <Navigate to={-1} />
            )
        }
    }
}    

export default Error;