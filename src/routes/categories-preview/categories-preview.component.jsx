import React, { Fragment, useContext } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component'

import { CategoryContext } from '../../contexts/category.context'
const CategoriesPreview = () => {

  const { categoryMap } = useContext(CategoryContext);

  return (
    <Fragment>
      {
        Object.keys(categoryMap).map(title => {
          const products = categoryMap[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </Fragment>
  )
}

export default CategoriesPreview