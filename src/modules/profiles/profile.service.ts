import pool from "../../config/db";

// Used in GET profile
export const getUserWithPosts = async (
  uid: number,
  page: number = 1,
  pageSize: number = 5
) => {
  const userResult = await pool.query(
    `SELECT id, username, gender, role, avatar, uid, popularity, suspended, followingcount, followerscount 
     FROM users WHERE uid = $1`,
    [uid]
  );

  if (userResult.rows.length === 0) {
    throw { status: 404, message: "User not found" };
  }

  const user = userResult.rows[0];

  // Count total posts for pagination
  const countResult = await pool.query(
    `SELECT COUNT(*) FROM posts WHERE user_id = $1`,
    [user.id]
  );
  const totalPosts = parseInt(countResult.rows[0].count, 10);

  // Pagination computation
  const offset = (page - 1) * pageSize;

  const postsResult = await pool.query(
    `SELECT id, body, files, created_at, updated_at, likecount, commentcount 
     FROM posts WHERE user_id = $1 
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [user.id, pageSize, offset]
  );

  delete user.id;

  return { user, posts: postsResult.rows, totalPosts };
};

// Used in PATCH profile
export const isUsernameTaken = async (username: string, currentUserId: number) => {
  const result = await pool.query(
    `SELECT 1 FROM users WHERE username = $1 AND id != $2`,
    [username, currentUserId]
  );
  return (result.rowCount ?? 0) > 0;
};

export const updateUserInfo = async (
  userId: number,
  updates: { username?: string; avatar?: string; role?: string }
) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.username) {
    fields.push(`username = $${index++}`);
    values.push(updates.username);
  }

  if (updates.avatar) {
    fields.push(`avatar = $${index++}`);
    values.push(updates.avatar);
  }

  if (updates.role) {
    fields.push(`role = $${index++}`);
    values.push(updates.role);
  }

  if (fields.length === 0) return;

  values.push(userId); // last param for WHERE clause

  await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $${index}`,
    values
  );
};

interface SearchResult {
  users: Array<{
    id: number;
    username: string;
    avatar: string | null;
    uid: string;
  }>;
}

export const getsearchUser = async (query: string): Promise<SearchResult> => {
  try {
    const result = await pool.query(
      `SELECT id, username, avatar, uid 
       FROM users 
       WHERE LOWER(username) LIKE LOWER($1) 
       LIMIT 10`,
      [`%${query}%`]
    );

    return {
      users: result.rows
    };
  } catch (error) {
    console.error("Database Search Error:", error);
    throw new Error("Failed to search users");
  }
};