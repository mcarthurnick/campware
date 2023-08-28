import Header from './Header';
import { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Button, Container, Image, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './styles/AccountDetail.css'
import { Upload } from 'react-bootstrap-icons'
import EditAccountForm from './EditAccountForm';


const AccountDetail = () => {
    const user = useSelector(state => state.auth.userInfo);
    const [editing, setIsEditing] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function toggleEditMode() {
        setIsEditing(!editing)
    }

    function handleImageUpload() {

    }

    const handleLogout = () => {

        axios.get('/api/logout')
        .then(response => {
            dispatch({
                type: 'LOGOUT_USER'
              })
            navigate('/')
        })
    }

    return (
        <div>
            <Header />
            {!editing && <Button variant="light" onClick={toggleEditMode}>Edit Profile</Button>}
            <Button onClick={handleLogout} variant="dark">Logout</Button>
            <h2>Account Detail</h2>
        {editing ? (
            <Container>
               <EditAccountForm toggle={toggleEditMode}/>
            </Container> 
            ) : (

            <Container>
                <Row>
                    <Col>
                        <div className="upload-image" onClick={handleImageUpload}>
                            {user.profileImage ? (
                                <Image src={user.profileImage} roundedCircle height={200} ></Image>
                            ) : (
                                <div>
                                    <Upload size={55} color="white" className="placeholder-icon"/>
                                    <div className="placeholder-heading">
                                        <h6>Upload Image</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col>
                    </Col>
                    <Col md="auto">
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                        <p>{user.city}</p>
                        <p>{user.state}</p>
                        <p>{user.zipcode}</p>
                        <p></p>
                    </Col>
                </Row>
            </Container> 
            )  
            }
        </div>
    )
}

export default AccountDetail;