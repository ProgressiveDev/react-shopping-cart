import React from 'react';
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

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

const CartDnd: React.FC = () => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ title: "Dustbin" }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const isActive = canDrop && isOver;
    let opacity = 1;
    if (isActive) {
        opacity = 0.7;
    } else if (canDrop) {
        opacity = 0.7;
    }

    return (
        <div ref={drop} style={{ ...style, opacity }}>
            {isActive ? "Release to drop" : "Cart empty, drag and drop items here"}
        </div>
    );
};

export default CartDnd;
