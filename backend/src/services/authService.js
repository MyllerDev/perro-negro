import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../config/database.js";

export const loginAdmin = async (email, password) => {
  const [admins] = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password_hash,
      is_active
    FROM admins
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  if (admins.length === 0) {
    throw new Error("Credenciales inválidas");
  }

  const admin = admins[0];

  if (!admin.is_active) {
    throw new Error("El administrador está inactivo");
  }

  const passwordValid = await bcrypt.compare(
    password,
    admin.password_hash
  );

  if (!passwordValid) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: "ADMIN",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
};