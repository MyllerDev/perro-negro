import {
  getWompiAcceptanceToken,
} from "../services/wompiService.js";

export async function getPaymentConfig(
  request,
  response
) {
  try {
    const {
      acceptanceToken,
      personalAuthToken,
    } = await getWompiAcceptanceToken();

    return response.json({
      success: true,
      data: {
        publicKey:
          process.env.WOMPI_PUBLIC_KEY,

        acceptanceToken,
        personalAuthToken,
      },
    });
  } catch (error) {
    console.error(
      "Error obteniendo configuración de pago:",
      error
    );

    return response.status(500).json({
      success: false,
      message:
        "No fue posible obtener la configuración de pago",
    });
  }
}