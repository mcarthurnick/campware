import { Card, Button, Col } from 'react-bootstrap'
import '../styles/DashCard.css';
const DashCard = (props) => {
    const {title, description, value } = props;
    return (
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text className="card-value">
                            {value}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default DashCard;