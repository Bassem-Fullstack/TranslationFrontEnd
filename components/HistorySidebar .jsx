


"use client"

import api from "@/lib/api";

import { useState } from "react"

import { History, X, Trash2 } from "lucide-react";

import { useTypewriter , Cursor } from "react-simple-typewriter";

export default function HistorySidebar () {


const [isOpen , setIsOpen] = useState(false) 


const [translations , setTranslations] = useState([])


const [loading , setLoading] = useState(false)


const [text] = useTypewriter({

words : ["Loading ... "] ,

delaySpeed : 30 ,

deleteSpeed : 30 ,

loop : true 

})


const getTranslations = async () => {

setLoading(true) 


try{

const res = await api.get("/api/translation")

setTranslations(res.data.getTransaltion) // باك اند الرد بعتوة لفروند اند

}

catch(err){

 console.log(err)

}


finally{

  setLoading(false)  

}


}


const handleOpen = () => {


setIsOpen(true) 

getTranslations ()

}



const handleDeletTranslation = async(id)=> {

setLoading(true) 

try{

const res = await api.delete(`/api/translation/${id}`)


setTranslations((prev)=> prev.filter((t) => t._id !==id)) // بنحدث مصفوفة عندنا ونحذف الايدي من مصفوفة في حالة لو مستخدم حذف ترجمة دي

}

catch(err) {

console.log(err)

}

finally{

 setLoading(false) 

}


}




return (

<>

<button onClick={handleOpen} className="absolute top-4 left-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition " >
 
 <History className="w-5 h-5"/>

</button>


{// ايز اوبين بقت بترو دلوقتي فاصبح سلايز مغطي صفحة كلها طبقة شفافية عشان يشوف ترجماتة اللى ترجمها وبعدها بنرجعها لقيمتها فولس

    isOpen && ( 

     <div className="fixed inset-0 bg-black/30 z-40" onClick={()=> setIsOpen(false)}> 


     </div>

    )

}



{/* spider */}

<div className={`fixed top-0 w-80 rounded-md right-0 h-full bg-gray-50 shadow-lg z-50 transform transition-transform duration-300
    
    ${isOpen ? "translate-x-0" : "translate-x-full" }`}>
 

<div className="flex justify-between items-center p-6 gap-5">

<h2 className="text-lg font-bold">My Translations</h2>

<button onClick={()=> setIsOpen(false)}>

<X className="w-5 h-5 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"/>
    
</button>

</div>



<div className="overflow-y-auto h-[calc(100%-64px)] p-4 flex flex-col gap-3">


{loading && <p className="text-gray-500 text-sm">{text}<Cursor/></p>}

 {!loading && translations.length === 0 && (

 <p className="text-gray-500 text-sm">No translations yet.</p>

 )}



{

 translations.map((t)=> (

  <div key={t._id} className="border rounded-md p-3 relative bg-gray-50">

  <p className="text-xs text-gray-400 mb-1">{t.sourceLanguage} {t.targetLanguage} </p>

  <p className="text-sm text-gray-800">{t.sourceText}</p>

  <p className="text-sm text-gray-600 mt-1">{t.translatedText}</p>
  
  <button onClick={()=> handleDeletTranslation(t._id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
 
 <Trash2 className="w-4 h-4"/>

  </button>

  </div>
   
 ))

}



</div>


</div>

</>

)



}














