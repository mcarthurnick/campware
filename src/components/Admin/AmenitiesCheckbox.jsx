import { useState } from 'react'
import { Form } from 'react-bootstrap'



const AmenitiesCheckbox = (props) => {
    const {name, handleAmenities} = props;
    const [checked, setIsChecked] = useState(props.checked)

    function handleCheckbox(){
        setIsChecked(!checked)
        handleAmenities(name)

    }


    return (
        <>
            <Form.Check
                checked={checked}
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