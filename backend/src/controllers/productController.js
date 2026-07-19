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
        category
      FROM products
      WHERE is_active = TRUE
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("ERROR REAL DE MYSQL:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};