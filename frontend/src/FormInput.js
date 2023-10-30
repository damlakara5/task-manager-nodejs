import Form from 'react-bootstrap/Form';

function FormInput({label, className, inputRef}) {
  return (
    <>
      <Form.Label className={className} htmlFor={label}> {label} </Form.Label>
      <Form.Control
        type="text"
        id={label}
        ref={inputRef}
      />
    </>
  );
}

export default FormInput;