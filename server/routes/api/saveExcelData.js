const express = require("express");
const router = express.Router();
const ExcelDataModel = require("../../database/models/ExcelDataSchema");

router.post("/saveExcelData", async (req, res) => {
  try {
    const data = req.body;
    const dataToSave = await ExcelDataModel.create({ data: data });
    if (dataToSave) {
      res.status(201).json(dataToSave);
    }
    console.log(dataToSave);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
