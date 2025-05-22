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

POST 
send the id of the user you want to follow in the url :id/
you will get 

res
{
    "message": "Followed successfully"
}

DELETE
res
{
    "message": "Unfollowed successfully"
}
---

### 👥 Get User Followers

**GET** `/users/:id/followers/`  
Returns the list of users following the specified user.
this :id in the request is the user i want to know his followers

res
[
    {
        "id": 1,
        "username": "khaled",
        "avatar": "https://imgs.search.brave.com/wWDObZCjNHTw-EtXI6tQUi8nOURSn0HT1OTy3Z_MIbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpERmhZelZq/WmpndFlUbGtaQzAw/WW1RMExXRmhObU10/TTJFd05EUmxabVpp/WW1GbVhrRXlYa0Zx/Y0djQC5qcGc"
    }
]
---

### 👤 Get User Following

**GET** `/users/:id/following/`  
Returns the list of users that the specified user is following.

res
[
    {
        "id": 2,
        "username": "sasa123",
        "avatar": "https://example.com/avatar.jpg"
    }
]
---

## 🧑‍💼 Profiles

### 📄 Get Profile

**GET** `/profiles/:uid/`  
Fetch profile data by user UID.

res
{
    "ownerData": {
        "username": "khaled",
        "gender": "Male",
        "role": "MM",
        "avatar": "https://imgs.search.brave.com/wWDObZCjNHTw-EtXI6tQUi8nOURSn0HT1OTy3Z_MIbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpERmhZelZq/WmpndFlUbGtaQzAw/WW1RMExXRmhObU10/TTJFd05EUmxabVpp/WW1GbVhrRXlYa0Zx/Y0djQC5qcGc",
        "uid": "1000001",
        "popularity": "0"
    },
    "ownerPosts": [
        {
            "id": 80,
            "body": "asdfghjkl",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1746653815/posts/uvxmqdkf1asvyowf3ypk.png"
            ],
            "created_at": "2025-05-07T20:17:10.502Z",
            "updated_at": "2025-05-07T23:58:39.756Z"
        },
        {
            "id": 52,
            "body": "heli",
            "files": [],
            "created_at": "2025-05-05T11:08:40.520Z",
            "updated_at": "2025-05-07T23:58:39.756Z"
        },
        {
            "id": 5,
            "body": "khaled post 3",
            "files": null,
            "created_at": "2025-05-01T12:59:02.597Z",
            "updated_at": "2025-05-07T23:58:39.756Z"
        }
    ]
}

---

### ✏️ Update Profile

**PATCH** `/profiles/`  
Update the current user’s profile (authentication required).

req
{
    "username": "",
    "avatar": "",
    "role":""
}

res
{
    "message": "Profile updated successfully"
}
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