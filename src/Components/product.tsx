import React from 'react';
import { Button, Col, Image } from 'react-bootstrap';

interface ProductProps {
    title: string;
    price: number;
    imageSource: string;
    addItemToCart: () => void;
}


const StoreProduct: React.FC<ProductProps> = ({ title, price, imageSource, addItemToCart }) => {
    return (
        <Col xs={5} className="product">
            <Image src={imageSource} fluid />
            <h2>{title}</h2>
            <p>€ {price}</p>
            <Button variant="primary" onClick={addItemToCart} >Add to cart</Button>
        </Col>
    )
}

export default StoreProduct;