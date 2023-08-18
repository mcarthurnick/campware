import { Card, Button, Col, Row } from 'react-bootstrap'
import './styles/DashCard.css';

const CampsiteCardLong = (props) => {
    const {siteNumber, siteDescription, siteType, siteImages } = props.site;
    return (
        <Row className="campsiteRow">
            <Col xs lg="2">
                <img className="siteImageIcon" src={siteImages[0]}/>
            </Col>
            <Col>
                <h6>Description: </h6>{siteDescription}

            </Col>
            <Col xs lg="2">
                        <h4>Site Number: {siteNumber}</h4>
                            Type: {siteType}
            </Col>
        </Row>
    )
}

export default CampsiteCardLong