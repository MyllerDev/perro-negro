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