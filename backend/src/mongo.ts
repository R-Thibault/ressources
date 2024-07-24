import mongoose from "mongoose";
require("dotenv");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", LogSchema);

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/logs?authSource=admin`
    );
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err as Error);
    process.exit(1);
  }
};

export { Log, connectMongoDB };
