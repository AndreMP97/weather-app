import React, { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap';

function Error() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} centered>
            <Modal.Header><div className="text-danger mb-1">ERROR</div></Modal.Header>
            <Modal.Body><div className="text-center text-danger mb-1">Please select a location!</div></Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
            </>
      );
}

export default Error;