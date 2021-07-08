const express = require("express");
const cart = express.Router();

const cartItems = [
    {id: 1, product: "Shirt", price: 20.99, quantity: 12},
    {id: 2, product: "Shorts", price: 24.79, quantity: 9},
    {id: 3, product: "Socks", price: 3.50, quantity: 35},
    {id: 4, product: "Shoes", price: 37.00, quantity: 15},
    {id: 5, product: "Hat", price: 15.99, quantity: 7},
    {id: 6, product: "Fancy Hat", price: 18.99, quantity: 14},
    {id: 7, product: "Fanny Pack", price: 12.00, quantity: 2},
    {id: 8, product: "Backpack", price: 35.00, quantity: 27},
]  



module.exports = cart;