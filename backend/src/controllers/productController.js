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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      stock,
      image_url,
      category,
      is_active,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "El nombre y el precio son obligatorios",
      });
    }

    const [result] = await pool.query(
      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        image_url = ?,
        category = ?,
        is_active = ?
      WHERE id = ?
      `,
      [
        name,
        description || null,
        price,
        stock ?? 0,
        image_url || null,
        category || null,
        is_active ?? true,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error("Error actualizando producto:", error);

    res.status(500).json({
      success: false,
      message: "Error actualizando el producto",
    });
  }
};

export const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.query(
      `
      SELECT is_active
      FROM products
      WHERE id = ?
      `,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    const newStatus = !products[0].is_active;

    await pool.query(
      `
      UPDATE products
      SET is_active = ?
      WHERE id = ?
      `,
      [newStatus, id]
    );

    res.json({
      success: true,
      message: newStatus
        ? "Producto activado correctamente"
        : "Producto desactivado correctamente",
      data: {
        is_active: newStatus,
      },
    });
  } catch (error) {
    console.error(
      "Error cambiando estado del producto:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Error cambiando el estado del producto",
    });
  }
};