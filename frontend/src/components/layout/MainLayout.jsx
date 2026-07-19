import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../common/WhatsAppButton";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.05),transparent_25%),radial-gradient(circle_at_80%_60%,rgba(255,120,40,0.04),transparent_25%)]" />

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      <WhatsAppButton />

      <Footer />
    </div>
  );
}

export default MainLayout;