import { Navigate, useNavigate } from 'react-router-dom'

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles.jsx'

const DirectoryItem = ({ category }) => {
  
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