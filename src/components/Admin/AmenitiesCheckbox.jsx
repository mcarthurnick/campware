import { Form } from 'react-bootstrap'



const AmenitiesCheckbox = (props) => {
    const {name, handleAmenities} = props;

    function handleCheckbox(){
        handleAmenities(name)

    }


    return (
        <>
            <Form.Check
                inline
                label={name}
                name={name}
                type="checkbox"
                id={`inline-checkbox-1`}
                onChange={handleCheckbox}
            />
        </>
    )
}

export default AmenitiesCheckbox