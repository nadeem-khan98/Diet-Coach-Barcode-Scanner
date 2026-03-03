const Scan = require("../models/ScanHistory");
const Intake = require("../models/DailyIntake");

exports.saveScan = async (req, res) => {
  try {
    const { productName, calories, sugar, fat, protein } = req.body;

    const userId = req.user.id;

    const scan = await Scan.create({
      userId,
      productName,
      calories,
      sugar,
      fat,
      protein
    });

    const today = new Date().toISOString().slice(0, 10);

    await Intake.findOneAndUpdate(
      { userId, date: today },
      {
        $inc: {
          totalCalories: calories || 0,
          totalSugar: sugar || 0,
          totalFat: fat || 0,
          totalProtein: protein || 0
        }
      },
      { upsert: true, new: true }
    );

    res.json(scan);

  } catch (error) {
    console.log("SCAN ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};