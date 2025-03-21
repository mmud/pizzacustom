import React, { useEffect, useState } from 'react'
import Pizza from './Pizza'

export default function CartItem(props) {
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

    
    const increment = () =>{
        if(ctn==20)return;
        setctn(ctn + 1);
    }
    const decrement = () =>{
        if(ctn==1)return; 
        setctn(ctn - 1);
    }
    const [first, setfirst] = useState(1)
    useEffect(() => {
        if(first)
        {   
            setfirst(0);
            return;
        }
      props.updatefun(props.Data._id,ctn);
    }, [ctn])
    
  return (
    <div className='orderdiv container'>
        <div className="cart-item">
            <Pizza selected={props.Data.Pizza.Ings}/>
            <div className="cart-details commands">
                <p style={{marginLeft:"20px"}}>Price: {price}</p>
                <p style={{marginLeft:"20px"}}>Quantity: 
                    <div className="counter-container" style={{marginLeft:"-20px"}}>
                        <button className="counter-button" onClick={decrement}>
                            -
                        </button>
                        {ctn}
                        <button className="counter-button" onClick={increment}>
                            +
                        </button>
                    </div>
                </p>
                <button onClick={()=>props.deletefun(props.Data._id)}>Remove</button>
            </div>
        </div>
    </div>
  )
}
