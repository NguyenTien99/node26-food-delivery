const { response } = require("../helpers/response");
const restaurantService = require("../services/restaurant.service");

const getRestaurants = () => {
  return async (req, res, next) => {
    try {
      const restaurants = await restaurantService.getRestaurants();
      res.status(200).json(response(restaurants));
    } catch (error) {
      next(error);
    }
  };
};

const createRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const data = req.body;
      console.log({ data });
      // set userId, là thông tin người tạo nhà hàng
      data.userId = user.id;

      const restaurants = await restaurantService.createRestaurant(data);

      res.status(200).json(response(restaurants));
    } catch (error) {
      next(error);
    }
  };
};

const deleteRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = res.locals;
      await restaurantService.deleteRestaurant(id, user);

      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

// localhost:4000/restaurants/:restaurantId/like - body: {userId: 1}
const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await restaurantService.likeRestaurant(userId, restaurantId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  likeRestaurant,
};
