import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './styles/Header.css';


const Header = () => {
    const user = useSelector(state => state.auth.userInfo)
    return (
        <div className="navigation">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/home">CampWare</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/account">{user.firstName}'s Account</Nav.Link>
                </Nav>
                
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
