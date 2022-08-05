import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles'
import { DirectoryCategory} from '../directory/directory.comonent'

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem:FC<DirectoryItemProps> = ({ category }) => {
  
  const { imageUrl, title, route } = category
  const navigate = useNavigate();

  const onNavigateHandle = () => {
    navigate(route)
  }
  return (
    <DirectoryItemContainer onClick={onNavigateHandle}>
      <BackgroundImage imageUrl={imageUrl} />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;