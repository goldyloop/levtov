import LogoLev from '../LogoLev.png';
import './Logo.css'
const Logo = () => {
    return (
        <div id="div-img">
            <img id='logoLev' src={LogoLev} alt="Description of the image" />
        </div>
    );
}

export default Logo;