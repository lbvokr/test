import { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

const ContainerStyle = styled.div`
    padding-top: 15%;
    text-align: center;
`;

const BarStyle = styled.input`
    padding: 1em;
    width: 70%;
    font-weight: 500;
    font-size: 2em;
    border-radius: 10px;
    border-color: white;
`;

const VideoStyle = styled.video`
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
`;

function Home() {
    const [placeholder, setPlaceholder] = useState("🔎 Find your dream home...");
    const [query, setQuery] = useState("");

    const hidePlaceholder = () => setPlaceholder(placeholder.substr(3)); // 3byte = emoji(2byte) + blank(1byte)
    const showPlaceholder = () => setPlaceholder("🔎 " + placeholder);

    const onChange = (e) => setQuery(e.target.value);

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            window.location.replace('/properties?query=' + query);
        }
    }

    return (
        <Fragment>
            <ContainerStyle className="search_container">
                <BarStyle placeholder={placeholder} value={query}
                onFocus={hidePlaceholder} onBlur={showPlaceholder} onChange={onChange} onKeyPress={onKeyPress} />
            </ContainerStyle>

            <VideoStyle src={process.env.PUBLIC_URL+ "/videos/bg_video.mp4"} type="video/mp4" autoPlay muted loop id="myVideo" />
        </Fragment>
    );
}

export default withRouter(Home);
