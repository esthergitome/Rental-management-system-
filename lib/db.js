import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'rental_user', 
    password: process.env.DB_PASSWORD || 'RentalPass123!', // Reads from .env.local
    database: 'rental_db',
  });
}
