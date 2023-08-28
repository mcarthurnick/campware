import Header from './Header';
import { useSelector } from 'react-redux';
import { Image, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"


const CampsiteDetail = () => {
    const { siteID, siteNumber, siteDescription, siteType, siteImages, sitePrice } = useSelector(state => state.feed.selectedCampsite)
    const navigate = useNavigate();

    function navigateHome(){
        navigate('/home')
    }

    return (
        <>
        <Header />
            <Button onClick={navigateHome} className="back-button">Back</Button>
            Campsite Detail Page
            <hr />
            <Image src={siteImages[0]} height={400}/>
            Site # {siteNumber}
        <br />
            Description: {siteDescription}
        </>
    )

}

export default CampsiteDetail