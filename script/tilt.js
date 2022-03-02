const tiltMaxDeg = 6;
const transitionTime = 0.2;
let currentTiltable = null;
let lastCurrentTiltable = null;
let perspective = 1000;

const tiltables = document.querySelectorAll(".tiltable");

tiltables.forEach((tiltable) => {
  const parent = tiltable.parentNode;
  const wrapper = document.createElement("div");
  parent.replaceChild(wrapper, tiltable);
  wrapper.appendChild(tiltable);
  wrapper.style.perspective = `${perspective}px`;
  wrapper.style.perspectiveOrigin = "center";
  wrapper.classList.add("tilt-wrapper");
  const gridArea = window.getComputedStyle(tiltable).gridArea;
  if (gridArea !== "auto") {
    //If the div is not a grid-child it has "grid-area: auto".
    //Otherwise copy the gridArea value and add a height of 100% to fill up the div.
    wrapper.style.gridArea = window.getComputedStyle(tiltable).gridArea;
    tiltable.style.height = "100%";
  }
  tiltable.style.transition =
    WebkitTransition = `all ${transitionTime}s linear`;
  tiltable.style.transition = MozTransition = `all ${transitionTime}s linear`;
  const bgColor = window.getComputedStyle(tiltable).backgroundColor;
  tiltable.setAttribute("data-bg-color", bgColor);
});
const wrappers = document.querySelectorAll(".tilt-wrapper");
calculatePerspective();
window.addEventListener("resize", calculatePerspective);

function calculatePerspective() {
  perspective = window.innerWidth * 3;
  wrappers.forEach((wrapper) => {
    wrapper.style.perspective = `${perspective}px`;
  })
}


document.addEventListener("mousemove", (e) => {
  if (e.target.classList.contains("tiltable")) {
    if (currentTiltable !== null && currentTiltable !== e.target) {
      currentTiltable.style.transform = "rotateX(0deg) rotateY(0deg)";
      currentTiltable.style.backgroundColor =
        currentTiltable.getAttribute("data-bg-color");
    }
    currentTiltable = e.target;
    const normPos = getMouseNormalizedLocalPos(e);
    currentTiltable.style.transform = `rotateX(${
      -normPos[1] * tiltMaxDeg
    }deg) rotateY(${normPos[0] * tiltMaxDeg}deg)`;
    //Color
    let bgColor = currentTiltable.getAttribute("data-bg-color");
    bgColor = ConvertRGBStringToArray(bgColor);
    const modifiedColorArray = [
      bgColor[0] + normPos[0] * 20 - normPos[1] * 20,
      bgColor[1] - normPos[1] * 20,
      bgColor[2] - normPos[1] * 20,
    ];
    currentTiltable.style.backgroundColor = `rgb(${modifiedColorArray[0]},${modifiedColorArray[1]},${modifiedColorArray[2]})`;
    //Color end
  } else if (currentTiltable !== null) {
    currentTiltable.style.transform = "rotateX(0deg) rotateY(0deg)";
    currentTiltable.style.backgroundColor =
      currentTiltable.getAttribute("data-bg-color");
    currentTiltable = null;
  }
});
function ConvertRGBStringToArray(rgbString) {
  rgbString = rgbString.slice(4, -1);
  rgbString = rgbString.split(", ");
  let returnArray = [];
  rgbString.forEach((number) => {
    returnArray.push(parseInt(number));
  });
  return returnArray;
}

function getMouseNormalizedLocalPos(mouseEvent) {
  const elementRect = mouseEvent.target.getBoundingClientRect();
  const mousePos = [mouseEvent.clientX, mouseEvent.clientY];
  const localMousePos = [
    mousePos[0] - elementRect.x,
    mousePos[1] - elementRect.y,
  ];
  return [
    (localMousePos[0] / elementRect.width - 0.5) * 2,
    (localMousePos[1] / elementRect.height - 0.5) * 2,
  ];
}