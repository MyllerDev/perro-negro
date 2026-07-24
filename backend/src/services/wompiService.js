const WOMPI_API_URL =
  "https://sandbox.wompi.co/v1";

export async function getWompiAcceptanceToken() {
  const publicKey =
    process.env.WOMPI_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error(
      "WOMPI_PUBLIC_KEY no está configurada"
    );
  }

  const response = await fetch(
    `${WOMPI_API_URL}/merchants/${publicKey}`
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "No fue posible obtener los tokens de aceptación"
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
  };
}