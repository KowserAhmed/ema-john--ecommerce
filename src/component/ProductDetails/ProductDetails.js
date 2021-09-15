import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey}= useParams()
    const productDetail=fakeData.find(pd=> pd.key===productKey);

    return (
        <div>
            <h1>Product details</h1>
           <Product showButton={false} product={productDetail}></Product>
        </div>
    );
};

export default ProductDetails;