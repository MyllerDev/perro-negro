import {
  getWompiAcceptanceToken,
} from "../services/wompiService.js";

import {
  createWompiTransaction,
} from "../services/paymentService.js";

export async function getPaymentConfig(
  req,
  res
) {
  try {
    const config =
      await getWompiAcceptanceToken();

    res.json({
      success: true,

      data: {
        publicKey:
          process.env.WOMPI_PUBLIC_KEY,

        ...config,
      },
    });
  } catch (error) {
    console.error(
      "Error obteniendo configuración de pago:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "No fue posible obtener la configuración de pago",
    });
  }
}

export async function createPayment(
  req,
  res
) {
  try {
    const {
      amountInCents,
      reference,
      customerEmail,
      acceptanceToken,
      personalAuthToken,
      paymentMethod,
    } = req.body;

    if (
      !amountInCents ||
      !reference ||
      !customerEmail ||
      !acceptanceToken ||
      !personalAuthToken ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Faltan datos requeridos para crear el pago",
      });
    }

    const transaction =
      await createWompiTransaction({
        amountInCents,
        reference,
        customerEmail,
        acceptanceToken,
        personalAuthToken,
        paymentMethod,
      });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(
      "Error creando pago:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "No fue posible crear el pago",
    });
  }
}