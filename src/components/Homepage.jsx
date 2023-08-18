import Header from './Header';
import AdminDashboard from './Admin/AdminDashboard';
import CampgroundFeed from './CampgroundFeed';
import { useSelector} from 'react-redux';

const HomePage = () => {
    const currUser = useSelector(state => state.auth.userInfo);


    return (
        <div>
            <Header />
            <CampgroundFeed />
        </div>
    )
}

export default HomePage;







