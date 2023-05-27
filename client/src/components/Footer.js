
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="left">
                <div className="logo">
                    Logo
                </div>
                <div className="description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                </div>
                <div className="social">
                    <a href="https://www.facebook.com/" target="_blank" >
                        <FacebookIcon className='social-icon' style={{ "background-color": "#3B5999" }}/>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" >
                        <TwitterIcon className='social-icon' style={{ "background-color": "#00acee" }}/>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <InstagramIcon className='social-icon' style={{ "background-color": "#E4405F" }}/>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" >
                        <LinkedInIcon className='social-icon' style={{ "background-color": "#0072b1" }}/>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" >
                        <YouTubeIcon className='social-icon' style={{ "background-color": "#c4302b" }}/>
                    </a>
                </div>
            </div>
            <div className="center">
                <div className="title">
                    Useful Links
                </div>
                <ul className="links">
                    <Link to={"/"} className="linkcom" style={{color: "white"}}><li className="link">Home</li></Link>
                    <li className="link">About</li>
                    <li className="link">Contact</li>
                    <Link to={"/products"} className="linkcom" style={{color: "white"}}><li className="link">Products</li></Link>
                    <Link to={"/cart"} className="linkcom" style={{color: "white"}}><li className="link">Cart</li></Link>
                </ul>
            </div>
            <div className="right">
                <div className="contacts">
                    <div className="title">
                        Contacts
                    </div>
                    <div className="info">
                        <div className="icon">
                            <RoomOutlinedIcon/>
                        </div>
                        <div className="text">
                            123, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                        </div>
                    </div>
                    <div className="info">
                        <div className="icon">
                            <LocalPhoneOutlinedIcon/>
                        </div>
                        <div className="text">
                            +123 456 789
                        </div>
                    </div>
                    <div className="info">
                        <div className="icon">
                            <EmailOutlinedIcon/>
                        </div>
                        <div className="text">
                            12345@12345.com
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="title">
                        Payment Methods
                    </div>
                    <div className="methods">
                        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment" />
                    </div>
                </div>
                <div className="reserve">
                    © 2023 All rights reserved.
                </div>         
            </div>
        </footer>

    )

}

export default Footer;