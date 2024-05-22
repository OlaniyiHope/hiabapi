import Properties from "../models/Properties.js";

// Assuming you have fetched the data from MongoDB
const mongoDate = new Date(); // Replace with your actual date value

// export const createProperties = async (req, res, next) => {
//   const newProperties = new Properties(req.body);

//   try {
//     const savedProperties = await newProperties.save();
//     res.status(200).json(savedProperties);
//   } catch (err) {
//     next(err);
//   }
// };

export const createProperties = async (req, res, next) => {
  const newProperties = new Properties(req.body);

  // Generate slug from title
  newProperties.slug = req.body.title.toLowerCase().replace(/\s+/g, "-");

  try {
    const savedProperties = await newProperties.save();
    res.status(200).json(savedProperties);
  } catch (err) {
    next(err);
  }
};
export const getPropertiesBySlug = async (req, res, next) => {
  try {
    const properties = await Properties.findOne({ slug: req.params.slug });
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};
export const updateProperties = async (req, res, next) => {
  try {
    const updatedProperties = await Properties.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProperties);
  } catch (err) {
    next(err);
  }
};
export const deleteProperties = async (req, res, next) => {
  try {
    await Properties.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getProperties = async (req, res, next) => {
  try {
    const properties = await Properties.findById(req.params.id);
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};
// export const getProperties = async (req, res, next) => {
//   try {
//     const properties = await Properties.findOne({ title: req.params.title });
//     res.status(200).json(properties);
//   } catch (err) {
//     next(err);
//   }
// };

export const getPropCategory = async (req, res, next) => {
  try {
    const propcategory = await Properties.find({
      categories: "health",
    });
    res.status(200).json(propcategory);
  } catch (err) {
    next(err);
  }
};
export const getpropertiess = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.categories;
  try {
    let property;

    if (qNew) {
      property = await Properties.find();
    } else if (qCategory) {
      property = await Properties.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      property = await Properties.find();
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Properties.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const propertiesCount = await Properties.countDocuments({
      type: "properties",
    });
    const apartmentCount = await Properties.countDocuments({
      type: "apartment",
    });
    const resortCount = await Properties.countDocuments({ type: "resort" });
    const villaCount = await Properties.countDocuments({ type: "villa" });
    const cabinCount = await Properties.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "properties", count: propertiesCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
//add comment
