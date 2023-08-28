import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import {  useSelector } from 'react-redux';
import './styles/Feed.css'

const FeaturedCampgroundList = (props) => {
    const { campgrounds } = props;


    return (
        <div className="featured-campgrounds">
            <h2>Featured Campgrounds</h2>
            <hr />
            {campgrounds && 
                <Row>
                    {campgrounds.map((campground) => {
                        return (
                            <Col key={campground.campId}>
                                <Card style={{ width: '18rem'}} >
                                    <Card.Img variant="top" src={campground.campLogo} height={200} width={200}/>
                                    <Card.Body>
                                        <Card.Title>{campground.campName}</Card.Title>
                                        <Card.Text>
                                        {campground.campCity}, {campground.campState}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
            </Row>
        }
        </div>
    )
}

export default FeaturedCampgroundList;