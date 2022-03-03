const content = " &nbsp; våga &nbsp; &nbsp; upplev------upptäck &nbsp;";
const repeats = 4;
const pTags = document.querySelectorAll(".prompter-container p");
let pWidth = 0;

let x = 0;
let hasSwapped = false;

for(let i = 0; i < repeats; i++){
    pTags[0].innerHTML += content;
    pTags[1].innerHTML += content;
}
pWidth = pTags[0].clientWidth;

window.addEventListener("resize", () => {
    x = 0;
    hasSwapped = false;
    let rect = pTags[0].getClientRects();
    rect[0].left = 0;
    rect = pTags[1].getClientRects();
    rect[0].left = 0;
    pWidth = pTags[0].clientWidth;
});


setInterval(() => {
    x--;
    if(!hasSwapped){
        pTags[0].style.transform = `translateX(${x}px)`;
        pTags[1].style.transform = `translateX(${x + pWidth}px)`;
    }else{
        pTags[0].style.transform = `translateX(${x + pWidth}px)`;
        pTags[1].style.transform = `translateX(${x}px)`;
    }
    
    if(pWidth - Math.abs(x) < 0){
        hasSwapped = !hasSwapped;
        x = 0;
    }
}, 10);