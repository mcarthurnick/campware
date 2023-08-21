import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AmenitiesCheckbox from './AmenitiesCheckbox'


const CreateCampgroundForm = (props) => {
    const [campName, setCampName] = useState('')
    const [campWebsite, setCampWebsite] = useState('')
    const [campAddress, setCampAddress] = useState('')
    const [campCity, setCampCity] = useState('')
    const [campState, setCampState] = useState('')
    const [campZip, setCampZip] = useState('')
    const [campPhone, setCampPhone] = useState('')
    const [campAmenities, setCampAmenities] = useState([])
    const [campLogo, setCampLogo] = useState({})
    const [campImages, setCampImages] = useState({})
    //const [userId, setUserId] = useState

    const allAmenities = ['Bathrooms','Cable Hookups','Dog Run', 'Fire Pits', 'Community Showers', 'Fitness Room', 'Laundry', 'Wifi', 'Pet Friendly', 'Playground', 'Swimming Pool', 'Back-In Sites', 'Pull-Thru Sites', 'Propane', 'Dump Station' ,'Weekly Rates']

    function handleCampAmenities(amenity) {
        let items = campAmenities
        if(items.includes(amenity)){
            items = items.filter(e => e !== amenity)
            setCampAmenities(items)
        }
        else {
            items.push(amenity)
            console.log('items --->', items[0])
            setCampAmenities(items)

        }
    }



    console.log('campAmenities --->', campAmenities)

    const dispatch = useDispatch();
    const {user, toggle} = props;

    const submitHandler = e => {
        e.preventDefault()


        let campground = {
            campName,
            campWebsite,
            campAddress,
            campCity,
            campState,
            campZip,
            campPhone,
            campAmenities,
            userId: user,
            campLogo,
            campImages

        }

        console.log('campground', campground)


        axios({
            method: 'post',
            url: '/api/create-camp',
            data : {
                campName: campName, 
                campWebsite: campWebsite,
                campAddress: campAddress,
                campCity: campCity, 
                campState: campState,
                campZip: campZip, 
                campPhone: campPhone, 
                campAmenities: campAmenities,
                campLogo: campLogo,
                campImages: campImages, 
                userId: user
            },
            headers: {
                "Content-Type": "multipart/form-data"
            },
            transformRequest:[function (data, headers){
                let formData = new FormData(); Object.keys(data).forEach(attr => { formData.append(attr, data[attr]); }); 
                return formData;
            }]

                })
            .then(response => {
                
                if(response){
                    toggle()
                    dispatch({
                        type: 'SET_CAMPGROUNDS',
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
        <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="campName">
                        <Form.Label>Campground Name</Form.Label>
                        <Form.Control type="text" onChange={e => setCampName(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="campWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" onChange={e => setCampWebsite(e.target.value)}/>
                    </Form.Group>   
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="campAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text"  onChange={e => setCampAddress(e.target.value)}/>
                    </Form.Group>  
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="campCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" onChange={e => setCampCity(e.target.value)}/>
                    </Form.Group>
                </Col>
                </Row>
                        <Form.Group className="mb-3" controlId="campState">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" onChange={e => setCampState(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" onChange={e => setCampZip(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" onChange={e => setCampPhone(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="campAmenities">
                            <Form.Label>Amenities</Form.Label>
                            <div>
                                {allAmenities.map((amenity) => (
                                    <AmenitiesCheckbox name={amenity} key={amenity} handleAmenities={handleCampAmenities}/>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="campLogo" className="mb-3">
                            <Form.Label>Select Campground Logo</Form.Label>
                            <Form.Control type="file"  name="image"  onChange={e => setCampLogo(e.target.files[0])}/>
                        </Form.Group>

                        <Form.Group controlId="campImages" className="mb-3">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control type="file"  name="image"  onChange={e => setCampImages(e.target.files[0])}/>
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