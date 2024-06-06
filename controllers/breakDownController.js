const Breakdown = require("../model/BreakDown");

const getBreakDown = async (req, res) => {
  try {
    const data = await Breakdown.find({});
    res.json(data);
  } catch (err) {
    console.error("Error reading the file:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBreakDown = async (req, res) => {
  const breakdown = req.body;
  console.log(breakdown);
  try {
    const result = await Breakdown.create({
      ...breakdown,
      date: new Date(breakdown.date),
    });
    res
      .status(201)
      .json({ message: `breakdown created ${JSON.stringify(result)}` });
  } catch (err) {
    console.error("Error processing the request:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMonthlyBreakdown = async (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);

  try {
    const startDate = new Date(
      `${year}-${String(month).padStart(2, "0")}-01`
    );
    const endDate = new Date(
      `${month === 12 ? year + 1 : year}-${String(
        month === 12 ? 1 : month + 1
      ).padStart(2, "0")}-01`
    );


    const breakdowns = await Breakdown.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // console.log("Breakdowns for the given month:", breakdowns);
    res.status(200).json(breakdowns);
  } catch (err) {
    console.error("Error retrieving breakdowns:", err);
    throw err;
  }
};

const getYearlyBreakdown = async (req, res) => {
  const year = Number(req.params.year);


  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year+1}-01-01`);

    const breakdowns = await Breakdown.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    console.log(breakdowns);

    res.status(200).json(breakdowns);
  } catch (err) {
    console.error("Error retrieving breakdowns:", err);
    throw err;
  }
};

module.exports = {
  addBreakDown,
  getBreakDown,
  getMonthlyBreakdown,
  getYearlyBreakdown,
};
