import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
ArrowLeft,
CreditCard,
User,
} from "lucide-react";

import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useCart } from "../../context/CartContext";

import {
createCustomer,
createSale,
} from "../../services/api";

function Checkout() {
const navigate = useNavigate();

const {
cartItems,
total,
} = useCart();

const [formData, setFormData] = useState({
name: "",
phone: "",
email: "",
address: "",
notes: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (event) => {
const { name, value } = event.target;


setFormData((currentData) => ({
  ...currentData,
  [name]: value,
}));


};

const handleSubmit = async (event) => {
event.preventDefault();


setLoading(true);
setError("");

try {
  const customerResponse = await createCustomer({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
  });

  const customerId =
    customerResponse.data.customer_id;

  const products = cartItems.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  const saleResponse = await createSale({
    customer_id: customerId,
    payment_method: "PENDING",
    products,
  });

  const saleId =
    saleResponse.data.sale_id;

  navigate("/pago", {
    state: {
      saleId,
      total,
      customer: formData,
    },
  });
} catch (error) {
  console.error(
    "Error procesando checkout:",
    error
  );

  setError(
    error.response?.data?.message ||
      error.message ||
      "No fue posible procesar la compra"
  );
} finally {
  setLoading(false);
}


};

if (cartItems.length === 0) {
return ( <Container className="py-32"> <div className="mx-auto max-w-xl text-center"> <h1 className="text-4xl font-bold">
Tu carrito está vacío </h1>


      <p className="mt-4 text-gray-400">
        Agrega productos antes de continuar
        con la compra.
      </p>

      <Link to="/productos">
        <Button className="mt-8">
          Ver productos
        </Button>
      </Link>
    </div>
  </Container>
);

}

return ( <Container className="py-20"> <Link
     to="/carrito"
     className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-[#d4af37]"
   > <ArrowLeft size={18} />
Volver al carrito </Link>

  <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <User className="text-[#d4af37]" />

        <div>
          <h1 className="text-3xl font-bold">
            Datos de compra
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            No necesitas registrarte para comprar.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Nombre completo"
          name="name"
          placeholder="Ej: Juan Pérez"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Número de teléfono"
          name="phone"
          type="tel"
          placeholder="Ej: 300 000 0000"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="Ej: cliente@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Dirección"
          name="address"
          placeholder="Dirección de entrega"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">
            Notas adicionales
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Información adicional para tu pedido..."
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-[#d4af37]"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2"
        >
          <CreditCard size={18} />

          {loading
            ? "Creando pedido..."
            : "Continuar al pago"}
        </Button>
      </form>
    </div>

    <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-2xl font-bold">
        Resumen del pedido
      </h2>

      <div className="mt-6 space-y-4">
        {cartItems.map((item) => {
          const price = item.discount
            ? item.price -
              (item.price * item.discount) / 100
            : item.price;

          return (
            <div
              key={item.id}
              className="flex justify-between gap-4"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <span className="font-medium text-[#d4af37]">
                $
                {(
                  price * item.quantity
                ).toLocaleString("es-CO")}
              </span>
            </div>
          );
        })}
      </div>

      <div className="my-6 border-t border-white/10" />

      <div className="flex items-center justify-between">
        <span className="text-gray-400">
          Total
        </span>

        <span className="text-2xl font-bold text-[#d4af37]">
          $
          {total.toLocaleString("es-CO")}
        </span>
      </div>
    </div>
  </div>
</Container>

);
}

export default Checkout;
