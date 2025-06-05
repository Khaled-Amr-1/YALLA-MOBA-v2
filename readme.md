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
    "suspended":false,
    "followingcount": 0,
    "followerscount": 0
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
    "suspended":false,
    "followingcount": 0,
    "followerscount": 0
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

### search Profile
**POST** `/profiles/search/`
 
#### POST Request 
```json
{
  "name":"khaled"
}
```

#### POST Responce

```json
[
    {
        "id": 4,
        "username": "khaledamr",
        "avatar": "avatarurl",
        "uid": "1000004"
    },
    {
        "id": 7,
        "username": "khaledamr1",
        "avatar": "avatarurl",
        "uid": "1000007"
    },
    {
        "id": 1,
        "username": "khaled",
        "avatar": "https://imgs.search.brave.com/wWDObZCjNHTw-EtXI6tQUi8nOURSn0HT1OTy3Z_MIbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpERmhZelZq/WmpndFlUbGtaQzAw/WW1RMExXRmhObU10/TTJFd05EUmxabVpp/WW1GbVhrRXlYa0Zx/Y0djQC5qcGc",
        "uid": "1000001"
    }
]
```

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

**GET** `/posts/home?page=1&pageSize=10`  
Get the home feed 
page is the page you want and page size how many posts will you get in the responce


#### GET Response

```json
{
    [
       {
            "id": 129,
            "user_id": 3,
            "body": "ؤتين",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748499989/posts/drhdl2fpgrceckgscdyy.jpg"
            ],
            "created_at": "2025-05-29T06:26:30.650Z",
            "updated_at": "2025-05-29T06:26:30.650Z",
            "likecount": "0",
            "commentcount": "0",
            "likedbyuser": false,
            "username": "Hookxx",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s"
        },
        {
            "id": 128,
            "user_id": 3,
            "body": "لااا",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/video/upload/v1748495538/posts/cnab7fw1t1ocforai50a.mp4"
            ],
            "created_at": "2025-05-29T05:12:19.331Z",
            "updated_at": "2025-05-29T05:12:19.331Z",
            "likecount": "0",
            "commentcount": "0",
            "likedbyuser": false,
            "username": "Hookxx",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s"
        }
    ],
    "total": 73,
    "totalPages": 8,
    "currentPage": 2,
    "pageSize": 10
}
```

---

### 📰 User Feed

**GET** `/posts/feed/`  
Get the personalized feed based on user’s following.

same as home

#### GET Response 

```json
{
    "posts": [
        {
            "id": 147,
            "user_id": 3,
            "body": "New one",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748529540/posts/bzffiplymr1pk3g19qaw.jpg"
            ],
            "created_at": "2025-05-29T14:39:01.252Z",
            "updated_at": "2025-06-05T20:51:50.637Z",
            "likecount": 3,
            "commentcount": 1,
            "username": "Hookxx",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s",
            "likeCount": "3",
            "commentCount": "1",
            "likedByUser": true
        },
        {
            "id": 134,
            "user_id": 3,
            "body": "Video 📷",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/video/upload/v1748508019/posts/l7rgxe7phzdaivremby2.mp4"
            ],
            "created_at": "2025-05-29T08:40:21.342Z",
            "updated_at": "2025-05-29T08:40:21.342Z",
            "likecount": 0,
            "commentcount": 0,
            "username": "Hookxx",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s",
            "likeCount": "0",
            "commentCount": "0",
            "likedByUser": false
        },
        {
            "id": 133,
            "user_id": 3,
            "body": "Qr code",
            "files": [
                "https://res.cloudinary.com/dqtn6fmjs/image/upload/v1748504855/posts/qyugxxzg6qn7bmsjsesq.png"
            ],
            "created_at": "2025-05-29T07:47:35.934Z",
            "updated_at": "2025-05-29T07:47:35.934Z",
            "likecount": 0,
            "commentcount": 0,
            "username": "Hookxx",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mGcwK1Doj36_tYvBW0rHUoTk_EBZ4IQWHg&s",
            "likeCount": "0",
            "commentCount": "0",
            "likedByUser": false
        },
    ],
    "total": 42,
    "totalPages": 5,
    "currentPage": 1,
    "pageSize": 10
}
```