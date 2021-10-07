import { withRouter, Link } from 'react-router-dom';
import styled from "styled-components";
import Signin from './signin';
import Register from './register';

const BackStyle = styled.div`
    height: 100vh;
    background: linear-gradient(180deg, #212529, #343a40);
    overflow: hidden;
`;

const SignStyle = styled.div`
    margin: 50px auto 0 auto;
    max-width: 500px;
    color: white;
`;

const BoxStyle = styled.div`
    background: white;
    border-radius: .5rem!important;
    color: black;
`;

const FormStyle = styled.div`
    padding: 50px;
`;

function Sign({ location }) {
    const path = location.pathname.substring(1);

    return(
        <BackStyle>
            <SignStyle>
                <BoxStyle>
                    <FormStyle>
                    {
                        { 
                            signin : <Signin />,
                            register : <Register />
                        }[path]
                    }
                    </FormStyle>
                </BoxStyle>
                { path === "signin" && <p>Don't have an account yet? <Link to="/register">Register now</Link></p> }
                
            </SignStyle>
        </BackStyle>
    );
}

export default withRouter(Sign);
