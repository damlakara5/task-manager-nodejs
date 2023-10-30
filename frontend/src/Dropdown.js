import Form from 'react-bootstrap/Form';

function DropdownComponent({options, setValue, value}) {
  return (
    <Form.Select aria-label="Default select example" onChange={(e) => setValue(e.target.value)} value={value}>
        {
            options.map((option,i ) => (
                <option key={i} value={option}> {option} </option>
            ))
        }
    </Form.Select>
  );
}

export default DropdownComponent;