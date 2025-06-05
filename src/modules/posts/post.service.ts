import pool from "../../config/db";

interface FileType {
  path: string;
}

export const createPostService = async (
  userId: number,
  files: any,
  body?: string

) => {

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
    "INSERT INTO posts (user_id, body, files) VALUES ($1, COALESCE($2, ''), $3) RETURNING id, user_id, body, files, created_at, updated_at",
    [userId, body || null, fileUrls]
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

export const updatePostService = async (
  userId: number,
  postId: number,
  body: string,
  files: any
) => {
  const postResult = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
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
      data: { error: "Not authorized to edit this post" },
    };
  }

  const fileUrls =
    Array.isArray(files) && files.length > 0
      ? (files as FileType[]).map((file) => file.path)
      : post.files; // Keep existing files if no new files uploaded

  const updatedPost = await pool.query(
    "UPDATE posts SET body = $1, files = $2, updated_at = NOW() WHERE id = $3 RETURNING id, user_id, body, files, created_at, updated_at",
    [body || post.body, fileUrls, postId]
  );

  return {
    status: 200,
    data: {
      message: "Post updated successfully",
      updatedPost: updatedPost.rows[0],
    },
  };
};

export const deleteComment = async (
  userId: number,
  postId: number,
  commentId: number
) => {
  // Check if comment exists and belongs to user OR user owns the post
  const commentCheck = await pool.query(
    `SELECT c.user_id, p.user_id as post_owner_id
     FROM comments c
     JOIN posts p ON c.post_id = p.id
     WHERE c.id = $1 AND c.post_id = $2`,
    [commentId, postId]
  );

  if (commentCheck.rows.length === 0) {
    throw new Error("Comment not found");
  }

  const { user_id: commentOwnerId, post_owner_id: postOwnerId } =
    commentCheck.rows[0];

  // Allow deletion if:
  // 1. User is the comment owner, OR
  // 2. User is the post owner
  if (userId !== commentOwnerId && userId !== postOwnerId) {
    throw new Error("Not authorized to delete this comment");
  }

  await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
};

export const likePost = async (userId: number, postId: number) => {
  await pool.query(
    "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [userId, postId]
  );
};

export const unlikePost = async (userId: number, postId: number) => {
  await pool.query(
    "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
    [userId, postId]
  );
};

export const addComment = async (userId: number, postId: number, content: string) => {
  const result = await pool.query(
    "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
    [userId, postId, content]
  );
  return result.rows[0];
};

export const getComments = async (postId: number) => {
  const result = await pool.query(
    `SELECT c.*, u.username, u.avatar 
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = $1
     ORDER BY c.created_at DESC`,
    [postId]
  );
  return result.rows;
};

export const getHomePostsService = async (userId: number, limit = 10, offset = 0) => {
  try {
const result = await pool.query(
  `
  SELECT 
    p.id,
    p.user_id,
    p.body,
    p.files,
    p.created_at,
    p.updated_at,
    u.username,
    u.avatar,
    COUNT(DISTINCT l.id) AS "likeCount",
    COUNT(DISTINCT c.id) AS "commentCount",
    MAX(CASE WHEN lu.id IS NOT NULL THEN 1 ELSE 0 END)::boolean AS "likedByUser"
  FROM posts p
  JOIN users u ON p.user_id = u.id
  LEFT JOIN likes l ON p.id = l.post_id
  LEFT JOIN comments c ON p.id = c.post_id
  LEFT JOIN likes lu ON p.id = lu.post_id AND lu.user_id = $1
  GROUP BY 
    p.id, p.user_id, p.body, p.files, p.created_at, p.updated_at, 
    u.username, u.avatar
  ORDER BY p.created_at DESC
  LIMIT $2 OFFSET $3
  `,
  [userId, limit, offset]
);

    const countResult = await pool.query(`SELECT COUNT(*) FROM posts`);

    return {
      posts: result.rows,
      total: parseInt(countResult.rows[0].count, 10)
    };
  } catch (error) {
  console.error(error);
  throw error;  }
};


export const getFeedPostsService = async (userId: number, limit = 10, offset = 0) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        p.*,
        u.username,
        u.avatar,
        COUNT(DISTINCT l.id) AS "likeCount",
        COUNT(DISTINCT c.id) AS "commentCount",
        CASE WHEN lu.id IS NOT NULL THEN TRUE ELSE FALSE END AS "likedByUser"
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      LEFT JOIN likes lu ON p.id = lu.post_id AND lu.user_id = $1
      WHERE p.user_id IN (
        SELECT following_id FROM follows WHERE follower_id = $1
      )
      GROUP BY p.id, u.id, lu.id
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      `
      SELECT COUNT(*) FROM posts 
      WHERE user_id IN (
        SELECT following_id FROM follows WHERE follower_id = $1
      )
      `,
      [userId]
    );

    return {
      posts: result.rows,
      total: parseInt(countResult.rows[0].count, 10)
    };
  } catch (error) {
    throw new Error("Failed to fetch feed posts");
  }
};