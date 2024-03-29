// src/app.js

const express = require('express');
const cacaoTrybe = require('./cacaoTrybe');

const app = express();

app.use(express.json());

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacaoTrybe.getAllChocolates();
  res.status(200).json({ chocolates });
});

app.get('/chocolates/total', async (req, res) => {
  const chocolatesQuantity = await cacaoTrybe.getTotalChocolatesQuantity();
  res.status(200).json({ chocolatesQuantity });
});

app.get('/chocolates/search', async (req, res) => {
  const { name } = req.query;
  const filteredChocolates = await cacaoTrybe.filterChocolates(name);
  res.status(filteredChocolates.length === 0 ? 404 : 200).json(filteredChocolates);
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  // Usamos o Number para converter o id em um inteiro
  const chocolate = await cacaoTrybe.getChocolateById(Number(id));
  res.status(200).json({ chocolate });
});

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacaoTrybe.getChocolatesByBrand(Number(brandId));
  res.status(200).json({ chocolates });
});

app.put('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const valor = req.body;
  const newChocolate = await cacaoTrybe.updateChocolate(id, valor);
  console.log(newChocolate)
  res.status(newChocolate.message ? 404 : 200).json(newChocolate)
})

app.post('/chocolates', async (req, res) => {
  const valor = req.body;
  const chocolate = await cacaoTrybe.createChocolate(valor);
  res.status(201).json({ chocolate })
})

module.exports = app;