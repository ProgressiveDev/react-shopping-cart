import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ShoppingCart from './Components/cart-dnd/ShoppingCart';
import NextButton from './Components/checkout/NextButton';
import { ShopItem } from './ShopItemTypes';
import Product from "./Components/Product";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CheckoutForm from './Components/checkout/CheckoutForm';
import BackButton from './Components/checkout/BackButton';


const productDatabase: ShopItem[] = [
  {
    id: 1,
    title: "Nokia 3310",
    price: 5.89,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 2,
    title: "Nokia 3320",
    price: 3.42,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 3,
    title: "Nokia 3330",
    price: 9.05,
    imageSource: "https://cnet2.cbsistatic.com/img/jLcmjnneV9OVWS98fSRu55OmmKY=/868x488/2017/02/26/816796f6-f9b2-4f3c-aaf4-e53ca98196ee/nokia-3310-mwc-12.jpg",
    quantity: 0
  },
  {
    id: 4,
    title: "Nokia 3340",
    price: 6.55,
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

  const DisplayProducts = () => {
    return <Col xs={6} className="product-grid">
      {
        productDatabase.map((item) =>
          <Product
            title={item.title}
            price={item.price}
            imageSource={item.imageSource}
            addItemToCart={
              () => checkIfItemIsInCart(item)
            }
            info={<p>Info</p>}
          />
        )
      }
    </Col>
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Container className="shop">
            <Row>

              <Route exact path="/" component={DisplayProducts} />
              <Route path="/checkout" component={CheckoutForm} />

              <Col xs={6} className="cart">
                <ShoppingCart items={selectedItems} removeItem={(item) => {
                  setSelectedItems(selectedItems.filter(i => item.id !== i.id));
                }} />
                <Link to="/" >Shop</Link>
                <Link to="/checkout">Go to checkout</Link>
              </Col>
            </Row>
          </Container>
        </Router>
      </DndProvider>
    </div >
  );
}

export default App;