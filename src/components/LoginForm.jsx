import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitHandler = e => {
        e.preventDefault()

        let user = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        axios.post('/api/login', user)
            .then(response => {
                console.log('response', response)
                if(response){
                    dispatch({
                        type: 'SET_USER', 
                        payload : response.data 
                      })
                      
                    navigate('/home')
                }
                else {
                    console.log('error in submithandler')
                }
            })


    }
    
    return (
        <div>
            <h1>Login Form</h1>
            <Form onSubmit={e => submitHandler(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;