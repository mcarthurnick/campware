import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';


const CreateCampgroundForm = (props) => {
    const currUser = useSelector(state => state.auth.userInfo);
    const {user, toggle} = props;



    const submitHandler = e => {
        e.preventDefault()
        console.log('hit!', e.target[0].value)

        let campground = {
            campName: e.target[0].value,
            campAddress: e.target[1].value,
            campCity: e.target[2].value,
            campState: e.target[3].value,
            campZip: e.target[4].value,
            campPhone: e.target[5].value,
            campWebsite: e.target[6].value,
            campAmenities: [e.target[7].value],
            campLogo: e.target[8].value,
            campImages: [e.target[9].value],
            userId: user

        }

        console.log('campground', campground)

        axios.post('/api/create-camp', campground)
            .then(response => {
                console.log('response', response)
                if(response){
                    toggle()
                    // dispatch({
                    //     type: 'SET_USER', 
                    //     payload : response.data 
                    //   })
                      
                    // navigate('/home')
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
                    <Form.Group className="mb-3" controlId="campName">
                        <Form.Label>Campground Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="campWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>   
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="campAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>  
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="campCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>
                </Row>
                        <Form.Group className="mb-3" controlId="campState">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campAmenities">
                            <Form.Label>Amenities</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campLogo">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campImages">
                            <Form.Label>Images</Form.Label>
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

export default CreateCampgroundForm;