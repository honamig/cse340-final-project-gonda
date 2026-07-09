const buildAbout = (req, res) => {
  res.render("pages/about", { title: "About" });
};

export { buildAbout };