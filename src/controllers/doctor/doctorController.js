const {
  createDoctorService,
  getAllDoctorsService,
  updateDoctorByIdService,
  deleteDoctorsByIdService,
  getDoctorByNameService,
  getDoctorBySpecialtyService,
} = require("../../services/doctor/doctorService");

function createDoctorController(request, response) {
  try {
    const { name, specialty } = request.body;

    if (!name || !specialty) {
      return response.status(400).json({ message: "All fields are required." });
    }

    let newDoctor = createDoctorService(name, specialty);

    return response.status(201).json(newDoctor);
  } catch (error) {
    return response.status(500).json({ message: "Error creating doctor." });
  }
}

function getAllDoctorsController(request, response) {
  try {
    let doctors = getAllDoctorsService();
    return response.status(200).json(doctors);
  } catch (error) {
    return response.status(500).json({ message: "Error listing doctors." });
  }
}

function updateDoctorByIdController(request, response) {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    const { name, specialty } = request.body;

    let updatedDoctor = updateDoctorByIdService(id, name, specialty);

    if (!updatedDoctor) {
      return response.status(404).json({ message: "Doctor not found." });
    }
    console.log("Deu certo!");
    return response.status(200).json(updatedDoctor);
  } catch (error) {
    return response.status(500).json({ message: "Error updating doctor." });
  }
}

function deleteDoctorsByIdController(request, response) {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    let deletedDoctor = deleteDoctorsByIdService(id);

    if (!deletedDoctor) {
      return response.status(404).json({ message: "Doctor not found." });
    }

    return response.status(204).end();
  } catch (error) {
    return response.status(500).json({ message: "Error deleting doctor." });
  }
}

function searchDoctorController(request, response) {
  try {
    const { name, specialty } = request.query;

    if (name) {
      return response.status(200).json(getDoctorByNameService(name));
    }

    if (specialty) {
      return response.status(200).json(getDoctorBySpecialtyService(specialty));
    }

    return response
      .status(400)
      .json({ messge: "No search parameters were valid." });
  } catch (error) {
    return response.status(500).json({ message: "Error searching doctors." });
  }
}

module.exports = {
  createDoctorController,
  getAllDoctorsController,
  updateDoctorByIdController,
  deleteDoctorsByIdController,
  searchDoctorController,
};
