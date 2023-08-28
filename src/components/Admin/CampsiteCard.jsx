import { Card, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import '../styles/DashCard.css';



const CampsiteCard = (props) => {
    const {siteNumber, siteDescription, siteType, siteImages, siteID } = props.site;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClickDetail(){
        dispatch({
            type: 'SET_SELECTED_CAMPSITE',
            payload: props.site
        })
        navigate(`/dashboard/campsite/${siteID}`)
    }

    return (
            <Col>
                <Card className="text-center" style={{ width: '18rem'}}>
                <Card.Img variant="top" src={siteImages[0]} />
                    <Card.Body>
                        <Card.Title>Site Number: {siteNumber}</Card.Title>
                        <Card.Text>
                            Description: {siteDescription}
                        </Card.Text>
                        <Card.Footer>
                            Type: {siteType}
                        </Card.Footer>
                        <Button onClick={handleClickDetail}>View Campsite</Button>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default CampsiteCard;