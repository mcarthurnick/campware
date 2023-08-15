import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import FeaturedCampgroundList from "./FeaturedCampgroundList";
import CampsiteFeed from "./CampsiteFeed";

const CampgroundFeed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/camp-feed')
        .then(response => {
            if(response.data){           
                dispatch({
                    type: 'SET_CAMPGROUND_FEED',
                    payload: response.data
                }) 
            }  
        })
        
    }, [])
    return (
        <>
            Campground Feed

            <FeaturedCampgroundList />

            <CampsiteFeed />
            
        </>
    )
}

export default CampgroundFeed;