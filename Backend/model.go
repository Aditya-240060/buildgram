package main

import (
	"sync"
	"time"
)

// User data structure
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Bio      string `json:"bio"` 
}

// Post data structure
type Post struct {
	ID         int       `json:"id"`
	UserID     int       `json:"userID"`
	ImageURL   string    `json:"imageURL"`
	Caption    string    `json:"caption"`
	Timestamp  time.Time `json:"timestamp"`
	LikesCount int       `json:"likesCount"`
}

// Comment data structure
type Comment struct {
	ID        int       `json:"id"`
	PostID    int       `json:"postID"`
	UserID    int       `json:"userID"`
	Text      string    `json:"text"`
	Timestamp time.Time `json:"timestamp"`
}

// --- Validation ke liye input structures ---
type CreateUserRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Bio      string `json:"bio"`
}

type CreatePostRequest struct {
	UserID   int    `json:"userID" binding:"required"`
	ImageURL string `json:"imageURL" binding:"required"`
	Caption  string `json:"caption" binding:"required"`
}

type CreateCommentRequest struct {
	UserID int    `json:"userID" binding:"required"`
	Text   string `json:"text" binding:"required"`
}

// --- Temporary In-Memory Database ---
var (
	users        = make(map[int]User)
	posts        = make(map[int]Post)
	comments     = []Comment{}
	userCounter  = 1
	postCounter  = 1
	commentCount = 1
	mu           sync.Mutex 
)