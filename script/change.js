const img = document.querySelector(".section-six-5 img");
let i = 0;
setInterval(()=>{
img.src = `/assets/change-imgs/change-img-0${i+1}.svg`;
if(i < 4){
    i++;
}else{
    i = 0;
}
}, 1000);