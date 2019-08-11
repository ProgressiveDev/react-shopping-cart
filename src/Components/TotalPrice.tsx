import React from 'react';
import { Col } from 'react-bootstrap';

interface TotalPriceProps {
    total: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ total }) => {
    return (

        <p>Total price: €{total}</p>

    )
}

export default TotalPrice;