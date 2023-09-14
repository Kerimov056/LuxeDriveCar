import React,{useState, useEffect} from 'react'
import "./CategoryCarCard.scss";

const CategoryCarCard = (props) => {


  
  const sport = "Minivan";
  const Premium = "Premium";
  const Luxury = "Lux";
  const Business = "Business";

  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
      if (props.category.toUpperCase() === sport.toUpperCase()) {
          setImgUrl("https://content.r9cdn.net/rimg/carimages/generic/03_standard_white.png?width=108&height=72");
      } else if (props.category.toUpperCase() === Premium.toUpperCase()) {
          setImgUrl("https://content.r9cdn.net/rimg/carimages/generic/01_mini_white.png?width=108&height=72");
      } else if (props.category.toUpperCase() === Luxury.toUpperCase()) {
          setImgUrl("https://content.r9cdn.net/rimg/carimages/generic/02_economy_white.png?width=108&height=72");
      } else if (props.category.toUpperCase() === Business.toUpperCase()) {
          setImgUrl("https://content.r9cdn.net/rimg/carimages/generic/05_suv-small_white.png?width=108&height=72");
      } else {
          setImgUrl('');
      }
  }, [props.category]);


  return (
    <div className='CategoryCarCard' onClick={() => props.onChange(props.category)}>
    <div>
      <div className='CategoryCarCard_Img'>
        <img src={imgUrl} alt={props.category} />
      </div>
      <div className='CategoryCarCard_Name'>
        {props.category}
      </div>
    </div>
  </div>
  )
}

export default CategoryCarCard