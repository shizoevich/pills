const db = require('./db');


class UserController {
    async createUser(req, res) {
      const { name, password, medicine_times, medicines } = req.body;
      try {
        const newUser = await db.query(
          'INSERT INTO users (name, password, medicine_times, medicines) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, password, medicine_times, medicines]
        );
        res.json(newUser.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  
    async updateUser(req, res) {
      const { id } = req.params;
      const {medicine_times, medicines } = req.body;
      try {
        const updatedUser = await db.query(
          'UPDATE users SET medicine_times = $1, medicines = $2 WHERE id = $3 RETURNING *',
          [medicine_times, medicines, id]
        );
        if (updatedUser.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
    }
  
    async deleteUser(req, res) {
      const { id } = req.params;
      try {
        const deletedUser = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (deletedUser.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
      }
    }
  

      async registerUser(req, res) {
    const { name, password } = req.body;
    try {
      const existingUser = await db.query('SELECT * FROM users WHERE name = $1', [name]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const newUser = await db.query(
        'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
        [name, password]
      );

      res.json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      if (user.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }
  async loginUser(req, res) {
    const { name, password } = req.body;
    try {
      const user = await db.query('SELECT * FROM users WHERE name = $1 AND password = $2', [name, password]);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  }
  
  }
  
  module.exports = new UserController();
