const db = require("../../database/memoryDataBase");

function createPatient(patient) {
  db.patients.push(patient);
  return patient;
}

function getAllPatients() {
  return db.patients;
}

function updatePatientById(id, patient) {
  let index = db.patients.findIndex((p) => p.id == id);

  if (index === -1) return null;

  db.patients[index] = patient;
  return patient;
}

function findPatientById(id) {
  const patientFound = db.patients.find((p) => p.id == id);

  if (!patientFound) return null;

  return patientFound;
}

function deletePatientById(id) {
  let index = db.patients.findIndex((p) => p.id == id);

  if (index === -1) return false;

  db.patients.splice(index, 1);
  return true;
}

function getPatientByName(name) {
  return db.patients.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
}

function getPatientByDate(birthDate) {
  return db.patients.filter((p) => p.birthDate == birthDate);
}

module.exports = {
  createPatient,
  getAllPatients,
  updatePatientById,
  findPatientById,
  deletePatientById,
  getPatientByName,
  getPatientByDate,
};
