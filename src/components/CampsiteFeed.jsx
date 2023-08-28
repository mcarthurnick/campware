import CampsiteCardLong from './CampsiteCardLong';
import './styles/DashCard.css';
import './styles/CampsiteFeed.css'
import { Row } from 'react-bootstrap';


const CampsiteFeed = (props) => {
    const { campsites, campsiteFavorites } = props

    function checkFavorite(siteID, campsiteFavorites){
        if(campsiteFavorites.includes(siteID)){
            return true
        }
        return false
    }


    return (
        <>
        <Row>
            {campsites &&
                <ul>
                {campsites.map((campsite) => {
                    let isFavorite = false
                    if(campsiteFavorites){
                        isFavorite = checkFavorite(campsite.siteID, campsiteFavorites)
                    }
                    
                        return (
                            <CampsiteCardLong key={campsite.siteID} isFavorite={isFavorite} site={campsite}/>
                        )
                    })
                }
                </ul>
            }
        </Row>
        </>
    )
}

export default CampsiteFeed;