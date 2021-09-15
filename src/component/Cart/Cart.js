import React from 'react';

const Cart = (props) => {
    const cart=props.cart
   
    let total=0;
    for(let i=0;i<cart.length;i++){
        total +=cart[i].price* cart[i].quantity;
    }
    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items Ordered:{cart.length}</h4>
            <h5>Product Price:{total}</h5> 
            {
                props.children
            }      
        </div>
    );
};

export default Cart;