import { Card, Button, Col, Row } from 'react-bootstrap'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import './styles/DashCard.css';

const CampsiteCardLong = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {siteNumber, siteDescription, siteType, siteImages, sitePrice, siteID} = props.site;
    const [isFavorite, setIsFavorite] = useState(props.isFavorite)
    const userId = useSelector(state => state.auth.userInfo.userId)



    function handleFavorite(){
        setIsFavorite(!isFavorite)
        let userSite = {
            siteID,
            userId
        }
        axios.put('/api/user/favorite', userSite)
        .then(response => {
            dispatch({
               type: 'SET_USER',
               payload: response.data
            })
        })
    }

    function handleClick(){
        dispatch({
            type: 'SET_SELECTED_CAMPSITE',
            payload: props.site
        })
        navigate(`/campsite/${siteID}`)
    }

    

    return (
        <Row className="campsiteRow">
            <Col xs lg="2">
                <img className="siteImageIcon" src={siteImages[0]}/>
            </Col>
            <Col>
                <h6>Description: </h6>{siteDescription}

            </Col>
            <Col xs lg="3">
                {!isFavorite ? <Heart size={25} onClick={handleFavorite}/> : <HeartFill size={25} color={"red"} onClick={handleFavorite}/>}
                        <h4>Site Price ${sitePrice}</h4>
                        Site Number: {siteNumber}
                        <br />
                            Type: {siteType}
                            <br />
                <Button onClick={handleClick}>View Site</Button>
            </Col>
        </Row>
    )
}

export default CampsiteCardLong