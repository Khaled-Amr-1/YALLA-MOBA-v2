import pool from "../../config/db";

interface FileType {
  path: string;
}

export const createPostService = async (
  userId: number,
  body: string,
  files: any
) => {
  if (!body || body.trim().length === 0) {
    throw new Error("Body field is required");
  }

  const fileUrls =
    Array.isArray(files) && files.length > 0
      ? (files as FileType[]).map((file) => file.path)
      : [];

  const userResult = await pool.query(
    "SELECT username, avatar, uid FROM users WHERE id = $1",
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }

  const ownerData = userResult.rows[0];

  const insertResult = await pool.query(
    "INSERT INTO posts (user_id, body, files) VALUES ($1, $2, $3) RETURNING id, user_id, body, files, created_at, updated_at",
    [userId, body, fileUrls]
  );

  const newPost = insertResult.rows[0];

  return {
    message: "Post created successfully",
    ownerData,
    newPost,
  };
};

export const deletePostService = async (userId: number, postId: number) => {
  const postResult = await pool.query(
    "SELECT user_id FROM posts WHERE id = $1",
    [postId]
  );

  if (postResult.rows.length === 0) {
    return {
      status: 404,
      data: { error: "Post not found" },
    };
  }

  const post = postResult.rows[0];

  if (post.user_id !== userId) {
    return {
      status: 403,
      data: { error: "Not authorized to delete this post" },
    };
  }

  await pool.query("DELETE FROM posts WHERE id = $1", [postId]);

  return {
    status: 200,
    data: { message: "Post deleted successfully" },
  };
};
