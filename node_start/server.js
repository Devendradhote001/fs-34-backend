const express = require("express");

let app = express();

// middleware for accespting JSON data
app.use(express.json());
VideoColorSpace;

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/getData", (req, res) => {
  let data = {
    name: "Pizza",
    milegaKab: "Challenge me aoge tab",
  };

  res.send(data);
});

app.post("/management", (req, res) => {
  let { emp_name, emp_company, emp_id } = req.body;

  if (!emp_name || !emp_company || !emp_id) {
    return res.json({
      message: "All fields are required",
    });
  }

  res.json({
    message: "ok",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
