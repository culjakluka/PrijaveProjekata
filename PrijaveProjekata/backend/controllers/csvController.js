const { json2csv } = require("json-2-csv");

const convertToCSV = (req, res) => {
  const jsonData = req.body;

  try {
    json2csv(jsonData, (err, csv) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=download.csv");

      res.send(csv);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  convertToCSV,
};
