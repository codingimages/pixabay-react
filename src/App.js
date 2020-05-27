import React, { useState, useEffect } from 'react';

// components
import Formulario from "./components/Formulario"
import ListadoImagen from './components/ListadoImagenes';


function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState("")
  const [imagenes, guardarImagenes] = useState([])
  const [alerta, setAlerta] = useState(false)
  const [paginaactual, guardarPaginaActual] = useState(1)
  const [totalpaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {

    const consultarAPI = async () => {

      if (busqueda === "") return
      const imagenesPorPagina = 30
      const key = "16677041-2aa64eb7c624795d61b0034e1"
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      resultado.hits.length === 0 ? setAlerta(true) : setAlerta(false)
      console.log(resultado.hits)
      console.log(alerta)

      // calc total paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas)

      // mover la pantalla arriba
      const jumbotron = document.querySelector(".jumbotron")
      jumbotron.scrollIntoView({ behavior: "smooth" })

    }

    consultarAPI()

  }, [busqueda, alerta, paginaactual])

  // definir pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1
    if (nuevaPaginaActual === 0) return
    guardarPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1
    if (nuevaPaginaActual > totalpaginas) return
    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        {alerta ? <><p className="bg-danger p-3 text-light">No encontramos resultados, intenta otra palabra</p> <br /></> :
          <ListadoImagen
            imagenes={imagenes}
          />}

        {(paginaactual === 1) ? null :
          (<button
            type="button"
            className="bg-transparent text-dark btn-block border-0"
            onClick={paginaAnterior}
          >&laquo; Anterior
          </button>)}

        {(paginaactual === totalpaginas) ? null :
          (<button
            type="button"
            className="bg-transparent text-dark btn-block border-0"
            onClick={paginaSiguiente}
          >Siguiente &raquo;
          </button>)}


      </div>
    </div>
  );
}

export default App;
