import axios from "axios";




const api = axios.create({

baseURL : "https://translation-back-end.vercel.app" ,

withCredentials : true // دة عشان نتجنب مشاكل كوكيز

})



// هنجدد اكسيس توكين ونخزنوة في متغير هنا



let accessToken = null 

// لما اجي اعمل دالة بتاعتي هعمل اكسيس توكين احط قيمة بتاعتي في متغير دة دلوقتي هو نال لسة مفيش توكين جية



// هنبدأ نصدر دالة للصفحات تانية اللى هو لوجين عشان خاطر نحط توكين جديد في متغير دة داخل دالة دي 


export const setAccessToken = (token) => {

 accessToken = token  // دة بارميتر بعتهالك صفحة لوجين فية توكين جديد واحنا هنا بعتهالوة كبارميتر عرفت لية بقي صدرت اكسيس توكين متغير دة عشان دة متغير توكين بيتغير كل ربع ساعة بتوكين جديد  

}



api.interceptors.request.use((config) => {


 if(accessToken) {

 config.headers.Authorization = `Bearer ${accessToken}`

 }   

 return config // ابعت طلب خلاص انا حطيت توكين بتاعي

// بقولوة اي طلب يجيلك من صفحات تانية قبل ماتنفذ الطلب وترجعلوة الرد حطولوة توكين اي طلب جاي من اي صفحة قبل ما يروح باك اند بتتحط فية توكين بتاع مستخدم وبعد كدة بتقولوة ابعت طلب 

// واخد بالك كونيج دة اوبجكيت في طلب بتاعك مثلا عايز تشوف بروفايل بتاعك روحت صفحة بروفايل على طول حطيلي التوكين بتاع مستخدم دة قبل ماتنفذ طلب

// config : {
//   url: '/user/profile',
//   method: 'get',
//   baseURL: 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json', واخد بالك حطيت توكين ايزيروشين
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // التوكن اتحط هنا
//   },
//   data: undefined // داتا فية الرد وتفاصيل بتاعتك اللى جاية من باك اند وترجعلك من باك اند
// }

})



// طيب في حالة لو اكسيس توكين خلص اللى هو مدتة ربع ساعة نعمل اية هنا بقي نبدأ نجدد اكسيس توكين بتاع مستخدم تلقائي من غير ما المستخدم يحس 


api.interceptors.response.use( // رد هيجيلك من باك اند وانت تتعامل معاة ازاي

(response) => response ,  // لو طلب اتجدد نسيبوة عادي مش هنعمل في حاجة لكن لو فية ايرور نبدأ بقي نتعامل معاة ايرورر نشوف ايرور بتاع توكين دة ونجددوة تلقائي

async (error) => {


const handleError = error.config // دي خاصية ثابتة بتجبلك سبب ايرورر اية وتفاصيل ايررور

// 401 دة ايرور توكين في حالة توكين خلص بتتعامل مع دة لو ايرورر تاني ارمي بعيد عني


// error = {
//   message: 'Request failed with status code 401',
//   response: {  // رد السيرفر
//     status: 401,
//     data: { message: 'Unauthorized' } // دة شكل ايرورر وتحتها تفاصيل ايرورر
//   },

//   config: {  // <-- دي تفاصيل الطلب اللي انت بعته
//     url: '/user/profile',
//     method: 'get',
//     baseURL: 'https://api.com',
//     headers: { Authorization: 'Bearer xxx' },
//     data: undefined,
//     _retry: true // دي احنا بنضيفها من عندنا عشان خاطر نمنع ارسال نفس طلب كذا مرة لو فية حالة في ايرور
//   }
// }


if(error.response?.status === 401 && !handleError._retry && !handleError.url.includes("/refreshToken")) {

 handleError._retry = true // بقولوة لو حالة ايرور 401 اللى هو توكين خلص وكمان فروند اند بعت نفس طلب ايرور كل شواية اقولوة لاء مسحمولك تبعت مرة مش اكتر من مرة لو جية يبعت مرة تانية هيرملي ايرور دة في كاتش الفكرة كلها ان لما اكسيس توكين يخلص منروحش نبعت نفس الطلب كل شواية المتصفح هيهنج من كتر لوب كل شواية تبعت نفس طلب بقولوة هنا لو قيمة بولين خلاص يعني معناها متبعتش طلب دة تاني اللى انت بعتوة طالما بعت مرة متبعتوش تاني

// دة سطر بينك وبين كود بس مالهاش علاقة بيوسير ولا الها علاقة بسيرفر انت بس بتفتح كونسل وتطبع تشوف انت بعت نفس طلب ولا لاء لو ترو يبقي بعت طلب دة قبل كدة لو مش ترو يبقي طلب دة اول مرة يبتبعت

console.log(handleError._retry)



// هنبدأ بقي نكتب راوتيس بتاعنا ونظبطوة بتراي وكاتش عشان خاطر هنكلم باك اند 


try {

const res = await api.get("/api/users/refreshToken" , 
    

{withCredentials : true } // يجدد توكينس من غير مشاكل في كوكيزي

)

// res :{  دة شكل طلب انت بعتوة و دة الرد بتاعوة عايزين بقي نجيب اكسيس توكين فقط ونحطوة داخل دالة عشان نحدثوة وكمان نحطوة داخل طلب اللى عمال يرجع ايرور دة ونحدثهم هما اتنين
//   "accessToken": "eyJhbGciOiJIUzI1NiIs...",
//   "refreshToken": "newRefreshTokenHere...",
//   "user": { "id": 1, "name": "Ahmed" }
// }


const newaccessToken = res.data.accessToken 

setAccessToken(newaccessToken) // نبصيها لبارميتر


handleError.headers.Authorization = `Bearer ${newaccessToken}` // نحطلوة اكسيس توكين جديد نحدثوة هو كمان زاي ما حدثنا فونشين

return api(handleError) // نعيد نبعت طلب تاني مع توكين جديد نحط توكين جديد داخل نفس طلب ونبعتوة 

}

catch(err){

setAccessToken(null) 

window.location.href = "/login" 

return Promise.reject(err)

}

}

return Promise.reject(error) // اي نوع خطأ ظاهر غير 401 ارميلي ايرور دة بعيد متعرضوش هنا احنا عايز ايرورر بتاع تجديد توكين فقط 401 مش عايزين ايرور 500 او 404 ارميلي بعيد عني واعرضة للمستخدم

}


)








export default api


