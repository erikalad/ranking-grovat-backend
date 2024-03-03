const express = require('express');
const { Ranking } = require('./../../db'); 

const router = express.Router();

router.delete('/:id_demo', async (req, res) => {
  try {
      const { id_demo } = req.params;
      
      // Buscar y eliminar el ranking por id
      const eliminado = await Ranking.destroy({
          where: { id_demo }
      });

      if (eliminado) {
          res.status(200).json({ mensaje: 'Ranking eliminado con éxito' });
      } else {
          // Si no se encontró el ranking, se devuelve un error 404
          res.status(404).json({ mensaje: 'Ranking no encontrado' });
      }
  } catch (error) {
      console.error('Error al eliminar el ranking:', error);
      res.status(500).json({ mensaje: 'Error al eliminar el ranking', error: error.message });
  }
});

module.exports = router;
