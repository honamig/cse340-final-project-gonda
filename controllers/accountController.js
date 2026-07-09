function buildAccount(req, res) {
  res.render("pages/account", { title: "My Account" });
}

export { buildAccount };