import React from 'react';
import FoodImage from '../../../Images/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={FoodImage} alt='Food place' />
            </div>
        </>
    )
}

export default Header