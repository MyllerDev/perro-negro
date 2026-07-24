import {
  createSale,
} from "../services/saleService.js";

export const createSaleController =
  async (req, res) => {
    try {
      const sale = await createSale(
        req.body
      );

      return res.status(201).json({
        success: true,
        message:
          "Venta creada correctamente",
        data: sale,
      });
    } catch (error) {
      console.error(
        "Error creando venta:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "No fue posible crear la venta",
      });
    }
  };