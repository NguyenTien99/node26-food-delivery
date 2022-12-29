const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      // include: "userLikes",

      // include: {
      //   association: "userLikes",
      //   // Cấu hình không bao gồm bản phụ
      //     through: {
      //       attributes: [],
      //     },
      // }

      include: [
        "owner",
        // {
        //   association: "owner",
        //   attributes: {
        //     exclude: ["email", "password"],
        //   },
        // },
        {
          association: "userLikes",
          through: {
            attributes: [],
          },
          //   attributes: {
          //     exclude: ["email", "password"]
          //   },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    throw error;
  }
};

const createRestaurant = async(data) => {
  try {
    const restaurant = await Restaurant.create(data);

    return restaurant;
  } catch (error) {
    throw error
  }
}

const deleteRestaurant = async (restaurantId, requester) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if(!restaurant){
      throw new AppError(400, "Restaurant not found");
    }

    //Kiểm tra người xóa nhà hàng, có phải chủ nhà hàng hay không
    if(restaurant.id !== requester.id){
      throw new AppError(403, "No have permission")
    }

    await Restaurant.destroy({where: {id: restaurantId }})
  } catch (error) {
    throw error;
  }
}

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }

    console.log(restaurant.__proto__);
    // Khi thiết lập relationship cho các model, mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khác
    // await restaurant.addUserLike(user.id);
    const hasliked = await restaurant.hasUserLike(user.id);
    console.log(hasliked);

    if(hasliked) {
        await restaurant.removeUserLike(user.id);
    } else {
        await restaurant.addUserLike(user.id);
    }

    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  likeRestaurant,
};
