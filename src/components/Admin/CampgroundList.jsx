import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CampgroundList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {campName, campCity, campState , campLogo, campId} = props.campground;
    console.log('campId', campId)

    const clickDetailHandler = () => {
      dispatch({
        type: 'SET_DETAIL_CAMPGROUND',
        payload: props.campground
      })
      navigate(`/campground/${campId}`)
    
    }

    const deleteCampground = () => {
      axios.delete(`/api/delete/${campId}`)
            .then(response => {
                if(response){
                    dispatch({
                        type: 'SET_CAMPGROUNDS', 
                        payload : response.data 
                      })
                }
                else {
                    console.log('error')
                }
            })
    }

    return (
    <Card style={{ width: '18rem'}} >
      <Card.Img variant="top" src={campLogo} />
      <Card.Body>
        <Card.Title>{campName}</Card.Title>
        <Card.Text>
          {campCity}, {campState}
        </Card.Text>
        <Button variant="danger" onClick={deleteCampground}>Delete</Button>
        <Button variant="primary" onClick={clickDetailHandler}>Details</Button>
      </Card.Body>
    </Card>
    )
}

export default CampgroundList