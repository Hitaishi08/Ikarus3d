const { db } = require("../config/firebase");
const Model = require("../models/model");

// Fetch all stored models (Mock Data)
const getModels = async (req, res) => {
  try {
    const snapshot = await db.collection("models").get();
    if (snapshot.empty) {
      return res.status(200).json({ message: "No models found", data: [] });
    }

    const models = snapshot.docs.map(doc => new Model(doc.id, doc.data().name, doc.data().description, doc.data().url));
    res.status(200).json({ data: models });
  } catch (error) {
    res.status(500).json({ message: "Error fetching models", error: error.message });
  }
};

// Upload a new model to Firebase
const uploadModel = async (req, res) => {
  try {
    const { name, description, url } = req.body;

    if (!name || !description || !url) {
      return res.status(400).json({ message: "Name, description, and URL are required" });
    }

    const modelRef = await db.collection("models").add({ name, description, url });
    const newModel = new Model(modelRef.id, name, description, url);

    res.status(201).json({ message: "Model uploaded successfully", data: newModel });
  } catch (error) {
    res.status(500).json({ message: "Error uploading model", error: error.message });
  }
};

module.exports = { getModels, uploadModel };
