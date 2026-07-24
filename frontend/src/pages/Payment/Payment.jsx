import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import {
  getPaymentConfig,
  createPayment,
} from "../../services/api";

function Payment() {
  const location = useLocation();

  const {
    saleId,
    total,
    customer,
  } = location.state || {};

  const [
    paymentConfig,
    setPaymentConfig,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadPaymentConfig =
      async () => {
        try {
          const response =
            await getPaymentConfig();

          setPaymentConfig(
            response.data
          );
        } catch (error) {
          console.error(error);

          setError(
            "No fue posible cargar la configuración de pago."
          );
        } finally {
          setLoading(false);
        }
      };

    loadPaymentConfig();
  }, []);

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError("");

      if (!saleId || !total || !customer) {
        throw new Error(
          "Información de compra incompleta"
        );
      }

      const reference =
        `PEDIDO-${saleId}-${Date.now()}`;

      const amountInCents =
        Math.round(total * 100);

      const response =
        await createPayment({
          amountInCents,

          reference,

          customerEmail:
            customer.email,

          acceptanceToken:
            paymentConfig.acceptanceToken,

          personalAuthToken:
            paymentConfig.personalAuthToken,

          paymentMethod: {
            type: "NEQUI",

            phone_number:
              customer.phone,
          },
        });

      console.log(
        "Transacción creada:",
        response
      );

      alert(
        "Transacción creada correctamente"
      );
    } catch (error) {
      console.error(
        "Error procesando pago:",
        error
      );

      setError(
        error.message ||
          "No fue posible procesar el pago"
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CreditCard
            size={64}
            className="mx-auto text-[#d4af37]"
          />

          <h1 className="mt-8 text-4xl font-bold">
            Pago seguro
          </h1>

          <p className="mt-4 text-gray-400">
            Completa tu pago de forma segura.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-center gap-3 text-green-400">
            <ShieldCheck size={22} />

            <span>
              Conexión segura con Wompi
            </span>
          </div>

          {loading ? (
            <p className="mt-8 text-center text-gray-400">
              Cargando configuración de pago...
            </p>
          ) : (
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="mt-8 w-full"
            >
              {processing
                ? "Procesando pago..."
                : "Pagar con Nequi"}
            </Button>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button>
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Payment;