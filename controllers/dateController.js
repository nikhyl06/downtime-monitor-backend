const Breakdown = require("../model/BreakDown");


const getDates = async (req, res) => {
  try {
    const result = await Breakdown.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: "$date" },
          maxDate: { $max: "$date" },
        },
      },
    ]);

    if (result.length > 0) {
      console.log(result[0].minDate.toISOString());
      console.log(result[0].maxDate.toISOString());
      res.json({
        oldestYear: Number(result[0].minDate.toISOString().slice(0, 4)),
        oldestMonth: Number(result[0].minDate.toISOString().slice(5, 7)),
        latestYear: Number(result[0].maxDate.toISOString().slice(0, 4)),
        latestMonth: Number(result[0].maxDate.toISOString().slice(5, 7)),
      });
    } else {
      console.log("No documents found.");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getDates };
