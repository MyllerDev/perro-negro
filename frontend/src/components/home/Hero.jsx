import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import { business } from "../../constants/business";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.14),transparent_25%),linear-gradient(135deg,#0b0b0b_0%,#151515_50%,#0b0b0b_100%)]" />

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-700/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#d4af37]"
            >
              <Sparkles size={16} />

              Una experiencia diferente
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-black tracking-tight sm:text-7xl md:text-8xl"
            >
              PERRO{" "}
              <span className="bg-gradient-to-r from-[#f5d76e] via-[#d4af37] to-[#9f7c16] bg-clip-text text-transparent">
                NEGRO
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl lg:mx-0"
            >
              {business.slogan}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link to="/productos">
                <Button className="group flex w-full items-center justify-center gap-2 sm:w-auto">
                  Ver productos

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>

              <a href="#hot-sale">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Ver promociones
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/30 bg-white/5 p-3 shadow-2xl">
              <img
                src={business.granizadoImage}
                alt="Granizado Perro Negro"
                className="aspect-square w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;