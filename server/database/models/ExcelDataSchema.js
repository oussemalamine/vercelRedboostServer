const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExcelDataSchema = new mongoose.Schema({
  data: {
    programs: String,
    files: Array,
  },
});

const ExcelDataModel = mongoose.model("ExcelData", ExcelDataSchema);

module.exports = ExcelDataModel;
