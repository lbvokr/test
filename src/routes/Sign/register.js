import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Row, Col, Form, Button } from 'react-bootstrap';

import { register } from "../../_actions/userAction";

const errorMsg = {
    'empty' : 'Username is a required field',
    'exist': 'The username is already use. Please enter a different username.',
};

function Register(props) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        isAdmin: 'false'
    });

    const [validated, setValidated] = useState(false);
    const [validUser, setValidUser] = useState(false);
    const [userErrorMsg, setUserErrorMsg] = useState(errorMsg.empty);

    const dispatch = useDispatch();

    const handleFirstname = (e) => setUser({...user, firstname: e.target.value});
    const handleLastname = (e) => setUser({...user, lastname: e.target.value});
    const handleUsername = (e) => {
        setValidUser(false);
        setUserErrorMsg(errorMsg.empty);
        setUser({...user, username: e.target.value})
    };
    const handleEmail = (e) => setUser({...user, email: e.target.value});
    const handlePassword = (e) => setUser({...user, password: e.target.value});
    const handleSubmit = (e) => {
        if (e.currentTarget.checkValidity()) {
            dispatch(register(user))
            .then((response) => {
                if (response.payload.data.registerSuccess) {
                    setValidUser(false);
                    alert('Your account has been successfully registered.');
                    props.history.push('/signin');
                } else {
                    setValidUser(true);
                    setUserErrorMsg(errorMsg.exist);
                    setUser({...user, username: ''});
                }
            });
        }

        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
    };

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formFirstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control required type="text" onChange={handleFirstname} />
                    <Form.Control.Feedback type="invalid">
                        Firstname is a required field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control required type="text" onChange={handleLastname} />
                    <Form.Control.Feedback type="invalid">
                        Lastname is a required field
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" value={user.username} onChange={handleUsername} className={`${validUser?'is-invalid':''}`} />
                <Form.Control.Feedback type="invalid">
                    {userErrorMsg}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" onChange={handleEmail} />
                <Form.Control.Feedback type="invalid">
                    Email is a required field
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" onChange={handlePassword} />
                <Form.Control.Feedback type="invalid">
                    Password is a required field
                </Form.Control.Feedback>
            </Form.Group>
            
            <Button className="w-100" type="submit">Register</Button>
        </Form>
    );
}

export default withRouter(Register);
