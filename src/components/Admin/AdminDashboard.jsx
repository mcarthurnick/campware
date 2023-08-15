import { useState, useEffect } from 'react';
import DashCard from "./DashCard";
import { Container, Row, Col, Button} from 'react-bootstrap'
import CreateCampgroundForm from './CreateCampForm';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import CampgroundList from './CampgroundList'
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const currUser = useSelector(state => state.auth.userInfo);
    const campgrounds = useSelector(state => state.campground.campgrounds);
    const isLoading = useSelector(state => state.campground.loading)

    function toggleForm() {
        setShow(!show)
    }

    useEffect(() => {
        axios.get('/api/campgrounds')
        .then(response => {
            if(response.data){
                console.log('response.data', response.data)
                dispatch({
                    type: 'SET_CAMPGROUNDS',
                    payload: response.data
                }) 
            }  
        })
        
    }, [])

    const campgroundList = campgrounds.map((campground) => 
            <CampgroundList key={campground.campId} campground={campground}/>
    )


    return (
        <div className="dashboard-container">
            {!show &&
            <div>
                <Row>
                    <Button variant="primary" onClick={toggleForm} className="create-button">
                        Create Campground
                    </Button>
                </Row>
            <Col>
            {!isLoading &&
                <Row>

                        {campgroundList}
                </Row>
            }
            </Col>
            </div>
            }
            <div>
                {show &&
                <CreateCampgroundForm user={currUser.userId} toggle={toggleForm}/>
                }
            </div>
        </div>
    )
}

export default AdminDashboard;