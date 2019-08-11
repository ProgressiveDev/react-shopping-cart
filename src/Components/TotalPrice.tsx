import React from 'react';
import { Col } from 'react-bootstrap';

interface TotalPriceProps {
    total: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ total }) => {
    return (
        <Col className="total-price">
            <hr />
            <p>Total price: €{total}</p>
        </Col>
    )
}

export default TotalPrice;