const db = require("../../database/memoryDataBase");

const {
  createAppointment,
  getAllAppointments,
  updateAppointmentById,
  findById,
  deleteAppointmentById,
  getAppointmentByDate,
  getAppointmentByDoctorId,
  getAppointmentByPatientId,
  getAppointmentByDescription,
} = require("../../repositories/appointment/appointmentRepository");

function createAppointmentService(date, doctorId, patientId, description) {
  const doctorExists = db.doctors.some((doctor) => doctor.id == doctorId);
  const patientExists = db.patients.some((patient) => patient.id == patientId);

  if (!doctorExists) throw new Error("Doctor not found.");
  if (!patientExists) throw new Error("Patient not found.");

  let appointment = {
    id: Date.now().toString(),
    date: date,
    doctorId: doctorId,
    patientId: patientId,
    description: description,
  };

  return createAppointment(appointment);
}

function getAllAppointmentsService() {
  return getAllAppointments();
}

function updateAppointmentByIdService(
  id,
  date,
  doctorId,
  patientId,
  description
) {
  let appointmentFound = findById(id);
  if (!appointmentFound) return null;

  const doctorExists = db.doctors.some(
    (doctor) => doctor.id == (doctorId || appointmentFound.doctorId)
  );
  const patientExists = db.patients.some(
    (patient) => patient.id == (patientId || appointmentFound.patientId)
  );

  if (!doctorExists) throw new Error("Doctor not found.");
  if (!patientExists) throw new Error("Patient not found.");

  appointmentFound.date = date || appointmentFound.date;
  appointmentFound.doctorId = doctorId || appointmentFound.doctorId;
  appointmentFound.patientId = patientId || appointmentFound.patientId;
  appointmentFound.description = description || appointmentFound.description;

  return updateAppointmentById(id, appointmentFound);
}

function findByIdService(id) {
  return findById(id);
}

function deleteAppointmentByIdService(id) {
  return deleteAppointmentById(id);
}

function getAppointmentByDateService(date) {
  return getAppointmentByDate(date);
}

function getAppointmentByDoctorIdService(doctorId) {
  return getAppointmentByDoctorId(doctorId);
}

function getAppointmentByPatientIdService(patientId) {
  return getAppointmentByPatientId(patientId);
}

function getAppointmentByDescriptionService(description) {
  return getAppointmentByDescription(description);
}

module.exports = {
  createAppointmentService,
  getAllAppointmentsService,
  updateAppointmentByIdService,
  findByIdService,
  deleteAppointmentByIdService,
  getAppointmentByDateService,
  getAppointmentByDoctorIdService,
  getAppointmentByPatientIdService,
  getAppointmentByDescriptionService,
};
