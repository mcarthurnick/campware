import { useState } from 'react'
import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AmenitiesCheckbox from './AmenitiesCheckbox';


const CreateSiteForm = (props) => {
    const dispatch = useDispatch();
    const c = useSelector(state => state.campground.selectedCampground);
    const [siteNumber, setSiteNumber] = useState('')
    const [siteDescription, setSiteDescription] = useState('')
    const [siteType, setSiteType] = useState('');
    const [rvMaxLength, setRvMaxLength] = useState(0);
    const [siteImages, setSiteImages] = useState({});
    const [siteAmenities, setSiteAmenities] = useState([]);

    const {toggle} = props;

    const allAmenities = ['Fire Pit', 'Close to bathrooms', 'Pull-Thru Site', 'Back-In Site', 'Wifi', 'Cable Hookup', 'Picnic Table', 'Full Electrical Hook-up', 'Potable Water', 'Fully Shaded Site', 'Partial Shaded Site', 'No Shade over site']

    function handleSiteAmenities(amenity) {
        let items = siteAmenities
        if(items.includes(amenity)){
            items = items.filter(e => e !== amenity)
            setSiteAmenities(items)
        }
        else {
            items.push(amenity)
            console.log('items --->', items[0])
            setSiteAmenities(items)

        }
    }



    const submitHandler = e => {
        e.preventDefault()


        axios({
            method: 'post',
            url: '/api/create-site',
            data: {
                siteNumber: siteNumber, 
                siteDescription: siteDescription, 
                siteType: siteType,
                rvMaxLength: rvMaxLength,
                siteImages: siteImages, 
                siteAmenities: siteAmenities,
                campId: c.campId
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
        <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="siteName">
                        <Form.Label>Site Number</Form.Label>
                        <Form.Control type="text" onChange={e => setSiteNumber(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="siteDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={e => setSiteDescription(e.target.value)}/>
                    </Form.Group>   
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="siteType">
                        <Form.Label>Site Type</Form.Label>
                        <Form.Control type="text"  onChange={e => setSiteType(e.target.value)}/>
                    </Form.Group>  
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="rvMaxLength">
                        <Form.Label>Max RV Length</Form.Label>
                        <Form.Control type="text" onChange={e => setRvMaxLength(e.target.value)}/>
                    </Form.Group>
                </Col>
                </Row>
                        <Form.Group className="mb-3" controlId="siteImages">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control type="file"  name="image"  onChange={e => setSiteImages(e.target.files[0])}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="siteAmenities">
                            <Form.Label>Amenities</Form.Label>
                            <div>
                                {allAmenities.map((amenity) => (
                                    <AmenitiesCheckbox name={amenity} key={amenity} handleAmenities={handleSiteAmenities}/>
                                ))}
                            </div>
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