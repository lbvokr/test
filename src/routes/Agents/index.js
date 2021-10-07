import { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import queryString from "query-string";
import axios from 'axios'

import { Search, Add } from '../../components';

function Agents({ location }) {
    const [ agents, setAgents ] = useState([]);
    const URL = "/data/agent";
    const isAdmin = useSelector(state => state.user.userData.data.isAdmin);

    const handleDelete = (id) => {
        axios.delete(`${URL}/${id}`)
        .then(
            window.location.reload()
        );
    }

    // get all agents
    useEffect(() => {
        const query = queryString.parse(location.search).query;
        var url = URL;

        if (query !== undefined) url += "/" + query;

        axios
        .get(url)
        .then(response => {
            setAgents(response.data);
        })
        .catch(e => console.error(e))
    }, []);

    return(
        <Fragment>
            <Search component="agents" />

            {
                {
                    true: <Add component="agents" />
                }[isAdmin]
            }

            <Row md={3} className="mx-5">
                {agents.map((agent, index) => {
                    return(
                        <Col key={index} className="mb-5">
                            <Card className="p-3">
                                <Card.Img variant="top" className="mb-3" src={process.env.PUBLIC_URL + agent.url} />
                                <Card.Title><h3 style={{fontWeight:"bold"}}>{agent.name}</h3></Card.Title>
                                <Card.Text>{agent.email}</Card.Text>
                                <Card.Text>{agent.mobile}</Card.Text>
                                {
                                    {
                                        true: 
                                        <Fragment>
                                            <ButtonGroup>
                                                <Button className="mb-1" size="sm" variant="outline-primary">Edit</Button>
                                                <Button className="mb-1" size="sm" variant="outline-primary" onClick={() => handleDelete(agent._id)}>Delete</Button>
                                            </ButtonGroup>                                            
                                        </Fragment>
                                    }[isAdmin]
                                }
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Fragment>
    );
}

export default withRouter(Agents);
