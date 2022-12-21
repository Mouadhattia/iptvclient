import React, {useState} from 'react';
import "./SingleProduct.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { formatPrice } from '../../utils/helpers';
import { addorder } from '../../store/orderSlice';
import { setAuth } from '../../store/authSlice';
import Noti from '../../utils/Noti';


const SingleProduct = () => {
  const { data:current } =useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { data: product } = useSelector(state => state.modal);
  const {backMessage} =useSelector((state) => state.order);
  const [error, setError] = React.useState(false);
  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    })
 
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if(newQty < 1){
        newQty = 1;
      }
      return newQty;
    })
    setError(false)
  }

  const addToCartHandler = (e,product) => {
    e.preventDefault()
    let order = {
      totalPrice :qty * product.newPrice,
      qt:qty,
      productName: product.productName,
      userName :current.userName,
      price :product.price

    }
    dispatch(addorder(order)).then(()=>{
      dispatch(setIsModalVisible(false));
      dispatch(setAuth({...current,balance:current.balance-qty * product.newPrice}))
      setError(false)
    }).catch(()=>setError(true))
   
    
  };

  const modalOverlayHandler = (e) => {
    if(e.target.classList.contains('overlay-bg')){
      dispatch(setIsModalVisible(false));
    }
  }

  return (
    <div className='overlay-bg' onClick = {modalOverlayHandler}>
        <Noti
        severity="error"
        notification={error}
        setNotification={setError}
        message={backMessage}
        time={2000}
      />
      <div className = "product-details-modal bg-white">
        <button type = "button" className='modal-close-btn flex flex-center fs-14' onClick={() => {dispatch(setIsModalVisible(false));setError(false)}}>
          <i className = "fas fa-times"></i>
        </button>
        <div className = "details-content grid">
          {/* details left */}
          <div className = "details-right">
            <div className = "details-img">
              <img src = {product.img} alt = {product.productName} />
            </div>
          </div>
          {/* detials right */}
          <div className='details-left'>
            <div className = "details-info">
              <h3 className = "title text-regal-blue fs-22 fw-5">{product.productName}</h3>
              <p className='description text-pine-green'>{""}</p>
              <div className='price fw-7 fs-24'>Price: {formatPrice(product.newPrice)}</div>
              <div className = "qty flex">
                <span className = "text-light-blue qty-text">Qty: </span>
                <div className = "qty-change flex">
                  <button type = "button" className='qty-dec fs-14' onClick={() => decreaseQty()}>
                    <i className = "fas fa-minus text-light-blue"></i>
                  </button>
                  <span className = "qty-value flex flex-center">{qty}</span>
                  <button type = "button" className='qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                    <i className = "fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button type = "button" className='btn-primary add-to-cart-btn' onClick={(e) => addToCartHandler(e,product)}>
                  <span className = "btn-icon">
                    <i className='fas fa-cart-shopping'></i>
                  </span>
                  <span className = 'btn-text'>Acheter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct