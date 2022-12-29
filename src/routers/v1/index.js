// Routers V1
const express = require("express");
const userController = require("../../controllers/user.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const authController = require("../../controllers/auth.controller");
const requireRole = require("../../helpers/requireRole");
const uploadController = require("../../controllers/upload.controller");

const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/upload");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho users
v1.get("/users", userController.getUsers());
v1.post("/users", userController.createUser());
v1.delete("/users/:id", userController.deleteUser());
v1.put("/users/:id", userController.updateUser());

// Định nghĩa các routers cho restaurants
v1.get("/restaurants", restaurantController.getRestaurants());
v1.post(
  "/restaurants",
  authorization,
  requireRole("merchant", "admin"),
  restaurantController.createRestaurant()
);
v1.post(
  "/restaurants/:restaurantId/like",
  authorization,
  restaurantController.likeRestaurant()
);
v1.delete(
  "/restaurants/:id",
  authorization,
  restaurantController.deleteRestaurant()
);

// Định nghĩa router cho auth
v1.post("/login", authController.login());
v1.get("/profile", authorization, authController.getProfile());


// Định nghĩa router cho upload
v1.post("/upload",upload.single("file"), uploadController.upload());

module.exports = v1;
