import { Button, Modal, Form } from 'react-bootstrap';


const CreateCampModal = (props) => {
    const {show, handleClose} = props;
    return (
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="campgroundName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campgroundCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Password" />
                        </Form.Group>
                    </Form>
                        
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
        </Modal>
        </>
    )
}

export default CreateCampModal;