package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// --- Response Standardize karne ke helpers ---
func sendSuccess(c *gin.Context, statusCode int, data interface{}) {
	c.JSON(statusCode, gin.H{
		"status": "success",
		"data":   data,
	})
}

func sendError(c *gin.Context, statusCode int, message string) {
	c.JSON(statusCode, gin.H{
		"status":  "error",
		"message": message,
	})
}

// --- 1. USER HANDLERS ---

// POST /api/v1/users (New User banana)
func createUser(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		sendError(c, http.StatusBadRequest, "Invalid input data. Username and valid Email are required.")
		return
	}

	mu.Lock()
	newUser := User{
		ID:       userCounter,
		Username: req.Username,
		Email:    req.Email,
		Bio:      req.Bio,
	}
	users[userCounter] = newUser
	userCounter++
	mu.Unlock()

	sendSuccess(c, http.StatusCreated, newUser)
}

// GET /api/v1/users/:id (User details nikalna)
func getUserByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendError(c, http.StatusBadRequest, "User ID must be an integer")
		return
	}

	mu.Lock()
	user, exists := users[id]
	mu.Unlock()

	if !exists {
		sendError(c, http.StatusNotFound, "user not found")
		return
	}
	sendSuccess(c, http.StatusOK, user)
}

// --- 2. POST HANDLERS ---

// POST /api/v1/posts (New Post banana)
func createPost(c *gin.Context) {
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		sendError(c, http.StatusBadRequest, "userID, imageURL, and caption are required")
		return
	}

	mu.Lock()
	_, userExists := users[req.UserID]
	if !userExists {
		mu.Unlock()
		sendError(c, http.StatusBadRequest, "Cannot create post. User ID does not exist.")
		return
	}

	newPost := Post{
		ID:         postCounter,
		UserID:     req.UserID,
		ImageURL:   req.ImageURL,
		Caption:    req.Caption,
		Timestamp:  time.Now().UTC(),
		LikesCount: 0,
	}
	posts[postCounter] = newPost
	postCounter++
	mu.Unlock()

	sendSuccess(c, http.StatusCreated, newPost)
}

// GET /api/v1/posts (Saare posts dekhna)
func getAllPosts(c *gin.Context) {
	mu.Lock()
	allPosts := make([]Post, 0, len(posts))
	for _, post := range posts {
		allPosts = append(allPosts, post)
	}
	mu.Unlock()

	sendSuccess(c, http.StatusOK, allPosts)
}

// GET /api/v1/posts/:id (Ek post aur uske comments nikalna)
func getPostByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendError(c, http.StatusBadRequest, "Post ID must be an integer")
		return
	}

	mu.Lock()
	post, exists := posts[id]
	if !exists {
		mu.Unlock()
		sendError(c, http.StatusNotFound, "post not found")
		return
	}

	// Is post se Jude saare comments filter karein
	associatedComments := []Comment{}
	for _, comment := range comments {
		if comment.PostID == id {
			associatedComments = append(associatedComments, comment)
		}
	}
	mu.Unlock()

	sendSuccess(c, http.StatusOK, gin.H{
		"post":     post,
		"comments": associatedComments,
	})
}

// --- 3. ENGAGEMENT HANDLERS ---

// POST /api/v1/posts/:id/like (Post like karna)
func likePost(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendError(c, http.StatusBadRequest, "Post ID must be an integer")
		return
	}

	mu.Lock()
	post, exists := posts[id]
	if !exists {
		mu.Unlock()
		sendError(c, http.StatusNotFound, "post not found")
		return
	}

	post.LikesCount++
	posts[id] = post
	mu.Unlock()

	sendSuccess(c, http.StatusOK, gin.H{
		"id":         post.ID,
		"likesCount": post.LikesCount,
	})
}

// POST /api/v1/posts/:id/comments (Comment add karna)
func addComment(c *gin.Context) {
	postID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendError(c, http.StatusBadRequest, "Post ID must be an integer")
		return
	}

	var req CreateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		sendError(c, http.StatusBadRequest, "userID and text are required fields")
		return
	}

	mu.Lock()
	_, postExists := posts[postID]
	_, userExists := users[req.UserID]

	if !postExists || !userExists {
		mu.Unlock()
		sendError(c, http.StatusBadRequest, "Invalid postID or userID. Both must exist.")
		return
	}

	newComment := Comment{
		ID:        commentCount,
		PostID:    postID,
		UserID:    req.UserID,
		Text:      req.Text,
		Timestamp: time.Now().UTC(),
	}
	comments = append(comments, newComment)
	commentCount++
	mu.Unlock()

	sendSuccess(c, http.StatusCreated, newComment)
}