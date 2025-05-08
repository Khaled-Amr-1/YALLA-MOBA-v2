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

export const followUser = async (followerId: number, followingId: number) => {
  if (followerId === followingId) throw new Error("Cannot follow yourself");

  await pool.query(
    `INSERT INTO follows (follower_id, following_id) 
     VALUES ($1, $2) 
     ON CONFLICT DO NOTHING`,
    [followerId, followingId]
  );
};

export const unfollowUser = async (followerId: number, followingId: number) => {
  await pool.query(
    `DELETE FROM follows 
     WHERE follower_id = $1 AND following_id = $2`,
    [followerId, followingId]
  );
};

export const getFollowers = async (userId: number) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.avatar 
     FROM follows f
     JOIN users u ON f.follower_id = u.id
     WHERE f.following_id = $1`,
    [userId]
  );
  return result.rows;
};

export const getFollowing = async (userId: number) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.avatar 
     FROM follows f
     JOIN users u ON f.following_id = u.id
     WHERE f.follower_id = $1`,
    [userId]
  );
  return result.rows;
};