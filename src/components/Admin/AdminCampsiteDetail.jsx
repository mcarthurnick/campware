import Header from '../Header';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import EditSiteForm from './EditSiteForm';

const CampsiteDetail = () => {
    const { siteID, siteNumber, siteDescription, siteType, siteImages, sitePrice } = useSelector(state => state.feed.selectedCampsite)
    const { campId } = useSelector(state => state.campground.selectedCampground)
    const navigate = useNavigate();
    const [editing, setIsEditing] = useState(false);

    function navigateHome(){
        navigate(`/campground/${campId}`)
    }

    function toggleEditMode() {
        setIsEditing(!editing)
    }

    return (
        <>
        <Header />
        <Button onClick={toggleEditMode}>Edit Campsite</Button>
            <Button onClick={navigateHome} className="back-button">Back</Button>
            <br />
            Campsite Detail Page
            <hr />
            {editing ? (
             <div>
                <EditSiteForm toggle={toggleEditMode}/>
             </div>   
            ) : (
                <div>
                   <Image src={siteImages[0]} height={400}/>
            Site # {siteNumber}
        <br />
            Description: {siteDescription} 
                </div>
            )}
        </>
    )

}

export default CampsiteDetail