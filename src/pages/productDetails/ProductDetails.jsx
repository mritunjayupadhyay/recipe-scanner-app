import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import './productDetails.scss';
import LoadingOne from '../../components/loading/LoadingOne';
import { navigationRouter } from '../../helpers/navigation-router';


function ProductDetails() {
  const { recipeId } = useParams();
  const [errorLogs, setErrorLog] = useState([]);
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
          setLoading(false);
          // const errorText = 'success_' + JSON.stringify(data);
          // setErrorLog([...errorLogs, errorText]);
        } else {
          setLoading(false);
          console.log("from api", data);
          navigationRouter.navigate(`not-found`);
          // const errorText = 'fail_' + JSON.stringify(data);
          // setErrorLog([...errorLogs, errorText]);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        // const errorText = 'error_' + JSON.stringify(err);
        // setErrorLog([...errorLogs, errorText]);
        navigationRouter.navigate(`not-found`);
      });
  }, []);
  const handleClose = () => {
    navigationRouter.navigate(`/`);
  }
  return (
    <div className='RecipePage'>
      <div className='closeButtonContainer'>
        <button className='closeButton' onClick={() => handleClose()}>
          <MdClose size={15} style={{ color: '#fff'}} />
        </button>
      </div>
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
              {/* <div style={{ paddingTop: 100 }}></div>
              <ul className='ingredientList'>
              {errorLogs.map((errorText, i) =>
                                <li 
                                className='ingredientListItem' 
                                key={i}
                                >{errorText}
                                </li>
                            )}
              </ul> */}
          </div>
      }
      </div>
  )
}

export default ProductDetails