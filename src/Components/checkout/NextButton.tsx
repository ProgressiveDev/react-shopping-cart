import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function NextButton() {
    return (
        <Button variant="success" size="sm">Got to checkout</Button>
    )
}
