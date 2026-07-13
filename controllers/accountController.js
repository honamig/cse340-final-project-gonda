import { getServiceRequestsByUserId } from "../models/serviceRequestModel.js";

async function buildAccount(req, res) {
  const serviceRequests = await getServiceRequestsByUserId(req.session.user.id);
  res.render("pages/account", { title: "My Account", serviceRequests });
}

export { buildAccount };