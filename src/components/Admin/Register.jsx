import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
    const currUserInfo = useSelector(state => state.userInfo);
    const navigate = useNavigate();
    
    const registerUser = async (user) => {
        let result = await axios.post('/api/register', user);
    }

    const submitHandler = e => {
        e.preventDefault()
        let user = {
            firstName: e.target[0].value,
            lastName: e.target[1].value, 
            email: e.target[2].value, 
            password: e.target[3].value
        }
        registerUser(user)
        navigate('/')

    }

    return (
        <>
        <h1>Register Form</h1>
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
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    )
}

export default Register;