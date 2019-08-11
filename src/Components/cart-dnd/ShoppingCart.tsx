import React from 'react';
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import CartProduct from '../CartProduct';
import { MDBAnimation } from "mdbreact";
import TotalPrice from '../TotalPrice';
import { ShopItem } from '../../ShopItemTypes';

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



const ShoppingCart: React.FC<{ items: ShopItem[], removeItem: (item: ShopItem) => void }> = ({ items, removeItem }) => {
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

    const getTotalPrice = () => {
        return Number(items.reduce((a, b) => (a + b.price * b.quantity), 0).toFixed(2))
    }

    return (
        <>
            <h1>Your cart</h1>
            <hr />
            <div className={isActive ? "dnd-drop" : "dnd"} ref={drop} style={{ ...style, opacity }}>
                {items.map((item, i) =>
                    <MDBAnimation type="fadeIn" duration="500ms">
                        <CartProduct
                            title={item.title}
                            price={item.price}
                            imageSource={item.imageSource}
                            quantity={item.quantity}
                            onRemove={() => {
                                removeItem(item);
                            }}
                        />
                    </MDBAnimation>
                )}
            </div>
            <TotalPrice
                total={getTotalPrice()}
            />
        </>
    );
};

export default ShoppingCart;
