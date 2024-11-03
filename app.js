const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());


const filePath = path.join(__dirname, "dat.json");


function generateReferCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}


function updateReferCodeInJson() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const newReferCode = generateReferCode();
  data.refer_code = newReferCode; 

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log("Código de referencia actualizado:", newReferCode);
  return data; 
}


app.get("/generate_nro_referido", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data); 
});


app.get("/generate_nro_referido/update_code", (req, res) => {
  try {
    const updatedData = updateReferCodeInJson(); 
    res.json(updatedData);
  } catch (error) {
    res.status(500).send("Error al generar el código de referencia");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
