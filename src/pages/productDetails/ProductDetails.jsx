import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productDetails.scss';
import LoadingOne from '../../components/loading/LoadingOne';
import { navigationRouter } from '../../helpers/navigation-router';


function ProductDetails() {
  const { recipeId } = useParams();
  console.log("what is recipe di", recipeId);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState('')
  const [pic, setPic] = useState('');
  const [noVeg, setNonVeg] = useState(false);
  const [des, setDes] = useState('');
  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/recipe/${recipeId}`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        const { error, data } = res;
        if (res && res?.error === false) {
          const { name, recipePic, ingredients, description, nonVeg } = data;
          setNonVeg(nonVeg)
          setDes(description);
          setIngredients(ingredients);
          setRecipeName(name);
          setPic(recipePic);
          setLoading(false)
        } else {
          navigationRouter.navigate(`not-found`);
          console.log("from api", data);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        navigationRouter.navigate(`not-found`);
      });
  }, []);
  return (
    <div className='RecipePage'>
      {
        loading
          ? <LoadingOne />
          : <div className='recipe-container'>
              <div className="imagePart">
                <img src={`${process.env.REACT_APP_S3_URL_PREFIX}/${pic}`} alt="" />
              </div>
              <div className="productNameHeading">
                <h1 className='productName'>{recipeName}</h1>
                <div className='non-veg-indicator-container'>
                  <div className={`non-veg-indicator-box ${noVeg ? 'nonVeg' : 'veg'}`}>
                    <div className={`non-veg-indicator-circle ${noVeg ? 'nonVeg' : 'veg'}`}></div>
                  </div>
                  <span className='non-veg-indicator-text'>{noVeg ? 'nonVeg' : 'veg'}</span>
                </div>
              </div>
              <h2 className='ingredientHeading'>Ingredients</h2>
              <ul className='ingredientList'>
              {ingredients.map(ingredient =>
                                <li 
                                className='ingredientListItem' 
                                key={ingredient.id}
                                >{ingredient.amount + ' ' + ingredient.name}
                                </li>
                            )}
              </ul>
          </div>
      }
      </div>
  )
}

export default ProductDetails