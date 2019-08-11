import React from 'react';
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import CartProduct from '../CartProduct';
import { MDBAnimation } from "mdbreact";

const style: React.CSSProperties = {
    height: "70%",
    width: "100%",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "#808080",
    padding: "1rem",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left"
};

interface ShoppingCartProps {
    title: string;
    price: number;
    imageSource: string;
    quantity: number;
    onRemove(): void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ title, price, imageSource, quantity, onRemove }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const isActive = canDrop && isOver;
    let opacity = 1;
    if (isActive) {
        opacity = 1;
    } else if (canDrop) {
        opacity = 0.5;
    }

    return (
        <div className={isActive ? "dnd-drop" : "dnd"} ref={drop} style={{ ...style, opacity }}>
            <MDBAnimation type="fadeIn" duration="500ms">
                <CartProduct
                    title={title}
                    price={price}
                    imageSource={imageSource}
                    quantity={quantity}
                    onRemove={onRemove}
                // onRemove={() => {
                //     selectedItems.splice(i, 1)
                //     setSelectedItems([...selectedItems])
                //     item.quantity = 0;
                // }}
                />
            </MDBAnimation>
        </div>
    );
};

export default ShoppingCart;
