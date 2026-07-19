function Footer(){

  return(
    <footer className="border-t border-white/10 mt-20">

      <div className="container mx-auto px-6 py-10 text-center">

        <h2 className="text-xl font-bold text-yellow-500">
          PERRO NEGRO
        </h2>

        <p className="text-gray-400 mt-3">
          Granizados, micheladas y experiencias únicas.
        </p>

        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Perro Negro. Todos los derechos reservados.
        </p>

      </div>

    </footer>
  )

}

export default Footer;