const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Se prioriza la variable de entorno de Render; si no existe, usa la URL interna provista
const connectionString = process.env.DATABASE_URL || 'postgresql://db_usuarios_9cpt_user:TVjTvbMJoakuP4xwsYH8P7npkjWnK3by@dpg-da7ep91srm7s738af5tg-a/db_usuarios_9cpt';

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Inicializar la tabla "usuarios" automáticamente si no existe
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log('Tabla "usuarios" lista.');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err.message);
  }
};
initDb();

// --- ENDPOINTS CRUD ---

// 1. OBTENER TODOS LOS USUARIOS (READ)
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CREAR UN USUARIO (CREATE)
app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
      [nombre, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. ACTUALIZAR UN USUARIO (UPDATE)
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
      [nombre, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. ELIMINAR UN USUARIO (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});