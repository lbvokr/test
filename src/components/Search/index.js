import { Fragment, useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from "styled-components";

const SearchStyle = styled.div`
    margin: 50px auto 50px;
    width: 50%;
`;

function Search({ component }) {
    const [query, setQuery] = useState("");

    const onChange = (e) => setQuery(e.target.value);

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            onClick();
        }
    }

    const onClick = () => {
        window.location.replace('/' + component + '?query=' + query);
    }

    return(
        <Fragment>
            <SearchStyle>
                <InputGroup>
                    <FormControl placeholder={`Find ${component}...`} onChange={onChange} onKeyPress={onKeyPress} />
                    <Button variant="secondary" onClick={onClick}>
                        <FaSearch />
                    </Button>
                </InputGroup>
            </SearchStyle>
        </Fragment>
    );
}

export default Search;