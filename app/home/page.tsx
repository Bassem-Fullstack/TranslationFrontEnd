



"use client"

import api, { setAccessToken } from "@/lib/api"

import {Mic} from "lucide-react"

import { useRouter } from "next/navigation"


import { useState } from "react"

import HistorySidebar from "@/components/HistorySidebar ";


const LANGUAGES  = [

  "Arabic",

  "English",

  "French",

  "German",

  "Spanish",

  "Italian",

  "Turkish",

  "Portuguese",

  "Russian",

  "Chinese",

  "Japanese",

  "Korean",
 
]



const LANGUAGE_TO_LOCALE: Record<string, string> = {
  Arabic: "ar-EG",
  English: "en-US",
  French: "fr-FR",
  German: "de-DE",
  Spanish: "es-ES",
  Italian: "it-IT",
  Turkish: "tr-TR",
  Portuguese: "pt-PT",
  Russian: "ru-RU",
  Chinese: "zh-CN",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Dutch: "nl-NL",
  Hindi: "hi-IN",
  Swedish: "sv-SE",
  Polish: "pl-PL",
  Greek: "el-GR",
  Hebrew: "he-IL",
  Thai: "th-TH",
  Vietnamese: "vi-VN",
  Indonesian: "id-ID",
  Malay: "ms-MY",
  Ukrainian: "uk-UA",
  Czech: "cs-CZ",
  Romanian: "ro-RO",
  Hungarian: "hu-HU",
  Finnish: "fi-FI",
  Danish: "da-DK",
  Norwegian: "nb-NO",
  Filipino: "fil-PH",
  Bengali: "bn-BD",
  Urdu: "ur-PK",
  Persian: "fa-IR",
  Swahili: "sw-KE",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Marathi: "mr-IN",
  Gujarati: "gu-IN",
  Punjabi: "pa-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
  Slovak: "sk-SK",
  Bulgarian: "bg-BG",
  Croatian: "hr-HR",
  Serbian: "sr-RS",
  Lithuanian: "lt-LT",
  Latvian: "lv-LV",
  Estonian: "et-EE",
  Slovenian: "sl-SI",
  Icelandic: "is-IS",
  Amharic: "am-ET",
  Zulu: "zu-ZA",
  Afrikaans: "af-ZA",
};




export default function Translation () {


const [sourceText , setSourceText ] = useState("") 


const [translatedText , setTranslatedText] = useState("") 


const [loading , setLoading] = useState(false)


const [targetLanguage , setTargetLanguage] = useState("Arabic")


const [sourceLanguage , setSourceLanguage] = useState("")


const [isRecording, setIsRecording] = useState(false);


const router = useRouter()

const handleTranslation = async () => {


setLoading(true) 

try { 

const res = await api.post("/api/gemini/translate" ,

{

 text : sourceText ,

sourceLanguage: sourceLanguage, 

 targetLanguage : targetLanguage

}

)

setTranslatedText(res.data.translation) // انت بتخزن نص هنا بتاع باك اند اللى بعتهولك في رد مش بتخزن اوبجكيت كلة انت عايز نص فقط عشان تعرضوة للمستخدم في واجهة



}


catch(err:any){

console.log(err);

}

finally {

 setLoading (false)

}

}



const handleVoiceInput = () => {

const win = window as any;

const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert("this page doesn't support recored voice");

    return;

  }


  const recognition = new SpeechRecognition();

  recognition.lang =  LANGUAGE_TO_LOCALE[sourceLanguage] || "ar-EG";

  recognition.interimResults = false;

  recognition.continuous = false;

  recognition.onstart = () => setIsRecording(true);

  recognition.onend = () => setIsRecording(false);

  recognition.onresult = (event : any) => {

    const spokenText = event.results[0][0].transcript;

    setSourceText(spokenText);
  };

  recognition.onerror = () => setIsRecording(false);

  recognition.start();
};




const logOutPage = async() => {


try{

await api.delete("/api/users/logout") 

setAccessToken(null)

router.push("/login")

}


catch(err:any){

 console.log(err)

}



}




return (

<div className="min-h-screen pt-16 md:pt-24 px-4 relative">

  <button onClick={logOutPage} className="absolute top-4 md:right-10 right-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Logout</button>

 <div className="text-center pt-4">
    
  <h1 className="text-3xl md:text-4xl font-bold">Translate with <span className="text-orange-500">Ease</span> </h1>
  
   <p className="text-gray-500 mt-2">
      Break language barriers instantly with our powerful translation app.
    </p>

  </div> 


 <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-4 md:p-6">



 <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">

  <input placeholder="Source language" value={sourceLanguage} className="border focus:outline-gray-400 p-2 rounded-md w-full" list="languages" onChange={(e) => setSourceLanguage(e.target.value)} />



 <input
    list="languages"

  placeholder="Target language"

    value={targetLanguage}

    onChange={(e) => setTargetLanguage(e.target.value)}

    className="border focus:outline-gray-400 p-2 rounded-md w-full"
  />
</div>


<datalist id="languages">
    
{
 
 LANGUAGES.map((lang) => (

  <option key={lang} value={lang}/>

 ))

}


</datalist>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">


<textarea value={sourceText} placeholder="Enter text to translate" className="border rounded-md p-2 w-full h-32" onChange={(e)=> setSourceText(e.target.value)} />


<textarea value={translatedText} placeholder="translated text will appear here" className="border rounded-md p-2 w-full h-32" readOnly />


</div>


<div className="flex gap-2 ">



 <button onClick={handleTranslation} disabled= {loading} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50  transition">
  
  {
   
   loading ? "Loading..." : "Translate"
    
  }

 </button>


  <button

  type="button"

  onClick={handleVoiceInput}

  className={`mt-4 p-2 rounded-full ${isRecording ? "bg-red-500" : "bg-gray-200"}`}
>

<Mic className="w-5 h-5"/>

</button>

</div>

 </div>


<HistorySidebar />

</div>



)

    
}


