const buildHome = (req, res) => {
  res.render("pages/home", { title: "Home" });
};

const buildAbout = (req, res) => {
  res.render("pages/about", { title: "About" });
};

export { buildHome, buildAbout };