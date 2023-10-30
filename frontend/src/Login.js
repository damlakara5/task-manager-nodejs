import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormInput from "./FormInput";
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
function Login() {
    const userNameRef = useRef()
    const passwordRef = useRef()

    async function handleSubmit (e) {
        e.preventDefault()
        const userName = userNameRef.current.value
        const password = passwordRef.current.value
        const res = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                userName,
                password,
            })
        })
        const data = await res.json()
        const token = await data.token
        localStorage.setItem("token", token)
        if(res.ok){
            alert("You are logged in!")

        }else{
            alert("Something went wrong. Please try again!")

        }
    }
  return (
    <div className='container d-flex flex-column align-items-center h-100 justify-content-center'>
        <Form className="d-flex flex-column align-items-start">
            <Container >
                <Row className="mb-4" >
                    <FormInput inputRef={userNameRef} className="text-start" label="User Name" />
                </Row>
                <Row className="mb-4">
                    <FormInput inputRef={passwordRef} className="text-start" label="Password" />
                </Row>
            
                <button className="btn btn-primary my-5" onClick={handleSubmit}>Login</button>
                <NavLink className="text-white text-decoration-none ms-5 fs-4" to="/signUp">Sign Up</NavLink>
            </Container>
        </Form>
    </div>
  )
}

export default Login