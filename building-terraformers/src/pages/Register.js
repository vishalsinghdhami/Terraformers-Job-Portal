import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './registerstyle.css'
const Onboarding = () => {
 
  const [formData, setFormData] = useState({
    
      
      "firstName":"",
      "lastName":"",
      "email":"",
      "password":"",

  })

  let navigate= useNavigate()

  const  handleSubmit=async(e)=>{
      console.log("submitted")
      e.preventDefault()
      try {
        const response = await axios.post('/api/signup', formData)
        console.log(response)
        const success = response.status === 201
        if (success) navigate('/')
    } catch (err) {
        console.log(err)
    }

  }
  const handleChange=(e)=>{
      console.log('e',e)
      const value =e.target.value
      const name =e.target.name
      console.log('value'+value,'name'+name)

      setFormData((prevState) => ({
             ...prevState,
             [name]:value
      }))
  }
  
  return (
    <>
       <Navbar/>

        <div className="onboarding" style={{
        fontFamily: '-apple-system',
        fontSize: "1rem",
        fontWeight: 1.5,
        lineHeight: 1.5,
        padding: "80px",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        maxWidth:'30vw',
        marginLeft:"30vw"
      }}>
            <h2>CREATE ACCOUNT</h2>

              
                    <label  className="first_name">First Name</label>
                    <input
                        id="first_name"
                        type='text'
                        name="firstName"
                        placeholder="First Name"
                        required={true}
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label className="last_name">Last Name</label>
                    <input
                        id="last_name"
                        type='text'
                        name="lastName"
                        placeholder="Last Name"
                        required={true}
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label className="email">Email</label>
                    <input
                        id="email"
                        type='text'
                        name="email"
                        placeholder="email"
                        required={true}
                        value={formData.email}
                        onChange={handleChange}
                    />
                   <label className="password">Password</label>
                    <input
                        id="password"
                        type='password'
                        name="password"
                        placeholder="min 8 length password"
                        required={true}
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button className='btn' onClick={handleSubmit}>Submit</button>
                
            
        </div>
        <Footer/>
    </>
)
}

export default Onboarding