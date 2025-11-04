const express = require("express");

const {
  createDoctorController,
  getAllDoctorsController,
  updateDoctorByIdController,
  deleteDoctorsByIdController,
  searchDoctorController,
} = require("../controllers/doctor/doctorController");

const {
  createPatientController,
  getAllPatientsController,
  updatePatientByIdController,
  deletePatientByIdController,
  searchPatientController,
} = require("../controllers/patient/patientController");

const {
  createAppointmentController,
  getAllAppointmentsController,
  updateAppointmentByIdController,
  deleteAppointmentByIdController,
  searchAppointmentController,
} = require("../controllers/appointment/appointmentController");

const router = express.Router();

router.post("/doctors", createDoctorController);
router.get("/doctors", getAllDoctorsController);
router.put("/doctors/:id", updateDoctorByIdController);
router.delete("/doctors/:id", deleteDoctorsByIdController);
router.get("/doctors/search", searchDoctorController);

router.post("/patients", createPatientController);
router.get("/patients", getAllPatientsController);
router.put("/patients/:id", updatePatientByIdController);
router.delete("/patients/:id", deletePatientByIdController);
router.get("/patients/search", searchPatientController);

router.post("/appointments", createAppointmentController);
router.get("/appointments", getAllAppointmentsController);
router.put("/appointments/:id", updateAppointmentByIdController);
router.delete("/appointments/:id", deleteAppointmentByIdController);
router.get("/appointments/search", searchAppointmentController);

module.exports = router;
