import Header from './Header';
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Button, Container, Image, Row, Col } from 'react-bootstrap'
import axios from 'axios'


const AccountDetail = () => {
    const user = useSelector(state => state.auth.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            <Button onClick={handleLogout} variant="dark">Logout</Button>
            <h2>Account Detail</h2>
            <Container>
                <Row>
                    <Col>
                        <Image src="./src/assets/nick.jpeg" roundedCircle height={200} ></Image>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AccountDetail;