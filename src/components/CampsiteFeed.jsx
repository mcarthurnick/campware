import { useSelector } from 'react-redux';
import CampsiteCard from './Admin/CampsiteCard';
import CampsiteCardLong from './CampsiteCardLong';
import './styles/DashCard.css';

const CampsiteFeed = () => {
    const campsites = useSelector(state => state.feed.campgrounds.campsites);


    return (
        <>
        {campsites &&
            <ul>
            {campsites.map((campsite) => {
            console.log(campsite)
                    return (
                        // <CampsiteCard key={campsite.siteId} site={campsite}/>
                        <CampsiteCardLong key={campsite.siteId} site={campsite}/>
                    )
                })
            }
            </ul>
        }
        </>
    )
}

export default CampsiteFeed;