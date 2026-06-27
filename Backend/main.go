package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

// Part 4 Bonus: Custom Request Logger Middleware
func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()

		// Request ko aage process hone dein
		c.Next()

		// Processing khatam hone ke baad time nikalien
		latency := time.Since(startTime)
		method := c.Request.Method
		path := c.Request.URL.Path

		// Instructor ke bataye format ke mutabik console par print karein
		fmt.Printf("[BuildGram] %s %s | %v\n", method, path, latency)
	}
}

func main() {
	// gin.New() use kar rahe hain takki default logger humari prints ko double na kare
	router := gin.New()
	router.Use(gin.Recovery())
	
	// Humara custom log middleware pure server par apply karein
	router.Use(RequestLogger())

	// Part 3: Prefix Routing Group
	v1 := router.Group("/api/v1")
	{
		// --- User Endpoints ---
		v1.POST("/users", createUser)
		v1.GET("/users/:id", getUserByID)

		// --- Post Endpoints ---
		v1.POST("/posts", createPost)
		v1.GET("/posts", getAllPosts)
		v1.GET("/posts/:id", getPostByID)

		// --- Engagement Endpoints ---
		v1.POST("/posts/:id/like", likePost)
		v1.POST("/posts/:id/comments", addComment)
	}

	// Server ko local port 8080 par run karein
	router.Run(":8080")
}