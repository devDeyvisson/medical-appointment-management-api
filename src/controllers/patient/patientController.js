const {
  createPatientService,
  getAllPatientsService,
  updatePatientByIdService,
  deletePatientByIdService,
  getPatientByNameService,
  getPatientByDateService,
} = require("../../services/patient/patientService");

function createPatientController(request, response) {
  try {
    const { name, birthDate } = request.body;

    if (!name || !birthDate) {
      return response.status(400).json({ message: "All fields are required." });
    }

    let newPatient = createPatientService(name, birthDate);

    return response.status(201).json(newPatient);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error creating patient." });
  }
}

function getAllPatientsController(request, response) {
  try {
    let patients = getAllPatientsService();
    return response.status(200).json(patients);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error listing patients." });
  }
}

function updatePatientByIdController(request, response) {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    const { name, birthDate } = request.body;

    let updatedPatient = updatePatientByIdService(id, name, birthDate);

    if (!updatedPatient) {
      return response.status(404).json({ message: "Patient not found." });
    }

    return response.status(200).json(updatedPatient);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error updating patient." });
  }
}

function deletePatientByIdController(request, response) {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    let deleted = deletePatientByIdService(id);

    if (!deleted) {
      return response.status(404).json({ message: "Patient not found." });
    }

    return response.status(204).end();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error deleting patient." });
  }
}

function searchPatientController(request, response) {
  try {
    const { name, birthDate } = request.query;

    if (name) {
      return response.status(200).json(getPatientByNameService(name));
    }

    if (birthDate) {
      return response.status(200).json(getPatientByDateService(birthDate));
    }
    return response
      .status(400)
      .json({ message: "No search parameters were valid." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error searching patients." });
  }
}

module.exports = {
  createPatientController,
  getAllPatientsController,
  updatePatientByIdController,
  deletePatientByIdController,
  searchPatientController,
};
