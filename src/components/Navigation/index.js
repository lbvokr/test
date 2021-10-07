import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { signOut } from "../../_actions/userAction";

const NavData = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Properties',
        path: '/properties'
    },
    {
        title: 'Agents',
        path: '/agents'
    },
    {
        title: 'News',
        path: '/news'
    }
];

function Navigation() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.userData.data.isAuth);

    const handleSignOut = () => {
        dispatch(signOut())
        .then((response) => {
            if (response.payload.data.signOutSuccess) {
                alert('Logout!');
                window.location.reload(true);
            } 
        });
    };

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <img src={process.env.PUBLIC_URL+ "/images/logo.png"} width="30" height="30" className="d-inline-block align-top" alt="" />
                        RealEstate
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {NavData.map((item, index) => (
                            <LinkContainer to={item.path} key={index}>
                                <Nav.Link>{item.title}</Nav.Link>
                            </LinkContainer>
                        ))}
                    </Nav>
                    <Nav className="mr-auto">
                    {
                        { 
                            true : <Button variant="primary" onClick={handleSignOut} >Sign out</Button>,
                            false : <Link to="/signin"><Button variant="primary">Sign in / Register</Button></Link>
                        }[isAuth]
                    }   
                    </Nav>
                </Container>
            </Navbar>            
        </Fragment>
    );
}

export default Navigation;
