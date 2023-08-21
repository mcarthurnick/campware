import { Button, Form, Image } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './styles/LoginForm.css'

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectToRegister = () => {
        navigate('/register')
    }
    
    const submitHandler = e => {
        e.preventDefault()

        let user = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        axios.post('/api/login', user)
            .then(response => {
                if(response){
                    dispatch({
                        type: 'SET_USER', 
                        payload : response.data 
                      })

                    if(response.data.isAdmin === true){
                        navigate('/dashboard')
                    }
                    else {
                        navigate('/home')
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                  toast.error(`${error.response.data}`, {
                    position: toast.POSITION.TOP_LEFT,
                    theme: "dark"
                  });
                } else if (error.request) {
                    toast.error(`${error.request}`, {
                        position: toast.POSITION.TOP_LEFT,
                        theme: "dark"
                      });
                } else {
                    toast.error(`${error.message}`, {
                        position: toast.POSITION.TOP_LEFT,
                        theme: "dark"
                      });
                }
                console.log(error.config);
              });


    }
    
    return (
        <div>
            <Image src="./src/assets/CampWare.png" height={200} width={200}/>
            <ToastContainer />
            <Form onSubmit={e => submitHandler(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Login
                </Button>
            </Form>
            <div className="registerAccount">
                <h6>Don't have an account?</h6>
                <Button onClick={redirectToRegister} variant="light">
                    Register
                </Button>
            </div>
        </div>
    )
}

export default LoginForm;