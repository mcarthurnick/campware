import { useState } from 'react';
import DashCard from "./DashCard";
import { Container, Row, Button} from 'react-bootstrap'
import CreateCampgroundForm from './CreateCampForm';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const [show, setShow] = useState(false);
    const currUser = useSelector(state => state.auth.userInfo);

    function toggleForm() {
        setShow((show) => !show)
    }

    return (
        <>
        {!show &&
        <div>
            <Container>
                <Row>
                    <DashCard title="Campgrounds Listed" value="6"/>
                    <DashCard title="Reservation Requests" value="3"/>
                    <DashCard title="Occupancy Rate" value="89%"/>
                    <DashCard title="Total Campground Clicks" value="3,290" />
                </Row>
            </Container>
            <Button variant="primary" onClick={toggleForm}>
                Create Campground
            </Button>
        </div>
        }

        <div>
        {show &&
        <CreateCampgroundForm user={currUser.userId} toggle={toggleForm}/>
    }
        </div>
        </>
    )
}

export default AdminDashboard;