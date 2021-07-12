const express = require("express");
const cart = express.Router();
const pool = require("./pg-connection-pool");

async function getTable(req, res) {
    try {
    const results = await pool.query(
        `select * from shopping_cart`, 
    )
      res.json(results.rows);
    } catch (error) {
        console.log(error);
        res.json('ERROR');
      }
    }

  cart.get("/", async (req, res) => {
    let price = parseFloat(req.query.maxPrice);
    let product = req.query.prefix;
    let pageSize = req.query.pageSize;
    if(price){
        let results = await pool.query('SELECT * FROM shopping_cart WHERE price <= $1', [price]);
        res.json(results.rows);
    }
    if(product){
        let results = await pool.query('SELECT * FROM shopping_cart WHERE product ILIKE $1', [product + '%']);
        res.json(results.rows);
    }
    if(pageSize){
        let results = await pool.query('SELECT * FROM shopping_cart LIMIT $1', [pageSize]);
        res.json(results.rows);
    } else {
        getTable(req, res); 
    }
});

cart.get("/:id", async (req, res) => {
    let id = parseFloat(req.params.id);
    let results = await pool.query('SELECT * FROM shopping_cart WHERE id=$1',[id])
    if (results.rows.length === 0){
        res.send(404);
    }  else {
        res.json(results.rows);        
    }  
});

cart.post("/", async (req, res) => {
    let results = await pool.query('INSERT INTO shopping_cart (product, price, quantity) values ($1, $2, $3) RETURNING *', [req.body.product, req.body.price, req.body.quantity]);
    res.status(201).json(results.rows);
});

cart.put("/:id", async (req, res) => {
    let id = parseFloat(req.params.id);
    let results = await pool.query('UPDATE shopping_cart SET (product, price, quantity) = ($2, $3, $4) WHERE id =$1 RETURNING *',[id, req.body.product, req.body.price, req.body.quantity]);
    res.status(200).json(results.rows);
});

cart.delete("/:id", async (req, res) => {
    let results = await pool.query('DELETE FROM shopping_cart WHERE id=$1',[req.params.id]);
    res.status(204).json("Deleting a cart item..");
  });

//extended challenge - works when I use the SQL to query in pgAdmin, but 
//it doesn't work here
  cart.get("/:total", async (req, res) => {
    let total = req.query.total;
    let results = await pool.query('SELECT SUM (price) FROM shopping_cart',[total]);
    res.status(200).json(results.rows);
});

module.exports = cart;