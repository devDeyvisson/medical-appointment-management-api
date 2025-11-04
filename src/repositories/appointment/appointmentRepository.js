const db = require("../../database/memoryDataBase");

function createAppointment(appointment) {
  db.appointments.push(appointment);
  return appointment;
}

function getAllAppointments() {
  return db.appointments;
}

function updateAppointmentById(id, appointment) {
  let index = db.appointments.findIndex((appointment) => appointment.id == id);
  if (index === -1) return null;

  db.appointments[index] = appointment;
  return appointment;
}

function findById(id) {
  const appointmentFound = db.appointments.find(
    (appointment) => appointment.id == id
  );

  if (!appointmentFound) return null;

  return appointmentFound;
}

function deleteAppointmentById(id) {
  let index = db.appointments.findIndex((appointment) => appointment.id == id);

  if (index === -1) return false;

  db.appointments.splice(index, 1);

  return true;
}

function getAppointmentByDate(date) {
  return db.appointments.filter((appointment) => appointment.date === date);
}

function getAppointmentByDoctorId(doctorId) {
  return db.appointments.filter(
    (appointment) => appointment.doctorId == doctorId
  );
}

function getAppointmentByPatientId(patientId) {
  return db.appointments.filter(
    (appointment) => appointment.patientId == patientId
  );
}

function getAppointmentByDescription(description) {
  return db.appointments.filter((appointment) =>
    appointment.description.toLowerCase().includes(description.toLowerCase())
  );
}

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointmentById,
  findById,
  deleteAppointmentById,
  getAppointmentByDate,
  getAppointmentByDoctorId,
  getAppointmentByPatientId,
  getAppointmentByDescription,
};
