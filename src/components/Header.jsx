import { Container, Nav, Navbar } from 'react-bootstrap'
import './styles/Header.css';


const Header = () => {
    return (
        <div className="navigation">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home">CampWare</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/">Account</Nav.Link>
                </Nav>
                
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
