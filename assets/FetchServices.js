const axios=require('axios')
const BaseUrl='http://localhost:3001'
const MainUrl='http://localhost:3000'
const postDataAndImage=async(url,formData,config)=>{
try{
    const response=await axios.post(`${BaseUrl}/${url}`,formData,config)
    var result=response.data.RESULT
    return (result)
}catch(e){
  
return (false)
}
}

const getData=async(url)=>{
  try{
    var response=await fetch(`${BaseUrl}/${url}`,{
      method:'GET',
      mode:'cors',
      headers:{'content-type':"application/json;charset=utf-8"}
    })
    var result=await response.json()
    return(result)
  }catch(e){
  return(false)
  }}
  
  const postData=async(url,body)=>{
    try{
      var response=await fetch(`${BaseUrl}/${url}`,{
        method:'post',
        mode:'cors',
        body:JSON.stringify(body),
        headers:{'content-type':"application/json;charset=utf-8"}
     
      })
      var result=await response.json()
      return(result)
      console.log(result);
    }catch(e){
    return(false)
    }}

    const postDataa=async(url,body1)=>{
      try{
        var response=await fetch(`${BaseUrl}/${url}`,{
          method:'post',
          mode:'cors',
          body1:JSON.stringify(body1),
          headers:{'content-type':"application/json;charset=utf-8"}
       
        })
        var result=await response.json()
        return(result)
        console.log(result);
      }catch(e){
      return(false)
      }}

export {postDataAndImage,getData,BaseUrl,postData,postDataa}