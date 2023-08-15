import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const CreateSiteForm = (props) => {
    const dispatch = useDispatch();
    const c = useSelector(state => state.campground.selectedCampground);
    const {toggle} = props;



    const submitHandler = e => {
        e.preventDefault()

        let campsite = {
            siteNumber: e.target[0].value,
            siteDescription: e.target[1].value,
            siteType: e.target[2].value,
            rvMaxLength: e.target[3].value,
            siteImages: [e.target[4].value],
            siteAmenities: [e.target[5].value],
            campId: c.campId

        }
        console.log('campsite --->', campsite)

        axios.post('/api/create-site', campsite)
            .then(response => {
                console.log('response - campsite', response.data)
                if(response){
                    toggle()
                    dispatch({
                        type: 'SET_CAMPSITES',
                        payload: response.data
                    }) 
                      
                }
                else {
                    console.log('error in submithandler')
                }
            })


    }
    return (
        <>
        <Form onSubmit={submitHandler}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="siteName">
                        <Form.Label>Site Number</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="siteDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>   
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="siteType">
                        <Form.Label>Site Type</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>  
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="rvMaxLength">
                        <Form.Label>Max RV Length</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                </Row>
                        <Form.Group className="mb-3" controlId="siteImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="siteAmenities">
                            <Form.Label>Amenities</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Button variant="danger" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>

        </>
    )
}

export default CreateSiteForm;