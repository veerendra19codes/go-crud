package models

import (
	"time"
)

type AssignmentPatient struct {
	ID                     uint `gorm:"primaryKey"`
	FullName               string
	RegisteredDateTime     time.Time
	Symptoms               string
	Dob                    string
	Gender                 string
	ContactNumber          string
	Address                string
	EmergencyContactNumber string
	ReasonForVisit         string
}
