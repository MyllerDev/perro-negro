import crypto from "crypto";

const WOMPI_API_URL =
  "https://sandbox.wompi.co/v1";

export async function createWompiTransaction({
  amountInCents,
  reference,
  customerEmail,
  acceptanceToken,
  personalAuthToken,
  paymentMethod,
}) {
  const privateKey =
    process.env.WOMPI_PRIVATE_KEY;

  const integritySecret =
    process.env.WOMPI_INTEGRITY_SECRET;

  if (!privateKey) {
    throw new Error(
      "WOMPI_PRIVATE_KEY no está configurada"
    );
  }

  if (!integritySecret) {
    throw new Error(
      "WOMPI_INTEGRITY_SECRET no está configurada"
    );
  }

  const signatureString =
    `${reference}${amountInCents}COP${integritySecret}`;

  const signature =
    crypto
      .createHash("sha256")
      .update(signatureString)
      .digest("hex");

  const response = await fetch(
    `${WOMPI_API_URL}/transactions`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${privateKey}`,
      },

      body: JSON.stringify({
        amount_in_cents:
          amountInCents,

        currency: "COP",

        customer_email:
          customerEmail,

        reference,

        acceptance_token:
          acceptanceToken,

        accept_personal_auth:
          personalAuthToken,

        signature,

        payment_method:
          paymentMethod,
      }),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Error creando transacción Wompi:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    throw new Error(
      data.error?.reason ||
        "No fue posible crear la transacción"
    );
  }

  return data;
}

export async function getWompiTransaction(
  transactionId
) {
  const publicKey =
    process.env.WOMPI_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error(
      "WOMPI_PUBLIC_KEY no está configurada"
    );
  }

  const response = await fetch(
    `${WOMPI_API_URL}/transactions/${transactionId}`,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${publicKey}`,
      },
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Error consultando transacción Wompi:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    throw new Error(
      data.error?.reason ||
        "No fue posible consultar la transacción"
    );
  }

  return data;
}