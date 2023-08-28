import { Button, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/EditAccountForm.css'

const EditAccountForm = (props) => {
    const {toggle} = props;
    const dispatch = useDispatch();
    const { firstName, lastName, city, state, zipcode, email, profileImage, userId } = useSelector(state => state.auth.userInfo);

    const [updatedFirstName, setFirstName] = useState(firstName);
    const [updatedLastName, setLastName] = useState(lastName);
    const [updatedCity, setCity] = useState(city);
    const [updatedState, setState] = useState(state);
    const [updatedZip, setZip] = useState(zipcode);
    const [updatedPassword, setPassword] = useState();
    const [updatedProfileImage, setProfileImage] = useState(profileImage);


    const submitHandler = e => {
        e.preventDefault()

        const user = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            city: updatedCity,
            state: updatedState,
            zipcode: updatedZip,
            password: updatedPassword,
            profileImage: updatedProfileImage, 
            userId: userId

        }

        console.log('user ---->', user)

        axios({
            method: 'put',
            url: '/api/user',
            data : {
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                state: user.state,
                zipcode: user.zipcode, 
                password: user.password,
                userId: userId,
                profileImage: user.profileImage
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
                console.log('response.data', response.data)
                dispatch({
                    type: 'SET_USER',
                    payload: response.data
                })

                toggle();
            }
        })

    }

    return (
        <>
        <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-style" 
                            defaultValue={firstName} 
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-style" 
                            defaultValue={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-style" 
                            defaultValue={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg="2">
                    <Form.Group className="mb-3" controlId="state">
                        <Form.Label>State:</Form.Label>
                        <Form.Control 
                            type="text"  
                            className="input-style" 
                            defaultValue={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col lg="4">
                    <Form.Group controlId="zipcode">
                        <Form.Label>Zip:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="input-style" 
                            defaultValue={zipcode}
                            onChange={e => setZip(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            className="input-style" 
                            type="password" />
                    </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="profileImage" className="mb-3">
                        <Form.Label>Change Profile Image</Form.Label>
                        <Form.Control 
                            type="file"  
                            name="image" 
                            className="input-style" 
                            onChange={e => setProfileImage(e.target.files[0])}
                        />
                    </Form.Group>
                </Col>
            </Row>
                    <Button 
                        variant="light" 
                        onClick={toggle}>
                            Cancel
                    </Button>
                    <Button variant="dark" type="submit">Update Profile</Button>
            </Form>
    </>
    )
}

export default EditAccountForm