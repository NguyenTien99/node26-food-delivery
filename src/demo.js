const express = require('express');
const { Sequelize, DataTypes } = require("sequelize");
// DataTypes định nghĩa type của field INT, VARCHAR,...

const app = express();
app.use(express.json());

// Tạo kết nối db bằng Sequelize
const sequelize = new Sequelize("node26-food","root","1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

// Kiểm tra xem có kết nối thành công hay không
sequelize.authenticate()
.then(() => {
    console.log("Sequelize Connected");
})
.catch((error) => {
    console.log("Sequelize Faile", error);
    throw error;
})

// Tạo model để Sequelize liên kết tới table và lấy/thêm/sửa/xóa data
// nhận 3 tham số "tên Modal", "field property", "option"
// Modal cung cấp hàm cung cấp những hàm để làm việc trực tiếp đến database
const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        field: "first_name",   // db => firstName as first_name : chuyển đổi tên query dưới bb
    },
    lastName: {
        type: DataTypes.STRING,
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "users",
    // bỏ qua CreateAt, updateAt
    timestamps: false,
});



app.get("/api/v1/users",async (req,res) => {
try {
    // SELECT * FROM users
    const users = await User.findAll();
    // Query DB thành công
    res.status(200).json({data: users});
} catch (error) {
    res.status(500).json({error: error});
    console.log(error);
    throw error;
}
})

app.listen(4000);