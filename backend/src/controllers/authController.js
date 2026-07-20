import { loginAdmin } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "El email y la contraseña son obligatorios",
      });
    }

    const result = await loginAdmin(
      email,
      password
    );

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};