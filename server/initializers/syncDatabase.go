package initializers

import "github.com/veerendra19codes/server/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.AssignmentUser{})
	DB.AutoMigrate(&models.AssignmentPatient{})
}
