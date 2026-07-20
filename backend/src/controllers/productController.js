import pool from "../config/database.js";

export const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT
        id,
        name,
        description,
        price,
        stock,
        image_url,
        category,
        is_active,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error obteniendo productos:", error);

    res.status(500).json({
      success: false,
      message: "Error obteniendo los productos",
    });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT
        id,
        name,
        description,
        price,
        stock,
        image_url,
        category,
        is_active,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error obteniendo productos del administrador:", error);

    res.status(500).json({
      success: false,
      message: "Error obteniendo los productos",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      image_url,
      category,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "El nombre y el precio son obligatorios",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        stock,
        image_url,
        category
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        description || null,
        price,
        stock || 0,
        image_url || null,
        category || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: {
        id: result.insertId,
        name,
        description,
        price,
        stock,
        image_url,
        category,
      },
    });
  } catch (error) {
    console.error("Error creando producto:", error);

    res.status(500).json({
      success: false,
      message: "Error creando el producto",
    });
  }
};