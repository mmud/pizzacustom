import React, { useEffect, useState } from 'react'
import Pizza from './Pizza'

export default function OrderItem(props) {
    const [price, setprice] = useState(10)
    const [selected, setselected] = useState(props.Data.Pizza.Ings);
    const [ctn, setctn] = useState(props.Data.Count);

    useEffect(() => {
        let counter=10;
        selected.forEach(element => {
            counter+=Number(element.Price);
        });
        setprice(counter*ctn);

    }, [selected,ctn]);

   
    
  return (
    <div className='orderdiv container'>
        <div className="cart-item">
            <Pizza selected={props.Data.Pizza.Ings}/>
            <div className="cart-details commands">
                <p style={{marginLeft:"20px"}}>Price: {price}</p>
                <p style={{marginLeft:"20px"}}>Quantity: {ctn}</p>
            </div>
        </div>
    </div>
  )
}
