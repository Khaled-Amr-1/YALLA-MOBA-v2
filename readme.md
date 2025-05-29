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
  "avatar": "https://example.com/avatar.jpg"
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
    "avatar": "https://example.com/avatar.jpg",
    "UID": "1000066",
    "popularity": "0",
    "suspended":false
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
    "avatar": "https://example.com/avatar.jpg",
    "UID": "1000066",
    "popularity": "0",
    "suspended":false
  }
}
```

---

### 🤝 Follow/Unfollow a User

**POST / DELETE** `/users/:id/follow/`  
Follow or unfollow a user by their ID.

#### POST Response

```json
{
  "message": "Followed successfully"
}
```

#### DELETE Response

```json
{
  "message": "Unfollowed successfully"
}
```

---
### 👥 Get User Followers

**GET** `/users/:id/followers/`  
Returns the list of users following the specified user.
this :id in the request is the user i want to know his followers

#### GET Response
```json
[
    {
        "id": 1,
        "username": "khaled",
        "avatar": "https://example.com/avatar.jpg"
    }
]
```

---

### 👤 Get User Following

**GET** `/users/:id/following/`  
Returns the list of users that the specified user is following.

#### GET Response
```json
[
    {
        "id": 2,
        "username": "sasa123",
        "avatar": "https://example.com/avatar.jpg"
    }
]
```

---

## 🧑‍💼 Profiles

### 📄 Get Profile

**GET** `/profiles/:uid/`  
Fetch profile data by user UID.

#### GET Response
```json
{
    "ownerData": {
        "username": "khaled",
        "gender": "Male",
        "role": "MM",
        "avatar": "https://imgs.search.brave.com/wWDObZCjNHTw-EtXI6tQUi8nOURSn0HT1OTy3Z_MIbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpERmhZelZq/WmpndFlUbGtaQzAw/WW1RMExXRmhObU10/TTJFd05EUmxabVpp/WW1GbVhrRXlYa0Zx/Y0djQC5qcGc",
        "uid": "1000001",
        "popularity": "0",
        "suspended": false,
        "followingcount": 1,
        "followerscount": 0
    },
    "ownerPosts": [
        {
            "id": 138,
            "body": "[{\"fieldname\":\"files\",\"originalname\":\"Khaled Amr - Backend Developer-images-0.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"path\":\"https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748519613/posts/ckuypwo4d2jy7aq6hcyr.jpg\",\"size\":544152,\"filename\":\"posts/ckuypwo4d2jy7aq6hcyr\"}]",
            "files": [],
            "created_at": "2025-05-29T11:53:34.822Z",
            "updated_at": "2025-05-29T11:53:34.822Z",
            "likecount": 0,
            "commentcount": 0
        },
        {
            "id": 136,
            "body": "hi",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748519026/posts/l9v0lvauzkigoom5i5gg.jpg"
            ],
            "created_at": "2025-05-29T11:43:47.690Z",
            "updated_at": "2025-05-29T11:43:47.690Z",
            "likecount": 0,
            "commentcount": 0
        },
    ]
}
```

---

### ✏️ Update Profile

**PATCH** `/profiles/`  
Update the current user’s profile (authentication required).

#### Request Body
```json
{
    "username": "",
    "avatar": "",
    "role":""
}
```

#### PATCH Response

```json
{
    "message": "Profile updated successfully"
}
```
---

## 📝 Posts

### ➕ Create a Post

**POST** `/posts/`  
Create a new post.
#### Request Body
```json
"body":"",
"files":""
```

#### POST Response

```json
{
    "message": "Post created successfully",
    "ownerData": {
        "username": "testuser12",
        "avatar": "https://google.com/avatr.com",
        "uid": "1000069"
    },
    "newPost": {
        "id": 145,
        "user_id": 69,
        "body": "",
        "files": [
            "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748523233/posts/tzckxdn0uvdvxd4rwvgm.png"
        ],
        "created_at": "2025-05-29T12:53:54.986Z",
        "updated_at": "2025-05-29T12:53:54.986Z"
    }
}
```

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