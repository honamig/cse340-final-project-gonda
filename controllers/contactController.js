import { createContactMessage } from "../models/contactModel.js";

function buildContact(req, res) {
  res.render("pages/contact", { title: "Contact Us" });
}

async function submitContact(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    req.flash("error", "All fields are required.");
    return res.redirect("/contact");
  }

  const result = await createContactMessage({ name, email, subject, message });

  if (!result) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/contact");
  }

  req.flash("success", "Thank you! Your message has been sent.");
  res.redirect("/contact");
}

export { buildContact, submitContact };