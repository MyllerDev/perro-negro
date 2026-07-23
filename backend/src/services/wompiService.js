const WOMPI_API_URL =
  "https://sandbox.wompi.co/v1";

export async function getWompiAcceptanceToken() {
  const publicKey =
    process.env.WOMPI_PUBLIC_KEY;

  console.log("Configuración Wompi:", {
    exists: Boolean(publicKey),
    startsWithPubTest:
      publicKey?.startsWith("pub_test_"),
    length: publicKey?.length,
    preview: publicKey
      ? `${publicKey.substring(0, 9)}...${publicKey.slice(-5)}`
      : null,
  });

  if (!publicKey) {
    throw new Error(
      "WOMPI_PUBLIC_KEY no está configurada"
    );
  }

  try {
    const response = await fetch(
      `${WOMPI_API_URL}/merchants/${publicKey}`
    );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "Respuesta completa de Wompi:",
        JSON.stringify(data, null, 2)
      );

      throw new Error(
        "Wompi rechazó la solicitud"
      );
    }

    return {
      acceptanceToken:
        data.data.presigned_acceptance
          .acceptance_token,

      personalAuthToken:
        data.data
          .presigned_personal_data_auth
          .acceptance_token,

      acceptanceUrl:
        data.data.presigned_acceptance
          .permalink,

      personalDataUrl:
        data.data
          .presigned_personal_data_auth
          .permalink,
    };
  } catch (error) {
    console.error(
      "Error conectando con Wompi:",
      error
    );

    throw error;
  }
}