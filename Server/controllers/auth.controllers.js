import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Funkcija za generiranje tokena
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const postoji = await User.findOne({ email });
    if (postoji) return res.status(400).json({ message: "Email već postoji" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Korisnik registriran", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Korisnik ne postoji" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Pogrešna lozinka" });

    // GENERIRAJ TOKEN
    const token = generateToken(user._id);

    // VRATI TOKEN U RESPONSE
    res.status(200).json({ 
      message: "Prijava uspješna", 
      userId: user._id,
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
