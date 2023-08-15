import Header from './Header';
import {  useSelector } from 'react-redux';


const AccountDetail = () => {
    const user = useSelector(state => state.auth.userInfo);

    return (
        <div>
            <Header />
            <h2>Account Detail</h2>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
        </div>
    )
}

export default AccountDetail;