import { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Alert, Form, Button } from 'react-bootstrap';

import { siginIn } from "../../_actions/userAction";

function Signin(props) {
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const handleUsername = (e) => setAccount({...account, username: e.target.value});
    const handlePassword = (e) => setAccount({...account, password: e.target.value});
    const handleSubmit = (e) => {
        if (e.currentTarget.checkValidity()) {
            dispatch(siginIn(account))
            .then((response) => {
                if (response.payload.data.signInSuccess) {
                    alert('Login');
                    props.history.push('/');
                } else {
                    setShow(true);
                    setAccount({username: '', password: ''});
                }
            });
        }

        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
    };

    return(
        <Fragment>
            <Alert variant="danger" show={show} onClose={() => setShow(false)}>
                Incorrect username or password.
            </Alert>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" value={account.username} onChange={handleUsername} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" value={account.password} onChange={handlePassword} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="w-100" type="submit">Sign In</Button>
            </Form>
        </Fragment>
    );
}

export default withRouter(Signin);
