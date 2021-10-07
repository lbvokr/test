import { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { Button, Modal, Form } from 'react-bootstrap';
import styled from "styled-components";
import axios from 'axios'

const AddStyle = styled.div`
    margin-bottom: 50px;
    text-align: center;
`;

const Type = {
    properties: 'property',
    agents: 'agent'
};

const Input = {
    properties: [ 'name', 'address', 'price', 'description', 'dateListed' ],
    agents: [ 'name', 'email', 'mobile' ]
}

function Search({ component }) {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});

    const handleChange = (e) => {
        setItem({...item, [e.target.id]: e.target.value})
    }
    const handleSubmit = (e) => {
        axios.post(`/data/${Type[component]}/insert`, item)
        .then(
            window.location.reload()
        );
        setShow(false);
        e.preventDefault();
        e.stopPropagation();
    };

    return(
        <Fragment>
            <AddStyle>
                <Button className="m-auto" variant="outline-secondary" onClick={() => setShow(true)}>
                    <IoIosAdd />
                </Button>

                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title> Add {Type[component]}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            {Input[component].map((item, index) => (
                                <Form.Group className="mb-3" key={index}>
                                    <Form.Control type="text" id={item} placeholder={item} onChange={handleChange} />
                                </Form.Group>
                            ))}
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </AddStyle>
        </Fragment>
    );
}

export default withRouter(Search);