const { body } = document;
let registry = null;

  while (!lake.classList.contains("lake")) {
    if (lake === body) return;
    lake = lake.parentNode;
  }

  // metrics
  const lakeWidth = parseInt(window.getComputedStyle(lake).width);
  const lakeHeight = parseInt(window.getComputedStyle(lake).height);
  const LakeX = event.pageX - lake.offsetLeft;
  const LakeY = event.pageY - lake.offsetTop;
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
      opacity: [0.1, 1],
    },
    { duration: 360, fill: "forwards", easing: "ease-out"}
  );
  // register the ripple
  registry = [ripple, animation];
}

function finishEffect() {
  if (registry === null) return;
  const [ripple, animation] = registry;
  animation.finished
    .then(() => ripple.animate({ opacity: [1, 0] }, 260).finished)
    .then(() => ripple.remove());
  registry = null;
}

body.addEventListener("mousedown", startEffect);
body.addEventListener("touchstart", ({ touches }) => {
  startEffect(touches[0]);
});
body.addEventListener("mouseup", finishEffect);
body.addEventListener("touchend", finishEffect);