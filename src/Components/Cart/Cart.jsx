import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";

import classes from './Cart.module.css';
import CartContext from "../../store/cart-context";
import CartItem from './CartItem'
import Checkout from "./Checkout";


const Cart = (props) => {

    const cartCtx = useContext(CartContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (usersData) => {
        setIsSubmitting(true)
        fetch('https://react-http-d5ecc-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: usersData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }


    const cartItems = cartCtx.items.map((item)=>(
        <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
    ))

    const modalAction = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = (
        <>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalAction}
        </>
    )

    const isSubmittingModalContext = <p>Sending order data...</p>;
    const didSubmittingModalContext = (
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </>
    )
    
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContext}
            {!isSubmitting && didSubmit && didSubmittingModalContext}
        </Modal>
    )
}

export default Cart