import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import {  useSelector } from 'react-redux';

const FeaturedCampgroundList = () => {
    const campgrounds = useSelector(state => state.feed.campgrounds.campgrounds);


    return (
        <>
        <h2>Featured Campgrounds</h2>
        <hr />
        {campgrounds && 
            <Row>
                 {campgrounds.map((campground) => {
                    return (
                        <Col>
                            <Card style={{ width: '18rem'}} >
                                <Card.Img variant="top" src={campground.campLogo} />
                                <Card.Body>
                                    <Card.Title>{campground.campName}</Card.Title>
                                    <Card.Text>
                                    {campground.campCity}, {campground.campState}
                                    </Card.Text>
                                    <Button variant="danger" >Delete</Button>
                                    <Button variant="primary">Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
        </Row>
    }
        </>
    )
}

export default FeaturedCampgroundList;