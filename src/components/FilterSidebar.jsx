import {  useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import AmenitiesCheckbox from './Admin/AmenitiesCheckbox';
import {  Form, Col, Row } from 'react-bootstrap'

const FilterSidebar = (props) => {
    const { amenities } = props
    const [checkedAmenities, setCheckedAmenities] = useState([]);
    const dispatch = useDispatch();
    const filteredCampsites = useSelector(state => state.feed.filteredCampsites)
    const campsites = useSelector(state => state.feed.campsites)



    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
      }

    function handleCheckbox(amenity) {
        let currAmenitites = checkedAmenities;
        let tempFilterSites = []
        let checkedAmenity = amenity.target.value;
        
        //if amenity is not already in currAmenitites then add it to the array

        if(!currAmenitites.includes(checkedAmenity)){
            currAmenitites.push(checkedAmenity)

            // then loop through the campsites that have that amenity and 
            // add that campsite to the currCampsites array
            tempFilterSites = []
            for(let i = 0; i < currAmenitites.length; i++){
                for(let j = 0; j < filteredCampsites.length; j++){
                    if(filteredCampsites[j].siteAmenities.includes(currAmenitites[i])){
                        tempFilterSites.push(filteredCampsites[j])
                    }
                }
            }

            tempFilterSites = tempFilterSites.filter(onlyUnique)
            dispatch({
                type: 'FILTER_BY_AMENITIES',
                payload: tempFilterSites
                }) 
            //return the currCampsites array
        }

        //if amenity is already in teh currAmenities array then remove it
        else if (currAmenitites.includes(checkedAmenity)){
            tempFilterSites = []
            let amenIndex = currAmenitites.indexOf(checkedAmenity)
            currAmenitites.splice(amenIndex, 1)
            if(currAmenitites.length === 0){
                dispatch({
                    type: 'FILTER_BY_AMENITIES',
                    payload: campsites
                    }) 
            } else {
                for(let i = 0; i < currAmenitites.length; i++){
                    for(let j = 0; j < filteredCampsites.length; j++){
                        if(filteredCampsites[j].siteAmenities.includes(currAmenitites[i])){
                            tempFilterSites.push(filteredCampsites[j])
                        }
                    }
                }
                tempFilterSites = tempFilterSites.filter(onlyUnique)
                dispatch({
                    type: 'FILTER_BY_AMENITIES',
                    payload: tempFilterSites
                }) 
            }
            
        }
    }
    

    return (
        <>
            Filter:
            <hr />
            {amenities.map((amenity) => (
                <Form key={amenity}>
                    <Row className="mb-3">
                            <Col lg="1">
                                <Form.Check.Input type="checkbox" value={amenity} onChange={handleCheckbox}/>
                            </Col>
                            <Col className="left-align-filter">
                                <Form.Check.Label>{amenity}</Form.Check.Label>
                            </Col>
                    </Row>
                </Form>           
            ))}
        </>
    )
}

export default FilterSidebar;











// function handleCheckbox(amenity) {
    
//     let checkedAmenity = amenity.target.value
//     let amenitiesList = checkedAmenities;
//     let tempfilteredCampsites = [];

//     if(amenitiesList.includes(checkedAmenity)){

//         let amenIndex = amenitiesList.indexOf(checkedAmenity)

//         amenitiesList.splice(amenIndex, 1)
        

//         if(amenitiesList.length === 0){
//             console.log('Hitting dispatch', campsites);
//             dispatch({
//                 type: 'FILTER_BY_AMENITIES',
//                 payload: campsites
//             }) 
//         } else {
//             let filCampsites = []
//             for(let i = 0; i < filteredCampsites.length; i++){
//                 if(filteredCampsites[i].siteAmenities.includes(checkedAmenity)){
//                     filCampsites.push(filteredCampsites[i])
//                 }
//             }
//             console.log('filCampsites', filCampsites)

//             dispatch({
//                 type: 'FILTER_BY_AMENITIES',
//                 payload: filCampsites
//             })
//         }
//         setCheckedAmenities(amenitiesList)

//     } else {
//         console.log('checkedAmenities 1 ---->', checkedAmenities)
//         amenitiesList.push(checkedAmenity)
//         setCheckedAmenities(amenitiesList)
//         for(let i = 0; i < campsites.length; i++){
//             if(campsites[i].siteAmenities.includes(checkedAmenity)){
//                 tempfilteredCampsites.push(campsites[i])
//             }
//         }
//         dispatch({
//             type: 'FILTER_BY_AMENITIES',
//             payload: tempfilteredCampsites
//         }) 
//     }

//     console.log('checkedAmenities', checkedAmenities)
//     console.log('filteredCampsites', filteredCampsites)

// }