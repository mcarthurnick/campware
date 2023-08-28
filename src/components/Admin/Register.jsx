import { useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false)
    
    const registerUser = async (user) => {
        let result = await axios.post('/api/register', user);

    }

    function toggleAdmin(){
       setIsAdmin(!isAdmin) 
    }

    const submitHandler = e => {
        e.preventDefault()
        let user = {
            firstName: e.target[0].value,
            lastName: e.target[1].value, 
            email: e.target[2].value, 
            password: e.target[3].value,
            isAdmin: isAdmin
        }

        console.log('user', user)
        registerUser(user)

        navigate('/')

    }

    return (
        <>
        <Image src="./src/assets/CampWare.png" height={200} width={200}/>

        <Form onSubmit={e => submitHandler(e)}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Check type="checkbox" label="Are you a campground owner?" onClick={toggleAdmin}/>
                <Button variant="dark" type="submit">
                    Register
                </Button>
            </Form>
        </>
    )
}

export default Register;