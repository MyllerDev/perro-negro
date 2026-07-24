import pool from "../config/database.js";

export const createCustomer =
  async (customerData) => {
    const {
      name,
      phone,
      email,
      address,
    } = customerData;

    const [result] = await pool.query(
      `
      INSERT INTO customers
      (
        name,
        phone,
        email,
        address
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        phone,
        email,
        address,
      ]
    );

    return {
      customer_id: result.insertId,
      name,
      phone,
      email,
      address,
    };
  };