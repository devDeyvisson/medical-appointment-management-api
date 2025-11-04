const {
  createDoctor,
  getAllDoctors,
  updateDoctorById,
  findById,
  deleteDoctorsById,
  getDoctorByName,
  getDoctorBySpecialty,
} = require("../../repositories/doctor/doctorRepository");

function createDoctorService(name, specialty) {
  let doctors = {
    id: Date.now().toString(),
    name: name,
    specialty: specialty,
  };

  return createDoctor(doctors);
}

function getAllDoctorsService() {
  return getAllDoctors();
}

function updateDoctorByIdService(id, name, specialty) {
  let doctorFound = findById(id);

  if (!doctorFound) return null;

  doctorFound.name = name || doctorFound.name;
  doctorFound.specialty = specialty || doctorFound.specialty;

  return updateDoctorById(id, doctorFound);
}

function deleteDoctorsByIdService(id) {
  return deleteDoctorsById(id);
}

function getDoctorByNameService(name) {
  return getDoctorByName(name);
}

function getDoctorBySpecialtyService(specialty) {
  return getDoctorBySpecialty(specialty);
}

module.exports = {
  createDoctorService,
  getAllDoctorsService,
  updateDoctorByIdService,
  deleteDoctorsByIdService,
  getDoctorByNameService,
  getDoctorBySpecialtyService,
};
