import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import men from '../img/Men.jpg';
import women from '../img/Women.jpg';
import newarr from '../img/NewArraval.jpg';
import Sale from '../img/Sale.jpg'
import { useState } from 'react';
import { Link } from "react-router-dom";

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === 'left'){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 3)
        }
        else{
            setSlideIndex(slideIndex < 3 ? slideIndex+1 : 0)
        }
    }

    return (
        <div className="slider">
            <div className="arrow arrowleft" onClick={()=>handleClick("left")}>
                <ArrowBackIosNewIcon/>
            </div>
            <div className="wrapper"  style={{ "--slide-index": slideIndex }}>
                <Link to={'/products'} className='link'>
                <div className="slide">
                    <div className="image-container">
                        <img src={newarr} alt="newarr" />
                    </div>
                    <div className="info-container">
                        <h1>New Arrivals</h1>
                    </div>
                </div>
                </Link>
                <Link to={'/products/women'} className='link'>
                <div className="slide">
                    <div className="image-container">
                        <img src={women} alt="women" />
                    </div>
                    <div className="info-container">
                        <h1>Women</h1>
                    </div>
                </div>
                </Link>
                <Link to={'/products/men'} className='link'>
                <div className="slide">
                    <div className="image-container">
                        <img src={men} alt="men" />
                    </div>
                    <div className="info-container">
                        <h1>Men</h1>
                    </div>
                </div>
                </Link>
                <Link to={'/products/sale'} className='link'>
                <div className="slide">
                    <div className="image-container">
                        <img src={Sale} alt="Sale" />
                    </div>
                    <div className="info-container">
                        <h1>Sale</h1>
                    </div>
                </div>
                </Link>
            </div>
            
            <div className="arrow arrowright" onClick={()=>handleClick("right")}>
                <ArrowForwardIosIcon/>
            </div>
        </div>
    )
}
export default Slider;

