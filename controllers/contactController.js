import { createContactMessage } from "../models/contactModel.js";

function buildContact(req, res) {
  res.render("pages/contact", { title: "Contact Us", error: null, success: null });
}

async function submitContact(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.render("pages/contact", {
      title: "Contact Us",
      error: "All fields are required.",
      success: null
    });
  }

  const result = await createContactMessage({ name, email, subject, message });

  if (!result) {
    return res.render("pages/contact", {
      title: "Contact Us",
      error: "Something went wrong. Please try again.",
      success: null
    });
  }

  res.render("pages/contact", {
    title: "Contact Us",
    error: null,
    success: "Thank you! Your message has been sent."
  });
}

export { buildContact, submitContact };