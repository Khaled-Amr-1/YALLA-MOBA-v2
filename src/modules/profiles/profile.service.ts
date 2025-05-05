import pool from "../../config/db";

export const getUserWithPosts = async (uid: number) => {
  const userResult = await pool.query(
    `SELECT id, username, gender, role, avatar, uid, popularity FROM users WHERE uid = $1`,
    [uid]
  );

  if (userResult.rows.length === 0) {
    throw { status: 404, message: "User not found" };
  }

  const user = userResult.rows[0];

  const postsResult = await pool.query(
    `SELECT id, body, files, created_at, updated_at FROM posts WHERE user_id = $1 ORDER BY created_at DESC`,
    [user.id]
  );

  delete user.id;

  return { user, posts: postsResult.rows };
};
