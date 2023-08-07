import Header from './Header';
import AdminDashboard from './Admin/AdminDashboard';
import CampgroundFeed from './CampgroundFeed';


const HomePage = (props) => {
    const isLoggedIn = props;


    return (
        <div>
            <Header />
            {isLoggedIn ? <AdminDashboard /> : <CampgroundFeed />}
        </div>
    )
}

export default HomePage;