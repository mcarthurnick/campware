import { useState } from 'react';
import DashCard from "./DashCard";
import { Container, Row, Button} from 'react-bootstrap'
import CreateCampModal from './CreateCampModal';

const AdminDashboard = () => {
    const [show, setShow] = useState(false);

    return (
        <>
        <Button variant="primary" onClick={() => setShow(true)}>
            Create Campground
        </Button>
        <CreateCampModal show={show} />
        <Container>
            <Row>
                <DashCard title="Campgrounds Listed" value="6"/>
                <DashCard title="Reservation Requests" value="3"/>
                <DashCard title="Occupancy Rate" value="89%"/>
                <DashCard title="Total Campground Clicks" value="3,290" />
            </Row>
        </Container>
        </>
    )
}

export default AdminDashboard;