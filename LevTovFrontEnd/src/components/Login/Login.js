
import PhoneNumberToLogin from './PhoneNumberToLogin';

import Logo from '../Logo/Logo';
 import '../All.css';
import './Login.css';

const Login = () => {
    return (
        <div id="Login-body">
            <Logo></Logo>
            <h1 id='hello'>ברוכים הבאים,<br />
                נא הזן מס' טלפון</h1>
            <div id="phone-number-to-login"> <PhoneNumberToLogin /></div>

        </div>
    );
}

export default Login;