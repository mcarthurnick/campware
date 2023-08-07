import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"


const LoginForm = () => {
    const navigate = useNavigate()
    
    const submitHandler = e => {
        e.preventDefault()
        
        console.log('email:', e.target[0].value)
        console.log('password:', e.target[1].value)
        
        navigate('/home')

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