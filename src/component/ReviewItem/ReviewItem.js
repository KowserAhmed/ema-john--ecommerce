import React from 'react';

const ReviewItem = (props) => {
    const {name, price, quantity,key}=props.orderInfo

    return (
        <div className="product">
            <div>
            <h4 className="product-name">{name}</h4>
            <h5>Price:${price}</h5>
            <h4>Quantity:{quantity}</h4>
            <button className="cart-button" onClick={()=>props.removeItem(key)}>Remove</button>
        </div>
        </div>
    );
};

export default ReviewItem;