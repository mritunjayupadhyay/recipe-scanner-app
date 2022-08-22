import React from 'react';
import { notFoundEgg } from '../../constants/images.js';
import { navigationRouter } from '../../helpers/navigation-router.js';
import './notFound.scss';

function NotFound() {
  const handleClose = () => {
    navigationRouter.navigate(`/`);
  }
  return (
    <div className='NotFoundPage'>
      <div className="image-part">
        <img src={notFoundEgg} alt="" />
      </div>
      <div className="description-part">
        <div className='description-text'>
        <h1>oops!</h1>
        <h6>Item not found or wrong</h6>
        <h6>qr code scanned</h6>
        </div>
        <div className="buttonContainer">
          <button onClick={() => handleClose()}>Scan again</button>
        </div>
      </div>
    </div>
  )
}

export default NotFound