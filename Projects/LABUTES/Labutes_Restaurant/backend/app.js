
import cors from 'cors';
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";


// Configure Multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = "./images";
      if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath); // Ensure /images directory exists
      }
      cb(null, uploadPath); // Save images to /images
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
// const router = express.Router();
const upload = multer({ storage });
const SECRET_KEY = "your_secret_key";
const app = express();
// const fs = require("fs");


app.use(express.static("./images"));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS globally
app.use(express.json());

// Generate a JWT token
const createJSONToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

// CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend's URL
  methods: ['PUT', 'GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

//-------------------------------------------------------------
//-------------------------------------------------------------
// Rotas para ler dados dos Clientes com conta
app.get("/Clients", async (req, res) => {
  const fileContent = await fsPromises.readFile("./data/Clients.json");
  const clientsData = JSON.parse(fileContent);
  res.status(200).json({ clients: clientsData });
});


// Rotas de usuários para registar conta
app.post("/signup", async (req, res) => {
  const fileContent = await fsPromises.readFile("./data/Clients.json");
  const users = JSON.parse(fileContent);
  const email = req.body.email;
  const newUser = req.body;
  const signup = users.find((u) => u.email === email);
  if (!signup) {
    users.push(newUser);
    await fsPromises.writeFile("./data/Clients.json", JSON.stringify(users, null, 2));
    res.status(200).json({message: "User Inserted!"});
  }    
    else {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "That email was already used! Login or use another email to Signup" },
    });
  }  

});

// Rotas de usuários para entrar na conta feita anteriormente
app.post("/login", async (req, res) => {
  try{
  const fileContent = await fsPromises.readFile("./data/Clients.json");
  const users = JSON.parse(fileContent);
  const { email, password, role } = req.body;
  console.log(email);
  console.log(password);
  console.log(role);

  const login = users.find((u) => u.email === email && u.password === password);
  if (!login) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }
  if (login.role !== role) {
    return res.status(403).json({
      message: "Unauthorized role.",
      errors: { role: "You don't have permission for this role." },
    });
  }
  const token = createJSONToken(email); 
  const AuthUser = {
    token: token,
    name: login.name,
    role: login.role,
  };
  res.json(AuthUser);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.post("/menuGestor/data", async (req, res) => {
  try {
    const { plateName, price, category, photoUrl } = req.body;

    // Validate incoming data
    if (!plateName || !price || !category || !photoUrl) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newPlate = { 
      id:uuidv4(),
      plateName, 
      price, 
      category, 
      photoUrl: photoUrl };

    // Read existing menu data
    const menuFilePath = "./data/Menu.json";
    let existingMenu = [];
    if (await fsPromises.stat(menuFilePath).catch(() => false)) {
      const fileData = await fsPromises.readFile(menuFilePath, "utf-8");
      existingMenu = JSON.parse(fileData);
    }

    // Save new plate
    existingMenu.push(newPlate);
    await fsPromises.writeFile(menuFilePath, JSON.stringify(existingMenu, null, 2));
    res.status(200).json({ message: "Plate data saved successfully!" });
  } catch (error) {
    console.error("Error saving plate data:", error);
    res.status(500).json({ message: "Failed to save plate data." });
  }
});



app.post("/menuGestor/photo", upload.single("photo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded." });
    }

    // Correctly store the image path for use in Menu.json
    const photoUrl = `/images/${req.file.filename}`;
    res.status(200).json({ message: "Photo uploaded successfully!", photoUrl });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Failed to upload photo." });
  }
});



// Serve static files from the "images" folder
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/images", express.static("images"));

// Code para receber os pratos do Menu para clientes
app.get("/menu", async (req, res) => {
  try {
    // Read Menu.json file
    const fileContent = await fsPromises.readFile("./data/Menu.json", "utf-8");
    const menuData = JSON.parse(fileContent);

    // Attach image URLs to each plate
    const menuWithImages = menuData.map((plate) => ({
      ...plate,
      photoUrl: plate.photoUrl ? `http://localhost:3010${plate.photoUrl}` : null,
    }));
    res.status(200).json(menuWithImages);
  } catch (error) {
    console.error("Error reading menu data:", error);
    res.status(500).json({ message: "Failed to load menu data." });
  }
});



//-------------------------------------
//-------------------------------------
// PUT endpoint to handle kitchen orders
app.put("/kitchenorders", async (req, res) => {
  const { plates } = req.body;

  if (!plates || plates.length === 0) {
    return res.status(400).json({ message: "No plates provided" });
  }

  try {
    await fsPromises.writeFile("./data/KitchenOrders.json", JSON.stringify(plates));
    res.status(200).json({ message: "Order sent to the kitchen!" });
  } catch (error) {
    console.error("Error writing orders:", error);
    res.status(500).json({ message: "Failed to update orders" });
  }
});



app.get("/kitchenorders", async (req, res) => {
  try {
    const fileContent = await fsPromises.readFile("./data/KitchenOrders.json", "utf-8");
    const kitchenData = JSON.parse(fileContent);
    // Ensure each order has a status, defaulting to 'pending' if not set
    const ordersWithStatus = kitchenData.map(order => ({
      ...order,
      status: order.status || 'pending'
    }));
    res.status(200).json({ kitchen: ordersWithStatus });
  } catch (error) {
    console.error("Error reading KitchenOrders file:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});



// import kitchenOrdersRouter from './routes/kitchenOrders.js';
// app.use('/kitchenorders', kitchenOrdersRouter);

app.delete("/kitchenorders", async (req, res) => {
  const { orderid } = req.body;
  
  try {
    const fileContent = await fsPromises.readFile("./data/KitchenOrders.json", "utf-8");
    let kitchenData = JSON.parse(fileContent);

    const updatedKitchenData = kitchenData.filter(order => order.id !== orderid);

    if (updatedKitchenData.length < kitchenData.length) {
      await fsPromises.writeFile("./data/KitchenOrders.json", JSON.stringify(updatedKitchenData, null, 2));
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});


export default app;

// 404 - quando temos erros no servidor
app.use((req, res, next) => {
  res.status(404).json({ message: "404 - Not Found" });
});

// mensagem que dá na consola quando se inicia o servidor do Node
const Port = 3010;
app.listen(Port, () => {
  console.log(`Server is runing on http://localhost: ${Port}`);
});

