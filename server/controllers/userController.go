package controllers

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/veerendra19codes/jwt-auth/initializers"
	"github.com/veerendra19codes/jwt-auth/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	// get email/password from req body
	var body struct {
		Username string
		Password string
		Role     string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	//hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})

		return
	}

	//create the user
	user := models.AssignmentUser{Username: body.Username, Password: string(hash), Role: body.Role}

	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	// respond
	c.JSON(http.StatusOK, gin.H{
		"message": "signed up",
	})
}

func Login(c *gin.Context) {
	// get user email and password from req body
	var body struct {
		Username string
		Password string
		Role     string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	// look up requested error
	var user models.AssignmentUser

	initializers.DB.First(&user, "Username = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid email or password",
		})

		return
	}

	// Log the entire user struct in the console
	fmt.Printf("Fetched User Details: %+v\n", user)

	// compare sent in pass with saved user pass
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid email or password",
		})

		return
	}

	// generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	// creates a token which has userid as sub and expires in 30 days of created in exp
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to generate a token",
		})

		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	type UserResponse struct {
		ID       uint   `json:"id"`
		Username string `json:"username"`
		Role     string `json:"role"`
	}

	// Create the response object
	userResponse := UserResponse{
		ID:       user.ID,
		Username: user.Username,
		Role:     user.Role,
	}

	// send the token and user data back
	c.JSON(http.StatusOK, gin.H{
		"message": "login successful",
		"user":    userResponse,
	})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	// if you want specific fiels
	// userID = user.(models.AssignmentUser).ID

	c.JSON(http.StatusOK, gin.H{
		"message": "Im logged In",
		"user":    user,
	})
}
