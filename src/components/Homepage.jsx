import Header from './Header';
import AdminDashboard from './Admin/AdminDashboard';
import CampgroundFeed from './CampgroundFeed';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const currUser = useSelector(state => state.auth.userInfo);
    console.log('currUser', currUser)

    return (
        <div>
            <Header />
            {currUser.isAdmin ? <AdminDashboard /> : <CampgroundFeed />}
        </div>
    )
}

export default HomePage;