import React, { useState, useEffect } from 'react';
import './Product.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';
import moment from 'moment';

const Product = () => {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState('img');
  const [quantity, setQuantity] = useState(1);
  const [displaytimer, setDisplayTimer] = useState(false);
  const [displaytimerends, setDisplayTimerEnds] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
// console.log("data",data);
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [percentage, setPercentage] = useState(false);

  useEffect(() => {
    isDateGreater()
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  
  
  const isDateGreater =  async() => {
    const currentDate = new Date();
    const comparisonDate = data?.attributes?.startDate ? new Date(data?.attributes.startDate) : null;
    const endDate = data?.attributes?.endDate ? new Date(data?.attributes.endDate) : null;
    if(endDate < currentDate){
      setDisplayTimer(false)
      setDisplayTimerEnds(true);
    } else {
      setDisplayTimerEnds(false);
      if(comparisonDate < currentDate){
        setDisplayTimer(true)
      } else {
        setDisplayTimer(false)
      }

    }
  };

  

  function calculateTimeLeft() {
    const originalDate = data?.attributes?.endDate;
    const difference = +new Date(originalDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  function formatDate(dateString) {
    const dateParts = dateString.split('/');
    const year = dateParts[2];
    const month = String(parseInt(dateParts[1], 10)).padStart(2, '0');
    const day = String(parseInt(dateParts[0], 10)).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span className='time_main_text' key={interval}>
        {timeLeft[interval]<10?'0':''}{timeLeft[interval]}<span className='small_ttt'>{interval}</span> {interval!=='s'?' : ':''}
      </span>
    );
  });


  const percentageval = () => {
    var final =  0;
    const  minval = data?.attributes?.MinFundedquantity==null?0:data?.attributes?.MinFundedquantity;
    const total_order = data?.attributes?.total_funded==null?0:data?.attributes?.total_funded;
    if(total_order != null && minval != null){
      var final = (total_order / minval) * 100;
    }
    // if(final>100){
    //   final = 100;
    // }
    return final
  }

  function formatDate(dateString) {
    const formattedDate = moment(dateString).format('YYYY-MM-DD hh:mm A');
    return formattedDate;
  }

  return (
    <div className="" style={{flexDirection:"column"}}>
      {loading ? (
        'loading'
      ) : (
        <>
          {/* Countdown Timer */}
          

          {/* Progress Bar */}
          {/* <div className="progress-bar">
            <div className="progress" style={{ width: `${data?.attributes?.fundedPercentage}%` }}>
              {data?.attributes?.fundedPercentage}
            </div>
          </div> */}

          {
           displaytimer ?
          
          <div className='center_timer' style={{flexDirection:"column", marginBottom:'20px'}}>
            <div style={{marginBottom:'5px', fontSize:"14px"}}><b>Available for a limited time only!</b></div>
            {
              timerComponents.length>0 ?
              <div className="countdown-timer">
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
              </div>
              :
              <div className='loading_color_text'>Loading Countdown....</div>
            }
          </div>
          :
          
            displaytimerends ?
            <div className='center_timer starttimer'>
              Campaign has ended
            </div>
            :
            <div className='center_timer starttimer'>
              This campaign will start on {(formatDate(data?.attributes?.startDate))}
            </div>
          }
          
          <div className='product'>
            <div className="left">
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
              <div className="mainImg">
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}${data?.attributes[selectedImg]?.data?.attributes?.url}`}
                  alt=""
                />
              </div>
            </div>
            <div className="right">
              <h1>{data?.attributes?.title}</h1>


              <div className='crowd_div'>
                <div class="meter">
                  <span style={{width: (percentageval()>100?100:percentageval())+"%"}}></span>
                </div>
                <div className='count_funding'>
                  <div className='sold_total'>{data?.attributes?.total_funded==null?0:data?.attributes?.total_funded} sold</div>
                  <div className={`percent_total ${percentageval()>=100?'greenfunded':''}`}>{percentageval()}% Funded</div>
                </div>
              </div>

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
              {
                // (displaytimer && percentageval() < 100) &&
              (displaytimer) &&
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
              }
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

          </div>

          
        </>
      )}
    </div>
  );
};

export default Product;