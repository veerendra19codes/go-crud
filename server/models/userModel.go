package models

import "gorm.io/gorm"

type AssignmentUser struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Role     string
}
