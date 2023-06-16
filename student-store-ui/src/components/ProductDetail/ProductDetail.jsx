import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductDetail.css";

export default function ProductDetail({ products }) {
  const { id } = useParams()
  const history = useNavigate()
  console.log(id)
  const curProduct = products.find((product) => product.id === parseInt(id));

  const handleGoBack = () => {
    history('/')
  }

  return (
    <div className="detail-content">
      {curProduct ? (
        <React.Fragment>
          <h2>{curProduct.name}</h2>
          <img src={curProduct.image} alt={curProduct.name} />
          <p>{curProduct.description}</p>
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleGoBack} className="go-back">Go Back</button>
    </div>
  )
}
