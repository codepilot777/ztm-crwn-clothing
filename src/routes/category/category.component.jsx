import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContext } from '../../contexts/category.context';
import './category.styles.scss'

const Category = () => {
  const { category } = useParams();
  const { categoryMap } = useContext(CategoryContext);

  const [ products, setProducts ] = useState(categoryMap[category]);
  useEffect(() => {
    setProducts(categoryMap[category])
  }, [category, categoryMap])


  return (
    <Fragment>
      <h1 className="category-title">{ category.toUpperCase() }</h1>
      <div className="category-container">
        {
          products && products.map(product => <ProductCard product={product} key={product.id} />)
        }
      </div>
    </Fragment>
  )
}

export default Category;