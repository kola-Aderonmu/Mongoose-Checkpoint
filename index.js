// Import necessary modules
const mongoose = require("mongoose");
const { connectDB } = require("./config/dbConnect");
const express = require("express");
const person = require("./models/personModel");
const { arrayOfPeople } = require("./data/data");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// middlewares
app.use(express.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to save a single record
const createAndSavePerson = () => {
  const newPerson = new person({
    name: "John Doed",
    age: 25,
    favouriteFoods: ["Pizza", "Burger"],
  });

  console.log("saved person");
  return newPerson.save();
};
// createAndSavePerson();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// create Many people
const createManyPeople = (arrayOfPeople) => {
  return person.create(arrayOfPeople);
};
// createManyPeople(arrayOfPeople)
//   .then((result) => {
//     console.log("People created successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error creating people:", error);
//   });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to find people by name
const findPeopleByName = (personName) => {
  return person.find({ name: personName });
};
// findPeopleByName("Kemi")
//   .then((result) => {
//     console.log("Found person with name", result);
//   })
//   .catch((error) => {
//     console.error("Error finding people by name", error);
//   });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Find people by favourite food
const findPeopleByFood = (food) => {
  return person.findOne({ favouriteFoods: { $in: [food] } });
};
// findPeopleByFood("Pizza")
//   .then((result) => {
//     if (result) {
//       console.log("Found person with favourite food", result);
//     } else {
//       console.log("No person found with the specified favourite food.");
//     }
//   })
//   .catch((error) => {
//     console.error("Error finding people by food", error);
//   });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to find people by id
const findPeopleById = (personID) => {
  return person.find({ _id: personID });
};
// findPeopleById("658d3e8e89b2a2009cd5956c")
//   .then((result) => {
//     console.log("Found person with id", result);
//   })
//   .catch((error) => {
//     console.error("Error finding person by id", error);
//   });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// find person update the favourite food then save
const findEditSave = (personID) => {
  return person.findById(personID).then((person) => {
    person.favouriteFoods.push("Hamburger");
    console.log("added new favourite food");
    return person.save();
  });
};
// findEditSave("658d3e8e89b2a2009cd5956c");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to perform new updates using findOneAndUpdate
const findAndUpdate = (personName) => {
  return person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  );
};
// findAndUpdate("Samuel").then((result) => {
//   if (result) {
//     console.log("Found person and updated", result);
//   } else {
//     console.log("No person found ");
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to delete one person by _id
const removeById = (personId) => {
  return person.findByIdAndDelete(personId);
};
// removeById("658d3e8e89b2a2009cd5956c").then((result) => {
//   if (result) {
//     console.log("Found person and deleted", result);
//   } else {
//     console.log("No person found ");
//   }
// });
// ///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Function to delete many people by name
const removeManyPeople = () => {
  // tried person.remove() but it isn't a mongoose function anymore so deleteMany() works
  return person.deleteMany({ name: "Mary" });
};
// removeManyPeople().then((result) => {
//   if (result) {
//     console.log("Found person and deleted", result);
//   } else {
//     console.log("No person found ");
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
// Function to find people who like burritos
const chainQueryHelpers = () => {
  return person
    .find({ favoriteFoods: "Burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec();
};
// chainQueryHelpers().then((result) => {
//   if (result) {
//     console.log("People Found", result);
//   } else {
//     console.log("No person found ");
//   }
// });

// Startup app
const startApp = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Listening at ${port}`));
};

startApp();
