const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// Ruta al archivo JSON
const filePath = path.join(__dirname, "dat.json");

// Función para generar un código de referencia aleatorio
function generateReferCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos aleatorio
}

// Función para actualizar el `refer_code` en `dat.json`
function updateReferCodeInJson() {
  // Lee el archivo JSON
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Genera un nuevo código de referencia
  const newReferCode = generateReferCode();
  data.refer_code = newReferCode; // Actualiza el código en el objeto

  // Escribe el objeto actualizado de nuevo en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log("Código de referencia actualizado:", newReferCode);
  return data; // Devuelve el objeto actualizado completo
}

// Endpoint para obtener el objeto JSON completo
app.get("/generate_nro_referido", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data); // Devuelve el objeto JSON completo
});

// Endpoint para actualizar y devolver el nuevo `refer_code`
app.get("/generate_nro_referido/update_code", (req, res) => {
  try {
    const updatedData = updateReferCodeInJson(); // Genera y guarda el nuevo refer_code
    res.json(updatedData);
  } catch (error) {
    res.status(500).send("Error al generar el código de referencia");
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
