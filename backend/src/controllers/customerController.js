import {
  createCustomer,
} from "../services/customerService.js";

export const createCustomerController =
  async (req, res) => {
    try {
      const customer =
        await createCustomer(req.body);

      return res.status(201).json({
        success: true,
        message:
          "Cliente creado correctamente",
        data: customer,
      });
    } catch (error) {
      console.error(
        "Error creando cliente:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "No fue posible crear el cliente",
      });
    }
  };