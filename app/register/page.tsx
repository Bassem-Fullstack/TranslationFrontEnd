

"use client"

import api from "@/lib/api";

import { Eye, EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";



export default function RegisterPage () {


 const [username , setUsername] = useState("") 
 
 
 const [email , setEmail] = useState("") 


 const [password , setPassword] = useState("") 

 const [loading  , setLoading] = useState(false) 

 const [error , setError] = useState("")

 const [openEye , setOpenEye] = useState(false)

 const router = useRouter()

 const handleSubmit = async (e:React.FormEvent) => {
    
   e.preventDefault()

  setLoading (true)  
    

  try{
 
   await api.post("/api/users/register" , {
      
    username ,

    email ,
    
    password

   })
   
   router.push("/login") 
   

  } 

  catch (err:any) {
  
   const errorData = err.response?.data?.message || "Something Went Wrong"
   
   setError(errorData)

  }


   finally {

     setLoading(false)
   }


 }



  return (
    
    <div className="min-h-screen p-4 flex justify-center items-center">
      
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-gray-200 w-full max-w-md  shadow-xl  rounded-2xl">

    <h1 className="text-xl font-bold text-gray-800 text-center">

        Create Account

        </h1>

    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
     
    <div className="flex flex-col gap-2">
       
      <p className="text-lg  text-gray-800">Username</p>
        
      <input type="text" value={username} placeholder="Username..." onChange={(e) => setUsername(e.target.value)} 
      
      className="w-full p-2 focus:outline-gray-300 rounded-md bg-[#FFFFFF]"
      
      />

      </div>
     

 <div className="flex flex-col gap-2">
       
    <p className="text-lg text-gray-800">Email</p>
        
      <input type="email" value={email} placeholder="Email@..." onChange={(e) => setEmail(e.target.value)} 
      
      className="w-full p-2 focus:outline-gray-300 rounded-md"
      
      />

    </div>
     



<div className="flex flex-col gap-2 relative">
       
    <p className="text-lg text-gray-800">Password</p>
        
    <input type={openEye ? "text" : "password"} value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} 
      
      className="w-full p-2 focus:outline-gray-300 rounded-md"
      
      />
      

     <button type="button" className="absolute right-2 top-11" onClick={()=> setOpenEye(!openEye)} >

       {openEye ? <Eye size={20}  className="text-gray-500" /> : <EyeOff size={20} className="text-gray-500" />}

     </button>


    </div>
     


       <button type="submit" disabled={loading} className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition">
       
       {
        
        loading ? "Loading..." : "Register"

       }

       </button>

     
     <p className="text-center text-sm text-gray-600">

          Have an account?{" "}

          <a href="/login" className="text-blue-600 hover:underline">

            Login 

          </a>

        </p>


    </form>
     


    </div>


  )








}


