const { AppError } = require("../helpers/error");
const { User, Restaurant } = require("../models");

// Service nhận data từ controller
// Nhiệm vụ xử lí nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống database, nhận data từ DB và return về cho controller

const getUsers = async () => {
  try {
    const users = await User.findAll({ 
      // include: Restaurant
      include: "restaurants"

    });
    return users;
  } catch (error) {
    // throw new AppError(500, "Some thing went wrong with DB")
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // Email đã tồn tại trong DB
    if (user) {
      throw new AppError(400, "Email is Existed");
    }

    // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngãu nhiên
    if (!data.password) {
      data.password = Math.random().toString(36).substring(2);
      // Gửi email về cho user mật khẩu này
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    throw new AppError(500, "Something went wrong with DB");
  }
};

// Delete:
// - User.findOne({where: {id: 1}}) - nếu không tìm thấy trả về lỗi
// - User.destroy({where: {id: 1}})
// Update:
// - User.findOne({where: {id: 1}}) - nếu không tìm thấy trả về lỗi
// - User.update(data, {where: {id: 1}})
// - User.findOne({where: {id: 1}})

const updateUser = async (data, id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User doses not exist");
    }

    await User.update(data, {
      where: {
        id: id,
      },
    });

    const userAfter = await User.findOne({
      where: {
        id,
      },
    });
    return userAfter;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    // Email đã tồn tại trong DB
    if (!user) {
      throw new AppError(400, "User not found");
    }

    await User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
