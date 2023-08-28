import { Form , Row, Col} from 'react-bootstrap';

const SortCampsiteButton = (props) => {
    const { handleSort, selected } = props


 return (
            <Col className="md-auto">
                <Form.Select 
                    value={selected} onChange={handleSort}>
                    <option>Sort By:</option>
                    <option value="Recommended">Recommended</option>
                    <option value="High Number">Site Number - Asceding</option>
                    <option value="Low Number">Site Number - Desceding</option>
                    <option value="Highest Price">Highest Price</option>
                    <option value="Lowest Price">Lowest Price</option>
                </Form.Select>
            </Col>
 )
}

export default SortCampsiteButton