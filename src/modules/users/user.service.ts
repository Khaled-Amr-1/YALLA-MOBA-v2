import pool from "../../config/db";
import bcrypt from "bcrypt";

export const findUserByEmailOrUsername = async (identifier: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $1",
    [identifier]
  );
  return result.rows[0];
};

export const isEmailExists = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows.length > 0;
};

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  avatar: string;
}

export const createUser = async ({
  username,
  email,
  password,
  gender,
  role,
  avatar,
}: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (username, email, password, gender, role, avatar)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, gender, role, avatar, uid, mobacoin, popularity`,
    [username, email, hashedPassword, gender, role, avatar]
  );
  return result.rows[0];
};
