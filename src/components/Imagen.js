import React from 'react'

const Imagen = ({ imagen }) => {

    // extraer las variables
    const { largeImageURL, likes, previewURL, tags, views } = imagen

    return (
        <div className="col-12 col-md-6 col-md-4 col-lg-3">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top" />
            </div>
            <div className="card-body">
                <p className="card-text">
                    {likes} Me gusta
                </p>
                <p className="card-text">
                    {views} Vistas
                </p>
            </div>
            <div className="card-footer">
                <a href={largeImageURL} target="_blank" rel="noopener noreferrer">Ver imagen</a>
            </div>
        </div>
    )
}

export default Imagen