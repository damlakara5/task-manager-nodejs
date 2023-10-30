import DropdownComponent from "./Dropdown"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormInput from "./FormInput";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const CreateTicket = () => {
    const nameRef = useRef()
    const descriptionRef = useRef()
    const [category, setCategory] = useState()
    const [status, setStatus] = useState()
    const [selectedValue, setSelectedValue] = useState("");

    async function handleSubmit  (e) {
        e.preventDefault()
        const name = nameRef.current.value
        const description = descriptionRef.current.value
        const res = await fetch("http://127.0.0.1:3000/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                name,
                description,
                category,
                status,
                priority: selectedValue
            })
        })

        if(res.ok){
            alert("Ticket created successfully. Please go to tickets page!")
        }else{
            alert("Something went wrong. Please try again!")

        }
    }

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
      };
  return (
    <div className="container d-flex flex-column align-items-center h-100">
        <h1 className="header">Create Your Ticket</h1>
        <Form className="d-flex flex-column align-items-start">
            <Container >
                <Row className="mb-4" >
                    <FormInput inputRef={nameRef} className="text-start" label="Ticket Name" />
                </Row>
                <Row className="mb-4">
                    <label className="text-start">
                        Description
                    </label>
                    <textarea ref={descriptionRef}  placeholder="Description" />
                </Row>
                <Row className="mb-4">
                    <label className="text-start">Category</label>
                    <DropdownComponent value={category} setValue={setCategory} options={["Hardware Problem", "Software Problem", "Project"]} />
                </Row>
                <Row className="mb-2">
                    <label className="text-start">Priority</label>
                    <div key={`1`} className="mb-3 d-flex ">
                        <Form.Check // prettier-ignore
                            type="radio"
                            id={`1`}
                            label={`1`}
                            className="mx-2"
                            value="1"
                            checked={selectedValue === "1"} 
                            onChange={handleRadioChange}
                        />
                        <Form.Check // prettier-ignore
                            type="radio"
                            id={`2`}
                            label={`2`}
                            value="2"
                            className="mx-2"
                            checked={selectedValue === "2"} 
                            onChange={handleRadioChange}
                        />
                        <Form.Check // prettier-ignore
                            type="radio"
                            id={`3`}
                            value="3"
                            label={`3`}
                            className="mx-2"
                            checked={selectedValue === "3"} 
                            onChange={handleRadioChange}
                        />
                        <Form.Check // prettier-ignore
                            type="radio"
                            id={`4`}
                            value="4"
                            label={`4`}
                            className="mx-3"
                            checked={selectedValue === "4"} 
                            onChange={handleRadioChange}
                        />
                        <Form.Check // prettier-ignore
                            type="radio"
                            id={`5`}
                            value="5"
                            label={`5`}
                            className="mx-2"
                            checked={selectedValue === "5"} 
                            onChange={handleRadioChange}
                        />
                    </div>
                </Row>
                <Row className="">
                    <label className="text-start">Status</label>
                    <DropdownComponent value={status} setValue={setStatus} options={["Not started", "Started", "Finished"]} />
                </Row>
                <button className="btn btn-primary my-5" onClick={handleSubmit}>Create Ticket</button>
                <NavLink className="text-white text-decoration-none ms-5 fs-4" to="/tickets">Tickets</NavLink>
            </Container>
        </Form>
    </div>
  )
}

export default CreateTicket