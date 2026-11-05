
const shortenButton=document.querySelector("#shorten-but");
const copybtn=document.querySelector("#copybtn");
const originalurl=document.querySelector("#originalurl");
const errorMessage=document.querySelector("#p3");
const shortenedLink=document.querySelector("#shortenedLink");
    const baseUrl=window.location.origin;

shortenButton.addEventListener("click",()=>{
    console.log(baseUrl);
    fetch("/shorten",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            originalurl:originalurl.value,
        })
    })
    .then(async(response)=>{
        const data=await response.json();
        if(!response.ok){
            errorMessage.textContent=data.message;
            return;
        }
        const shortCode=data.shortCode;
        const fullShortUrl=`${baseUrl}/shorten/${shortCode}`;
        shortenedLink.value=fullShortUrl;
    })
})