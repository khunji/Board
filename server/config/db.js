const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log("MongoDB connection failed", err);
    process.exit(1); //프로세스가 실패와 함께 종료
  }
};

//다른 곳에서도 쓸 수 있게 connectDB 배출해주기
module.exports = connectDB;
