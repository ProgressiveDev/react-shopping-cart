import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDrag, DragSourceMonitor } from "react-dnd";
import ItemTypes from "./cart-dnd/ItemTypes";

interface ProductProps {
    title: string;
    price: number;
    imageSource: string;
    addItemToCart: () => void;
    info: any;
}

const StoreProduct: React.FC<ProductProps> = ({ title, price, imageSource, addItemToCart, info }) => {
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

    return (
        <div ref={drag} className="col-5 product">
            <Image src={imageSource} fluid />
            <h2>{title}</h2>
            <p>€ {price}</p>
            <Button variant="primary" onClick={addItemToCart} size="sm" >Add to cart</Button>
            {info}
        </div>
    );
}

export default StoreProduct;