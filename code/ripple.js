const { body } = document;
let registry = null;

function startEffect({target, pageX, pageY}, tone = "dark") {
  // the ripple element will cover the whole lake, if the user click/touch it
  // before it disappear, we will keep climbing the dom until reaching a lake

  let lake = target;
  while (!lake.classList.contains("lake")) {
    if (lake === body) return;
    lake = lake.parentNode;
  }

  // metrics
  const lakeWidth = parseInt(window.getComputedStyle(lake).width);
  const lakeHeight = parseInt(window.getComputedStyle(lake).height);
  const LakeX = pageX - lake.offsetLeft;
  const LakeY = pageY - lake.offsetTop;
  let rippleRadius = Math.max(lakeHeight, lakeWidth) * Math.SQRT2;
  rippleRadius += rippleRadius * 0.3;

  //put a ripple in the lake
  const ripple = document.createElement("div");
  ripple.className = `-ripple-element -${tone}-ripple -init-ripple`;
  lake.append(ripple);

  //animate the ripple element
  const animation = ripple.animate(
    {
      height: ["0px", `${rippleRadius}px`],
      width: ["0px", `${rippleRadius}px`],
      top: [`${LakeY}px`, `${(lakeHeight - rippleRadius) / 2}px`],
      left: [`${LakeX}px`, `${(lakeWidth - rippleRadius) / 2}px`],
    },
    {
      duration: 220,
      fill: "forwards",
      easing: "cubic-bezier(0, 0, 0.3, 0)",
    }
  );
  // register the ripple
  registry = [ripple, animation];
}

function finishEffect() {
  if (registry === null) return;
  const [ripple, animation] = registry;
  animation.finished
    .then(() => ripple.animate({ opacity: 0 }, 360).finished)
    .then(() => ripple.remove());
  registry = null;
}

body.addEventListener("mousedown", startEffect);
body.addEventListener("touchstart", ({ touches }) => {
  startEffect(touches[0]);
});
body.addEventListener("mouseup", finishEffect);
body.addEventListener("touchend", finishEffect);