//npm i react-icons

import { Recipe } from '../types'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface Props {
  recipe: Recipe;
  isFavourite: boolean;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}


const RecipeCard = ({recipe, onClick, onFavouriteButtonClick, isFavourite}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <div className="recipe-card-title">
        <span onClick={(event)=> {
          event.stopPropagation()
          onFavouriteButtonClick(recipe)
        }}>
          {isFavourite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25}/>}
          
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;