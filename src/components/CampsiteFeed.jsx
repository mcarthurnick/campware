import { useSelector } from 'react-redux';
import CampsiteCard from './Admin/CampsiteCard';

const CampsiteFeed = () => {
    const campsites = useSelector(state => state.feed.campgrounds.campsites);


    return (
        <>
        {campsites &&
            <ul>
            {campsites.map((campsite) => {
            console.log(campsite)
                    return (
                        <CampsiteCard key={campsite.siteId} site={campsite}/>
                    )
                })
            }
            </ul>
        }
        </>
    )
}

export default CampsiteFeed;