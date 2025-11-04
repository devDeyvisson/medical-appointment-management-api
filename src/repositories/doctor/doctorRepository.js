const db = require("../../database/memoryDataBase");

function createDoctor(doctor) {
  db.doctors.push(doctor);
  return doctor;
}

function getAllDoctors() {
  return db.doctors;
}

function updateDoctorById(id, doctor) {
  let index = db.doctors.findIndex((doctor) => doctor.id == id);

  if (index === -1) return null;

  db.doctors[index] = doctor;
  return doctor;
}

function findById(id) {
  const doctorFound = db.doctors.find((doctor) => doctor.id == id);

  if (!doctorFound) return null;

  return doctorFound;
}

function deleteDoctorsById(id) {
  let index = db.doctors.findIndex((doctor) => doctor.id == id);

  if (index === -1) return false;

  db.doctors.splice(index, 1);

  return true;
}

function getDoctorByName(name) {
  return db.doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(name.toLowerCase())
  );
}

function getDoctorBySpecialty(specialty) {
  return db.doctors.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
}

module.exports = {
  createDoctor,
  getAllDoctors,
  updateDoctorById,
  findById,
  deleteDoctorsById,
  getDoctorByName,
  getDoctorBySpecialty,
};
