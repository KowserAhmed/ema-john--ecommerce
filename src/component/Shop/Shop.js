import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const product = fakeData.slice(0, 10);
    const [cart, setCart] = useState([])

    // load data from local storage to add existing order from local storage
    useEffect(() => {
        const savedKeys = getDatabaseCart()
        const previousKeys = Object.keys(savedKeys);
        const getPreviousOrder = previousKeys.map(prvKey => {
            const existingData = fakeData.find(fkData => fkData.key === prvKey)
            existingData.quantity = savedKeys[prvKey]
            return existingData
        })
        setCart(getPreviousOrder)
    },[])


    const handleAddProduct = (productInfo) => {
        let sameProduct = cart.find(pd => pd.key === productInfo.key)
        let count = 1

        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const other = cart.filter(pd => pd.key !== sameProduct.key)
            setCart([...other, sameProduct])
        }
        else {
            productInfo.quantity = 1;
            setCart([...cart, productInfo])
        }
        addToDatabaseCart(productInfo.key, count);
    }
    return (


        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(pd => <Product
                        key={pd.key}
                        product={pd}
                        showButton={true}
                        handleAddProduct={handleAddProduct}
                    >
                    </Product>)
                }

            </div>
            <div className="cart">
                <Cart cart={cart}>
                <Link to='/order'> <button  className="cart-button">Preview Order</button> 
                 </Link>   
                </Cart>

            </div>


        </div>
    );
};

export default Shop;