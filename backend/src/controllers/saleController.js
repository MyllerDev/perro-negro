import {
  createSale,
} from "../services/saleService.js";

import {
  updateSaleStatus,
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

  export async function updateSaleStatusController(
  req,
  res
) {
  try {
    const {
      saleId,
      status,
    } = req.body;

    if (
      !saleId ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El ID de la venta y el estado son obligatorios",
      });
    }

    const allowedStatuses = [
      "PENDING",
      "PAID",
      "DECLINED",
      "ERROR",
      "CANCELLED",
    ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Estado de venta no válido",
      });
    }

    const sale =
      await updateSaleStatus(
        saleId,
        status
      );

    res.json({
      success: true,
      data: sale,
    });
  } catch (error) {
    console.error(
      "Error actualizando estado de venta:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "No fue posible actualizar la venta",
    });
  }
}