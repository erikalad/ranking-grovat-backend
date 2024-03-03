const express = require('express');
const { conn, Op } = require('./../../db'); 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
      // Crear un nuevo ranking con los datos enviados en el body de la petición
      const { fechaAgenda, fechaDemo, setter } = req.body;
      
      // Validación simple, puedes expandirla según tus necesidades
      if (!fechaAgenda || !fechaDemo || !setter) {
          return res.status(400).json({ mensaje: 'Datos incompletos para crear el ranking' });
      }

      const nuevoRanking = await conn.models.Ranking.create({
          fechaAgenda,
          fechaDemo,
          setter
      });

      res.status(201).json(nuevoRanking);
  } catch (error) {
      console.error('Error al crear el ranking:', error);
      res.status(500).json({ mensaje: 'Error al crear el ranking', error: error.message });
  }
});

module.exports = router;