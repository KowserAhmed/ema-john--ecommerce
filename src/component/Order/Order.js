import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankedImg from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Order = () => {
    const [orderInfo, setOrderInfo] = useState([])

    const [placeOrder, setPlaceOrder]= useState(false)
    const history=useHistory()

    useEffect(() => {
        const savedData = getDatabaseCart()
        const productKeys = Object.keys(savedData)
        const orderedProduct = productKeys.map(key => {
            const productDetails = fakeData.find(pd => pd.key === key)
            productDetails.quantity = savedData[key]
            return productDetails
        })
        setOrderInfo(orderedProduct)
    }, [])
    const removeItem = (productKey) => {
        const afterRemove = orderInfo.filter(pd => pd.key !== productKey)
        setOrderInfo(afterRemove);
        removeFromDatabaseCart(productKey)
    }

    const handleProccedCheckout=()=>{
        history.push('/shipment')
        
    }
  
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    orderInfo.map(pd =>
                        <ReviewItem
                            key={pd.key}
                            orderInfo={pd}
                            removeItem={removeItem}></ReviewItem>
                    )
                }
                {
                    placeOrder && <img src={thankedImg} alt="" />
                }
            </div>
            <div className="cart">
                <Cart cart={orderInfo}>
                 <button  className="cart-button" onClick={handleProccedCheckout}>Processed Checkout</button> 
                </Cart>
            </div>
        </div>
    );


}
export default Order;