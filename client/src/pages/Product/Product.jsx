import React, { useState, useEffect } from 'react';
import './Product.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

const Product = () => {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState('img');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  return (
    <div className="product">
      {loading ? (
        'loading'
      ) : (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${data?.attributes?.fundedPercentage}%` }}>
              {data?.attributes?.fundedPercentage}
            </div>
          </div>

          <div className="left">
            <div className="mainImg">
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}${data?.attributes[selectedImg]?.data?.attributes?.url}`}
                alt=""
              />
            </div>
            <div className="images">
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}${data?.attributes?.img?.data?.attributes?.url}`}
                alt=""
                onClick={() => setSelectedImg('img')}
              />
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}${data?.attributes?.img2?.data?.attributes?.url}`}
                alt=""
                onClick={() => setSelectedImg('img2')}
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="info">
              <span>{data?.attributes?.description}</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>

            {/* Message from the Creator */}
            <div className="creator-message">
              <h2>Message from the Creator</h2>
              <p>{data?.attributes?.creatorMessage}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;