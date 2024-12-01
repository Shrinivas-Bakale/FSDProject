const { db } = require("../firebase.js");

const createUser = async (req, res) => {
  try {
    const { email, name, phone, pincode, address, gender } = req.body;

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (
      !email ||
      !validateEmail(email) || // Validate the email format
      !name ||
      !pincode ||
      pincode.length !== 6 ||
      isNaN(pincode) || // Ensure pincode is numeric
      !address ||
      !gender
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    if (!phone || phone.length !== 10) {
      return res.status(400).send({ error: "Invalid phone number" });
    }

    const docRef = await db
      .collection("users")
      .add({ email, name, phone, pincode, address, gender });

    // Respond with the generated ID
    return res.status(200).send({
      message: "User created successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).send({ error: "Failed to create service" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await db.collection("users").get();
    if (querySnapshot.empty) {
      return res.status(200).send({ message: "No users found" });
    }
    const response = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).send({ error: "Failed to fetch services" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(doc.data());
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).send({ error: "Failed to fetch user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};
