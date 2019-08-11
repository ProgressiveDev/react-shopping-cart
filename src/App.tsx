import React, { useState } from 'react';
import StoreProduct from './Components/Product';
import { MDBAnimation } from "mdbreact";
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import TotalPrice from './Components/TotalPrice';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CartDnd from './Components/cart-dnd/ShoppingCart';
import NextButton from './Components/checkout/NextButton';

interface ShopItem {
  id: number;
  title: string;
  price: number;
  imageSource: string;
  quantity: number;
}

const productDatabase: ShopItem[] = [
  {
    id: 1,
    title: "Nokia 3310",
    price: 7.89,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 2,
    title: "Nokia 3320",
    price: 7.89,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 3,
    title: "Nokia 3330",
    price: 7.89,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 4,
    title: "Nokia 3340",
    price: 7.89,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  }
];

const App: React.FC = () => {

  const [selectedItems, setSelectedItems] = useState<ShopItem[]>([]);

  const checkIfItemIsInCart = (x: ShopItem) => {
    const result = selectedItems.find(item => item.id === x.id);
    x.quantity++
    if (result) {
      setSelectedItems([...selectedItems])
    } else {
      setSelectedItems([...selectedItems, x])
    }
  }

  const getTotalPrice = () => {
    return Number(selectedItems.reduce((a, b) => (a + b.price * b.quantity), 0).toFixed(2))
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container className="shop">
          <Row>
            <Col xs={6} className="product-grid">
              {productDatabase.map((item) =>
                <StoreProduct
                  title={item.title}
                  price={item.price}
                  imageSource={item.imageSource}
                  addItemToCart={
                    () => checkIfItemIsInCart(item)
                  }
                />
              )}
            </Col>
            <Col xs={6} className="cart">
              <h1>Your cart</h1>
              <hr />
              <CartDnd
                displayProduct={
                  selectedItems.map((item, i) =>
                    <MDBAnimation type="fadeIn" duration="500ms">
                      <CartProduct
                        title={item.title}
                        price={item.price}
                        imageSource={item.imageSource}
                        quantity={item.quantity}
                        onRemove={() => {
                          selectedItems.splice(i, 1)
                          setSelectedItems([...selectedItems])
                          item.quantity = 0;
                        }}
                      />
                    </MDBAnimation>
                  )
                }
              />
              <TotalPrice
                total={getTotalPrice()}
              />
              <NextButton />
            </Col>
          </Row>
        </Container>
      </DndProvider>
    </div>
  );
}

export default App;