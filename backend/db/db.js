const mongoose = require( "mongoose");

module.exports.connectDB = async () => {
  
    try {
     await mongoose.connect(process.env.MONGO_ATLAS_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}
