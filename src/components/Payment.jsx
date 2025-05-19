import { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios';

const Makepayment = () => {
    //We Receive the product in Makepayment
    //We use useLocation to receive the product
    //if it doesnt exists
    //{}incase the product doesnt exist,it prevents an error
    //state carries the retrieved info
    const {product} = useLocation().state || {};
    //console.log("Res: "+product.product_name)
    //Hooks to Hold Phone Number and success Message

    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState("")
       //Create a submit Function
         //Create a submit Function
    const submit = async(e) =>{
        e.preventDefault(); // prebent default JS actions
     //Update loading Hook with a message
     setLoading("Please wait as we Processs!");

      // Put updated hooks in data variable
      const data = new FormData();
      data.append("phone", phone);
      // Direcly parse the amount from product variable.
      // We use product.product_cost
      data.append("amount", product.product_cost);

      //post your data to your Payment Backend API
      const response = await axios.post(
        "https://sokotrial.pythonanywhere.com/api/mpesa_payment",
        data
      );
      //Update message Hook with a new message
      setLoading("Please Complete Payment on Your Phone")
    }
    const img_url='https://sokotrial.pythonanywhere.com/static/images/'
   
  return (
    <div className='row justify-content-center mt-4'>
        <div className='card shadow p-4 col-md-6'>
            <Link to='/'>Home Page</Link>
            <br />
            <h1>LIPA NA MPESA</h1>
            {/* Bind product name and Cost */}
            <img src= {img_url+ product.product_photo}alt="" className="product_img" />
            <p className='text-muted'>Product NAME:{product.product_name}</p>  
            <p className='text-warning'>Product Cost: {product.product_cost}</p>
     
            {/* Create a Form to request user phone Number */}
            <form onSubmit={submit}>
                {loading}
                  <input
                     type="text"
                     placeholder='Enter Phone No 254 ***********'
                     value={phone}
                     className='form-control'
                     onChange={(e)=>setPhone(e.target.value)}/> <br /><br />
                    <button className='btn btn-dark w-100'>
                       Make Payment
                    </button>
            </form>
        </div>
    </div>
  )
}

export default Makepayment
