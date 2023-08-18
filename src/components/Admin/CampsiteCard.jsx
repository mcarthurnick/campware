import { Card, Button, Col } from 'react-bootstrap'
import '../styles/DashCard.css';
const CampsiteCard = (props) => {
    const {siteNumber, siteDescription, siteType, siteImages } = props.site;

    return (
            <Col>
                <Card className="text-center" style={{ width: '18rem'}}>
                <Card.Img variant="top" src={siteImages[0]} />
                    <Card.Body>
                        <Card.Title>Site Number: {siteNumber}</Card.Title>
                        <Card.Text>
                            <h6>Description: </h6>{siteDescription}
                        </Card.Text>
                        <Card.Footer>
                            Type: {siteType}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default CampsiteCard;