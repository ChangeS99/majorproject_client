import { useParams } from 'react-router-dom';
//components
// sign in 
import Signin from '../../components/auth/Signin';
import Signup from '../../components/auth/Signup';
import Activate from '../../components/auth/Activate';

// styles 
import { AuthContainer } from '../../style/container'

const Auth = () => {
    console.log(useParams());
    let { authMode, token } = useParams();

    const AuthForm = () => {
        switch (authMode) {
            case "signin": return <Signin />;
            case "signup": return <Signup />;
            case "activate": return <Activate token={token} />;
            default: return <Signin />
        }
    }

    return (
        <AuthContainer>
            {AuthForm()}
        </AuthContainer>
    )
}

export default Auth;
