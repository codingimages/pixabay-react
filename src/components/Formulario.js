import React, { useState } from 'react'

const Formulario = ({ guardarBusqueda }) => {

    const [termino, guardarTermino] = useState("")
    const [error, guardarError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        // validar
        if (termino.trim() === "") {
            guardarError(true)
            return
        } else {
            guardarError(false)
        }

        // enviar termino de busqueda
        guardarBusqueda(termino)
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: fútbol o café"
                        onChange={(e) => guardarTermino(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <p className="text-danger">Debes ingresar una palabra</p> : null}
        </form>
    )
}

export default Formulario