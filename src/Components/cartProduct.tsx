import React from 'react';
import { Button, Col, Media } from 'react-bootstrap';

interface CartProductProps {
    title: string;
    price: number;
    imageSource: string;
    quantity: number;
    onRemove(): void;
}

const CartProduct: React.FC<CartProductProps> = ({ title, price, imageSource, quantity, onRemove }) => {
    return (
        <Col xs={12} className="cartProduct">
            <Media>
                <img
                    width={100}
                    className="mr-3"
                    src={imageSource}
                    alt={title}
                />
                <Media.Body>
                    <h5>
                        {title}
                    </h5>
                    <p>
                        {price}
                    </p>
                    <p>QTY: {quantity}</p>
                </Media.Body>
                <Button variant="light" size="sm" onClick={onRemove}>Remove</Button>
            </Media>
        </Col>
    )
}

export default CartProduct;