import { useState } from 'react';
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import '../styles/CampgroundDetail.css'
import CampsiteCard from './CampsiteCard';
import { Row, Button, Col } from 'react-bootstrap'
import CreateSiteForm from './CreateSiteForm';

const CampgroundDetail = () => {
    //let params = useParams()
    const navigate = useNavigate();
    const c = useSelector(state => state.campground.selectedCampground);
    const [show, setShow] = useState(false);
    const campSites = c.campsites.map((campsite) => {
        return (
            <CampsiteCard key={campsite.siteNumber} site={campsite}/>
        )
    })

    function toggleForm() {
        setShow(!show)
    }

    function returnToDashboard(){
        navigate('/dashboard')
    }



    return (
        <>
            <Header />
            {!show &&
            <div>
            <div className="detail-container">
                <Button onClick={returnToDashboard}>Back</Button>
                <Row>
                        <Button variant="primary"  onClick={toggleForm} className="create-button">
                            Create Campsite
                        </Button>
                </Row>
                <h1>{c.campName}</h1>
                <hr />
            </div>
            <div>
                <h5>Contact:</h5>
            </div>
            <div>
                <p>{c.campPhone}</p>
                <div>{c.campAddress}</div>
                <div>{c.campCity}, {c.campState} {c.campZip}</div>
            </div>
            <div>
                <ul>
                {campSites}
                </ul>
            </div>
            </div>
}
            {show &&
                <CreateSiteForm toggle={toggleForm}/>
            }
        </>
    )
}

export default CampgroundDetail;