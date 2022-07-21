import React, { useContext } from 'react'
import ProductCard from '../product-card/product-card.component';

import './shop.styles.scss'
import { ProductsContext } from '../../contexts/product.context'
const Shop = () => {

  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {
        products.map((product) => <ProductCard product={product} key={product.id} />)
      }
    </div>
  )
}

export default Shop