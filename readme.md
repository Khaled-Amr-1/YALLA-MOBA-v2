# 📘 YALLA MOBA API Documentation

## 🌐 Base URL

```
https://yalla-moba-v2.vercel.app/api/
```

---

## 👤 Users

### 🔐 Register a User

**POST** `/users/register/`  
Registers a new user.

#### Request Body

```json
{
  "username": "testing",
  "email": "testing@gmail.com",
  "gender": "Male",
  "role": "MM",
  "password": "testingpassword",
  "repassword": "testingpassword",
  "avatar": "https://imgs.search.brave.com/cxzXrryKS-68CHXM_H3EaV5rw9L3qbwTg3SvRyNhj-E/rs:fit:500:0:0:0/g:ce/..."
}
```

#### Response

```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "username": "testing",
    "email": "testing@gmail.com",
    "gender": "Male",
    "role": "MM",
    "avatar": "https://imgs.search.brave.com/...",
    "UID": "1000066",
    "popularity": "0"
  }
}
```

---

### 🔓 Login

**POST** `/users/login/`  
Logs in a user.

> **Note:** Send the request with a Bearer token in the headers.

#### Request Body

```json
{
  "identifier": "testing",
  "password": "testingpassword"
}
```

#### Response

```json
{
  "userToken": "JWT_TOKEN_HERE",
  "userData": {
    "username": "testing",
    "email": "testing@gmail.com",
    "gender": "Male",
    "role": "MM",
    "avatar": "https://imgs.search.brave.com/...",
    "UID": "1000066",
    "popularity": "0"
  }
}
```

---

### 🤝 Follow/Unfollow a User

**POST / DELETE** `/users/:id/follow/`  
Follow or unfollow a user by their ID.

---

### 👥 Get User Followers

**GET** `/users/:id/followers/`  
Returns the list of users following the specified user.

---

### 👤 Get User Following

**GET** `/users/:id/following/`  
Returns the list of users that the specified user is following.

---

## 🧑‍💼 Profiles

### 📄 Get Profile

**GET** `/profiles/:uid/`  
Fetch profile data by user UID.

---

### ✏️ Update Profile

**PATCH** `/profiles/`  
Update the current user’s profile (authentication required).

---

## 📝 Posts

### ➕ Create a Post

**POST** `/posts/`  
Create a new post.

---

### ❌ Delete a Post

**DELETE** `/posts/:id/`  
Delete a post by ID.

---

### ✏️ Edit a Post

**PATCH** `/posts/:id/`  
Update a post by ID.

---

### ❤️ Like/Unlike a Post

**POST / DELETE** `/posts/:id/like/`  
Like or unlike a post by ID.

---

### 💬 Add Comment to a Post

**POST** `/posts/:id/comments/`  
Add a comment to a post.

---

### 🗨️ Get Comments for a Post

**GET** `/posts/:id/comments/`  
Get all comments for a specific post.

---

### 🗑️ Delete a Comment

**DELETE** `/posts/:postId/comments/:commentId`  
Delete a specific comment from a post.

---

### 🏠 Home Feed

**GET** `/posts/home/`  
Get the home feed (e.g., trending or general posts).

---

### 📰 User Feed

**GET** `/posts/feed/`  
Get the personalized feed based on user’s following.