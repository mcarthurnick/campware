import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import {  Container, Row, Col } from 'react-bootstrap'
import FeaturedCampgroundList from "./FeaturedCampgroundList";
import CampsiteFeed from "./CampsiteFeed";
import FilterSidebar from './FilterSidebar';
import './styles/CampgroundFeed.css'
import SortCampsiteButton from './SortCampsiteButton';

const CampgroundFeed = () => {
    const dispatch = useDispatch();
    const campsiteAmenities = ['Fire pit', 'Close to dog park', 'Pull-Thru Site', 'Back-In Site', 'Wifi', 'Cable Hookup', 'Picnic Table', 'Full Electrical Hook-up', 'Potable Water', 'Very Shady', 'Not Shaded']
    const campsites = useSelector(state => state.feed.campsites);
    const campgrounds = useSelector(state => state.feed.campgrounds);
    const campsiteFavorites = useSelector(state => state.auth.userInfo.campsiteFavorites)
    const filteredCampsites = useSelector(state => state.feed.filteredCampsites)
    const [sites, setCampsites] = useState(campsites)
    const [selected, setSeleted] = useState()

    console.log('campSITEFAVORITE', campsiteFavorites)

    const getCampgroundData = async () => {
       await axios.get('/api/camp-feed')
       .then(response => {
           if(response.data){           
               dispatch({
                   type: 'SET_CAMPGROUND_FEED',
                   payload: response.data
               }) 
           }  
       }) 
    }


    useEffect(() => {
        getCampgroundData()
        
    }, [])

    function handleSort(e){
        let sortedSites = []
        setSeleted(e.target.value)

        if(e.target.value === "Highest Price"){
            sortedSites = sites.sort((a, b) => b.sitePrice - a.sitePrice)
            dispatch({
                        type: 'SET_CAMPSITE_FEED',
                        payload: sortedSites
                    })

        }

        if(e.target.value === "Lowest Price"){
            sortedSites = sites.sort((a, b) => a.sitePrice - b.sitePrice)
            dispatch({
                type: 'SET_CAMPSITE_FEED',
                payload: sortedSites
            })
        }
    }



    return (
        <>


            <FeaturedCampgroundList campgrounds={campgrounds}/>
        <Container>
            {/* <Row className="sort-by-form">
                <SortCampsiteButton />
            </Row> */}
            <SortCampsiteButton handleSort={handleSort} selected={selected}/>
            <Row>
                <Col lg="3">
                    <FilterSidebar amenities={campsiteAmenities}/>
                </Col>
                {/* <Col>
                {filteredCampsites && 
                    <CampsiteFeed campsites={filteredCampsites}/>
                }
                
                {filteredCampsites.length === 0 &&
                    <CampsiteFeed campsites={campsites}/>
                }
                </Col> */}
                <Col><CampsiteFeed campsites={campsites} campsiteFavorites={campsiteFavorites}/></Col>
            </Row>
        </Container>
            
        </>
    )
}

export default CampgroundFeed;