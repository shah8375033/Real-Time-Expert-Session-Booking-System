const Expert = require("../models/Expert");

// GET /experts
exports.getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /experts/:id
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    res.json(expert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
