import CategoryItem from "../category-item/category-item.component"
import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
    {
      categories.map((caterory) => (
        <CategoryItem category={caterory} key={caterory.id}/>
      ))
    }      
  </div>
  )
}

export default Directory