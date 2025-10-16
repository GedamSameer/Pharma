import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type Gender = "Male" | "Female" | "Trans";
interface RegisterFromData{
    name: string,
    age: number,
    gender: Gender,
    contact: string,
    email: string,
    password: string,
    isAdmin: boolean,
    ansOfQue1: string,
    ansOfQue2: string,
    ansOfQue3: string,
}
const Register:React.FC = () => {
    const navigate = useNavigate()
    const[registerData,setRegisterData] = useState<RegisterFromData>({
        name:"",age:0,gender: "Male",contact:"",email:"",password:"",isAdmin:false,ansOfQue1:"",ansOfQue2:"",ansOfQue3:"",
    })
    const [error,setError] = useState<string>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,type,checked} = e.target;
        setRegisterData({...registerData,[name]: type==="checkbox"?checked:type==="number"?Number(value):value})
    }
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        setError("")
        try{
            const options = {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(registerData)
            }
            const response = await fetch("http://localhost:3001/auth/register",options)
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.error || "Login Failed")
            }
            alert("Registered successfully")
            navigate("/login")
        }catch(err){
            if(err instanceof Error){
                setError(err.message)
            }else{
                setError("Something went wrong")
        }
        }
    }

    return(
        <div>
            <form  onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label>Name: </label>
                <input  name="name" type="text" value={registerData.name} onChange={handleChange} /> 
                <label>Age: </label>
                <input  name="age" type="number" value={registerData.age} onChange={handleChange} />
                <div>
                <label>Gender:</label>
                
                  <label>
                    <input  type="radio" name="gender" value="Male" checked={registerData.gender === "Male"} 
                        onChange={() => setRegisterData({ ...registerData, gender: "Male" })} required />
                    Male
                  </label>
                  <label>
                    <input  type="radio" name="gender" value="Female" checked={registerData.gender === "Female"} 
                        onChange={() => setRegisterData({ ...registerData, gender: "Female" })} required />
                    Female
                  </label>
                  <label>
                    <input  type="radio" name="gender" value="Trans" checked={registerData.gender === "Trans"} 
                        onChange={() => setRegisterData({ ...registerData, gender: "Trans" })} required />
                    Trans
                  </label>
                </div>
                <label>Contact: </label>
                <input  name="contact" type="text" value={registerData.contact} onChange={handleChange}/>
                <label >Email: </label>
                <input  name="email" type="email" value={registerData.email} onChange={handleChange} />
                <label >Password: </label>
                <input  name="password" type="password" value={registerData.password} onChange={handleChange} />
                <div >
                <label >Is Admin?    </label>     
                <label><input type="radio" name="isAdmin" value="true" checked={registerData.isAdmin === true} onChange={() => setRegisterData({...registerData,isAdmin:true})} required/>Yes</label>
                <label><input  type="radio" name="isAdmin" value="false" checked={registerData.isAdmin === false} onChange={() => setRegisterData({...registerData,isAdmin:false})} required/>No</label>
                </div>
                <label >Enter your first pet name?</label>
                <input  name="ansOfQue1" type="text" value={registerData.ansOfQue1} onChange={handleChange} />
                <label >Enter your favorite food?</label>
                <input  name="ansOfQue2" type="text" value={registerData.ansOfQue2} onChange={handleChange} />
                <label >Enter your favorite city?</label>
                <input  name="ansOfQue3" type="text" value={registerData.ansOfQue3} onChange={handleChange} />
                {error && <p>{error}</p>}
                <button  type="submit">Register</button>
                <p>
                    Already have an account?{" "}
                    <Link  to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}
export default Register