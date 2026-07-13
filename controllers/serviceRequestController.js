import { createServiceRequest } from "../models/serviceRequestModel.js";

async function submitServiceRequest(req, res) {
  const vehicleId = req.params.id;
  const { serviceType, description } = req.body;

  if (!serviceType || serviceType.trim() === "") {
    req.flash("error", "Please select a service type.");
    return res.redirect(`/vehicle/${vehicleId}`);
  }

  const request = await createServiceRequest({
    userId: req.session.user.id,
    vehicleId,
    serviceType,
    description: description ? description.trim() : null
  });

  if (!request) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect(`/vehicle/${vehicleId}`);
  }

  req.flash("success", "Service request submitted. You can check its status on your account page.");
  res.redirect(`/vehicle/${vehicleId}`);
}

export { submitServiceRequest };