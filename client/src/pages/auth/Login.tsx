import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
interface LoginFormData {
    email: string,
    password: string
}
const Login:React.FC = () => {
    const [formData,setFormData] = useState<LoginFormData>({email:"",password:""})
    const [error,setError] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)
    
    try{
        const options = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        }
        const response = await fetch("http://localhost:3001/auth/login",options)
        const data = await response.json()
        const {token,customer} = data;
        if(!response.ok){
            throw new Error(data.error || "Login Failed")
        }
        localStorage.setItem("token",token)
        alert("Login successful")
        console.log(data)
        if(customer.isAdmin){
            navigate("/admin")
        }else{
            navigate("/homepage")
        }
    }catch(err)
    {
        if(err instanceof Error){
            setError(err.message)
        }else{
            setError("Something went wrong")
        }
    }finally{
        setLoading(false)
    }
    }
    return(
        <div>
        <form  onSubmit={submitHandler}>
            <h2> Login</h2>
            <label>Email: </label>
            <input name="email" type="email" value={formData.email} onChange={changeHandler}/>
            <label>Password: </label>
            <input name="password" type="password" value={formData.password} onChange={changeHandler}/>
            {error && <p >{error}</p>}
            <button  type="submit" disabled={loading}>{loading ? "Loggin in...":"Login"}</button>
            <div>
                <Link to="/register">Create Account</Link>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </form>
        </div>
    )
}
export default Login