import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import './styles/Header.css';
import { PersonGear } from 'react-bootstrap-icons'


const Header = () => {
    const user = useSelector(state => state.auth.userInfo)
    const navigate = useNavigate();

    const handleRoute = () => {
        if(user.isAdmin === true){
            navigate("/dashboard")
        } else {
            navigate("/home")
        }
    }

    return (
        <div className="navigation">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand onClick={handleRoute}>
                <img src="./src/assets/campware-logo.png" />    
                </Navbar.Brand>
                        <Nav className="ml-auto">
                        <Nav.Link href="/account">
                            {user.firstName}'s Account
                            <PersonGear size={25} className="account-icon"/>
                        </Nav.Link>
                        </Nav>              
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
