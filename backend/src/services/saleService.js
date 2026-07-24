import pool from "../config/database.js";

export const createSale = async (saleData) => {
  const {
    customer_id,
    payment_method,
    products,
  } = saleData;

  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    let total = 0;

    const saleItems = [];

    for (const product of products) {
      const [rows] =
        await connection.query(
          `
          SELECT
            id,
            price,
            stock
          FROM products
          WHERE id = ?
          AND is_active = 1
          FOR UPDATE
          `,
          [product.product_id]
        );

      if (rows.length === 0) {
        throw new Error(
          "Producto no encontrado"
        );
      }

      const dbProduct = rows[0];

      if (
        dbProduct.stock <
        product.quantity
      ) {
        throw new Error(
          `Stock insuficiente para el producto ${product.product_id}`
        );
      }

      const unitPrice =
        Number(dbProduct.price);

      const subtotal =
        unitPrice *
        Number(product.quantity);

      total += subtotal;

      saleItems.push({
        product_id: product.product_id,
        quantity: product.quantity,
        unit_price: unitPrice,
      });
    }

    const [saleResult] =
      await connection.query(
        `
        INSERT INTO sales
        (
          customer_id,
          total,
          payment_method,
          status
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          customer_id,
          total,
          payment_method,
          "PENDING",
        ]
      );

    const saleId =
      saleResult.insertId;

    for (const item of saleItems) {
      await connection.query(
        `
        INSERT INTO sale_items
        (
          sale_id,
          product_id,
          quantity,
          unit_price
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          saleId,
          item.product_id,
          item.quantity,
          item.unit_price,
        ]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        `,
        [
          item.quantity,
          item.product_id,
        ]
      );
    }

    await connection.commit();

    return {
      sale_id: saleId,
      total,
      status: "PENDING",
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
};