const express = require('express');
const { Ranking } = require('./../../db'); 

const router = express.Router();

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
  try {
      const rankings = await Ranking.findAll();
      res.status(200).json(rankings);
  } catch (error) {
      console.error('Error al obtener rankings:', error);
      res.status(500).json({ mensaje: 'Error al obtener rankings', error: error.message });
  }
});

  module.exports = router;