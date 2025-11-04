const {
  createAppointmentService,
  getAllAppointmentsService,
  updateAppointmentByIdService,
  deleteAppointmentByIdService,
  getAppointmentByDateService,
  getAppointmentByDoctorIdService,
  getAppointmentByPatientIdService,
  getAppointmentByDescriptionService,
} = require("../../services/appointment/appointmentService");

function createAppointmentController(request, response) {
  try {
    const { date, doctorId, patientId, description } = request.body;

    if (!date || !doctorId || !patientId || !description) {
      return response.status(400).json({ message: "All fields are required." });
    }

    let newAppointment = createAppointmentService(
      date,
      doctorId,
      patientId,
      description
    );
    return response.status(201).json(newAppointment);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: "Error creating appointment." });
  }
}

function getAllAppointmentsController(request, response) {
  try {
    const { date, doctorId, patientId, description } = request.query;

    if (date) {
      let result = getAppointmentByDateService(date);
      return response.status(200).json(result);
    }

    if (doctorId) {
      let result = getAppointmentByDoctorIdService(doctorId);
      return response.status(200).json(result);
    }

    if (patientId) {
      let result = getAppointmentByPatientIdService(patientId);
      return response.status(200).json(result);
    }

    if (description) {
      let result = getAppointmentByDescriptionService(description);
      return response.status(200).json(result);
    }

    let appointments = getAllAppointmentsService();
    return response.status(200).json(appointments);
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error listing appointments." });
  }
}

function updateAppointmentByIdController(request, response) {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    const { date, doctorId, patientId, description } = request.body;

    let updatedAppointment = updateAppointmentByIdService(
      id,
      date,
      doctorId,
      patientId,
      description
    );

    if (!updatedAppointment) {
      return response.status(404).json({ message: "Appointment not found." });
    }

    console.log("Update successful!");
    return response.status(200).json(updatedAppointment);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

function deleteAppointmentByIdController(request, response) {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ message: "The id is required." });
    }

    let deleted = deleteAppointmentByIdService(id);
    if (!deleted) {
      return response.status(404).json({ message: "Appointment not found." });
    }

    return response.status(204).end();
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error deleting appointment." });
  }
}

function searchAppointmentController(request, response) {
  try {
    const { date, doctorId, patientId, description } = request.query;

    if (date) {
      return response.status(200).json(getAppointmentByDateService(date));
    }

    if (doctorId) {
      return response
        .status(200)
        .json(getAppointmentByDoctorIdService(doctorId));
    }

    if (patientId) {
      return response
        .status(200)
        .json(getAppointmentByPatientIdService(patientId));
    }

    if (description) {
      return response
        .status(200)
        .json(getAppointmentByDescriptionService(description));
    }

    return response
      .status(400)
      .json({ message: "No valid search parameters were provided." });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Error searching appointments." });
  }
}

module.exports = {
  createAppointmentController,
  getAllAppointmentsController,
  updateAppointmentByIdController,
  deleteAppointmentByIdController,
  searchAppointmentController,
};
