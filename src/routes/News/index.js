import { Fragment, useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import queryString from "query-string";
import axios from 'axios'

import { Search } from '../../components';

function News({ location }) {
    const [ news, setNews ] = useState([]);
    const history = useHistory();
    const query = queryString.parse(location.search).query;

    // get all agents
    useEffect(() => {
        var url = "/data/news";

        if (query !== undefined) url += "/" + query;

        axios.get(url)
        .then(response => {
            setNews(response.data);
        })
        .catch(e => console.error(e))
    }, []);

    return(
        <Fragment>
            <Search component="news" />
            <Row md={3} className="mx-5">
                {news.map((content, index) => {
                    return(
                        <Col key={index} className="mb-5">
                            <Card className="p-3" onClick={() => history.push(`news/${content.title}`)}>
                                <Card.Img variant="top" className="mb-3" src={process.env.PUBLIC_URL + content.url} />
                                <Card.Title><h3 style={{fontWeight:"bold"}}>{content.title}</h3></Card.Title>
                                <Card.Text>{content.date}</Card.Text>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Fragment>
    );
}

export default withRouter(News);
