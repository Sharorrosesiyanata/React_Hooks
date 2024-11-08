import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function UserForm() {
    const [institution, setInstitution] = useState(" ");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //setting error initial state
    const [institutionError, setInstitutionError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e) => {
        //prevents default submisions
        //allows fields to be filled out
        e.preventDefault();
        let institutionValid = false;
        let emailValid = false;
        let passwordValid = false;
        //validation rules for email
        if (email.length == 0) {
            setEmailError("Email is required");
        } else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        } else if (email.indexOf(" ") >= 0) {
            setEmailError("Email cannot contain spaces");
        } else {
            setEmailError("");
            emailValid = true;
        }
        if (emailValid) {
            alert("Email: " + email + "\nPassword: " + password + "\nInstitution: " + institution);
        }
        //validation rules for password
        if (password.length < 8) {
            setPasswordError("Password must be at least be 8 characters long");
        } else {
            setPasswordError("");
            passwordValid = true;
        }
        if (institution.length == 0) {
            setInstitutionError("Institution description is required");
        } else if (institution.length < 5) {
            setInstitutionError("Institution description should be minimum 5 characters");
        } else {
            setInstitutionError("");
            institutionValid = true;
        }

        //submits once data is valid
        if (emailValid && passwordValid && institutionValid) {
            alert("Email: " + email + "\nPassword: " + password + "\nInstitution: " + institution);
            setEmail("");
            setPassword("");
            setInstitution("");
            //   setEmailError('');
            //   setPasswordError('');
        }
        
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicInstitution">
                    <Form.Label>Institution</Form.Label>
                    <Form.Control
                        type="institution"
                        placeholder="Enter Institution"
                        onChange={(e) => setInstitution(e.target.value)}
                        value={institution}
                    />
                    <Form.Text className="text-muted">
                        We need to know which Institution you under!
                    </Form.Text>
                    {institutionError.length > 0 && (
                        <Alert variant="danger">{institutionError}</Alert>
                    )}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {emailError.length > 0 && (
                        <Alert variant="danger">{emailError}</Alert>
                    )}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {passwordError.length > 0 && (
                        <Alert variant="danger">{passwordError}</Alert>
                    )}
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default UserForm;