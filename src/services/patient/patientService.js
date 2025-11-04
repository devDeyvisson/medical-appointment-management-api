const {
  createPatient,
  getAllPatients,
  updatePatientById,
  findPatientById,
  deletePatientById,
  getPatientByName,
  getPatientByDate,
} = require("../../repositories/patient/patientRepository");

function createPatientService(name, birthDate) {
  let patient = {
    id: Date.now().toString(),
    name: name,
    birthDate: birthDate,
  };

  return createPatient(patient);
}

function getAllPatientsService() {
  return getAllPatients();
}

function updatePatientByIdService(id, name, birthDate) {
  let patientFound = findPatientById(id);

  if (!patientFound) return null;

  patientFound.name = name || patientFound.name;
  patientFound.birthDate = birthDate || patientFound.birthDate;

  return updatePatientById(id, patientFound);
}

function deletePatientByIdService(id) {
  return deletePatientById(id);
}

function getPatientByNameService(name) {
  return getPatientByName(name);
}

function getPatientByDateService(birthDate) {
  return getPatientByDate(birthDate);
}

module.exports = {
  createPatientService,
  getAllPatientsService,
  updatePatientByIdService,
  deletePatientByIdService,
  getPatientByNameService,
  getPatientByDateService,
};
