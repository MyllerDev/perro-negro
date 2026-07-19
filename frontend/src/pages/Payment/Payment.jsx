import { Link } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

function Payment() {
  return (
    <Container className="py-32">
      <div className="mx-auto max-w-2xl text-center">
        <CreditCard
          size={64}
          className="mx-auto text-[#d4af37]"
        />

        <h1 className="mt-8 text-4xl font-bold">
          Pago seguro
        </h1>

        <p className="mt-4 text-gray-400">
          Aquí conectaremos la pasarela de pago del negocio.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-center gap-3 text-green-400">
            <ShieldCheck size={22} />

            <span>
              Conexión segura
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            El pago será validado directamente con la pasarela
            y el resultado se mostrará al cliente.
          </p>
        </div>

        <Link to="/">
          <Button className="mt-8">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Payment;