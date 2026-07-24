import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import {
  getPaymentConfig,
  createPayment,
  getPaymentStatus,
  updateSaleStatus,
} from "../../services/api";

function Payment() {
  const location = useLocation();

  const { saleId, total, customer } = location.state || {};

  const [paymentConfig, setPaymentConfig] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [transactionId, setTransactionId] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadPaymentConfig = async () => {
      try {
        const response = await getPaymentConfig();

        setPaymentConfig(response.data);
      } catch (error) {
        console.error("Error cargando configuración:", error);

        setError("No fue posible cargar la configuración de pago.");
      } finally {
        setLoading(false);
      }
    };

    loadPaymentConfig();
  }, []);

  useEffect(() => {
    if (!transactionId) {
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await getPaymentStatus(transactionId);

        const transaction = response.data.data;

        const status = transaction.status;

        console.log("Estado de la transacción:", status);

        setPaymentStatus(status);
        if (
          status === "APPROVED" ||
          status === "DECLINED" ||
          status === "ERROR" ||
          status === "VOIDED"
        ) {
          setProcessing(false);

          let saleStatus = "ERROR";

          if (status === "APPROVED") {
            saleStatus = "PAID";
          }

          if (status === "DECLINED") {
            saleStatus = "DECLINED";
          }

          if (status === "VOIDED") {
            saleStatus = "CANCELLED";
          }

          try {
            await updateSaleStatus(saleId, saleStatus);

            console.log("Venta actualizada:", saleStatus);
          } catch (error) {
            console.error("Error actualizando venta:", error);
          }
        }
      } catch (error) {
        console.error("Error consultando estado:", error);
      }
    };

    checkPaymentStatus();

    const interval = setInterval(checkPaymentStatus, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [transactionId]);

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError("");
      setPaymentStatus(null);

      if (!saleId || !total || !customer) {
        throw new Error("Información de compra incompleta");
      }

      if (!paymentConfig) {
        throw new Error("La configuración de pago no está disponible");
      }

      const reference = `PEDIDO-${saleId}-${Date.now()}`;

      const amountInCents = Math.round(total * 100);

      const response = await createPayment({
        amountInCents,

        reference,

        customerEmail: customer.email,

        acceptanceToken: paymentConfig.acceptanceToken,

        personalAuthToken: paymentConfig.personalAuthToken,

        paymentMethod: {
          type: "NEQUI",

          phone_number: customer.phone,
        },
      });

      console.log("Transacción creada:", response);

      const transaction = response.data;

      const newTransactionId = transaction.id;

      if (!newTransactionId) {
        throw new Error("Wompi no devolvió el ID de la transacción");
      }

      setTransactionId(newTransactionId);

      setPaymentStatus(transaction.status);
    } catch (error) {
      console.error("Error procesando pago:", error);

      setError(error.message || "No fue posible procesar el pago");

      setProcessing(false);
    }
  };

  const renderPaymentStatus = () => {
    if (paymentStatus === "APPROVED") {
      return (
        <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-6 text-center text-green-400">
          <CheckCircle size={48} className="mx-auto mb-4" />

          <h2 className="text-xl font-bold">Pago aprobado</h2>

          <p className="mt-2 text-sm">Tu pago fue procesado correctamente.</p>
        </div>
      );
    }

    if (paymentStatus === "DECLINED") {
      return (
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          <XCircle size={48} className="mx-auto mb-4" />

          <h2 className="text-xl font-bold">Pago rechazado</h2>

          <p className="mt-2 text-sm">La transacción fue rechazada.</p>
        </div>
      );
    }

    if (paymentStatus === "ERROR" || paymentStatus === "VOIDED") {
      return (
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          <XCircle size={48} className="mx-auto mb-4" />

          <h2 className="text-xl font-bold">Error en el pago</h2>

          <p className="mt-2 text-sm">
            No fue posible completar la transacción.
          </p>
        </div>
      );
    }

    if (paymentStatus === "PENDING") {
      return (
        <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-center text-yellow-400">
          <Clock size={48} className="mx-auto mb-4" />

          <h2 className="text-xl font-bold">Pago pendiente</h2>

          <p className="mt-2 text-sm">
            Estamos esperando la confirmación de tu pago.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Container className="py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CreditCard size={64} className="mx-auto text-[#d4af37]" />

          <h1 className="mt-8 text-4xl font-bold">Pago seguro</h1>

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

            <span>Conexión segura con Wompi</span>
          </div>

          {loading ? (
            <p className="mt-8 text-center text-gray-400">
              Cargando configuración de pago...
            </p>
          ) : (
            <>
              {!transactionId && (
                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="mt-8 w-full"
                >
                  {processing ? "Procesando pago..." : "Pagar con Nequi"}
                </Button>
              )}

              {transactionId && (
                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>ID de transacción:</p>

                  <p className="mt-2 break-all text-xs">{transactionId}</p>
                </div>
              )}

              {renderPaymentStatus()}
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Payment;
