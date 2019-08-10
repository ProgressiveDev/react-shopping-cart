import React from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import { useDrag, DragSourceMonitor } from "react-dnd";
import ItemTypes from "./cart-dnd/ItemTypes";

interface ProductProps {
    title: string;
    price: number;
    imageSource: string;
    addItemToCart: () => void;
}

const StoreProduct: React.FC<ProductProps> = ({ title, price, imageSource, addItemToCart }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { title, price, imageSource, type: ItemTypes.BOX },
        end: (item: { title: string } | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addItemToCart();
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className="col-5 product">
            <Image src={imageSource} fluid />
            <h2>{title}</h2>
            <p>€ {price}</p>
            <Button variant="primary" onClick={addItemToCart} >Add to cart</Button>
        </div>
    );
}

export default StoreProduct;