import { db } from "../firebase.js";

export const create = async (req, res) => {
  try {
    const {
      mainHeading,
      serviceHead,
      price,
      smallDescription,
      elaboratedDescription,
      pictureUrl,
      category,
    } = req.body;

    // Validate required fields
    if (
      !mainHeading ||
      !serviceHead ||
      !price ||
      !smallDescription ||
      !elaboratedDescription ||
      !pictureUrl ||
      !category
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Add the document to the 'services' collection
    const docRef = await db.collection("services").add({
      mainHeading,
      serviceHead,
      price,
      smallDescription,
      elaboratedDescription,
      pictureUrl,
      category,
      createdAt: new Date(), // Optional: To track when it was created
    });

    // Respond with a success message and the generated ID
    return res.status(200).send({
      message: "Service created successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).send({ error: "Failed to create service" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const querySnapshot = await db.collection("services").get();
    if (querySnapshot.empty) {
      return res.status(200).send({ message: "No services found" });
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

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("services").doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ error: "Service not found" });
    }
    return res.status(200).send(doc.data());
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).send({ error: "Failed to fetch service" });
  }
};

export const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const serviceRef = db.collection("services").doc(id);
    const docSnapshot = await serviceRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).send({ message: "Service not found" });
    }

    await serviceRef.update({
      name: name || docSnapshot.data().name,
      description: description || docSnapshot.data().description,
      price: price || docSnapshot.data().price,
      updatedAt: new Date(),
    });

    return res.status(200).send({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).send({ error: "Failed to update service" });
  }
};

export const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceRef = db.collection("services").doc(id);
    const docSnapshot = await serviceRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).send({ message: "Service not found" });
    }

    await serviceRef.delete();

    return res.status(200).send({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return res.status(500).send({ error: "Failed to delete service" });
  }
};
