const links = document.querySelector(".nav")
const menuOpen = document.querySelector(".logo")
const menuCloser = document.querySelector(".closer")

menuOpen.addEventListener("click", () => {
  links.style.display = "block"
})
menuCloser.addEventListener("click", () => {
  links.style.display = "none"
})

const observerElement = new IntersectionObserver((elements) => {
  elements.forEach((element) => {
    if (element.isIntersecting) {
      element.target.classList.add("show");
      return;
    }
    element.target.classList.remove("show");
  });
});

const elementsHidden = document.querySelectorAll(".hidden");
elementsHidden.forEach((elementHidden) =>
  observerElement.observe(elementHidden)
);


links.addEventListener("click", (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("href");
  const distanceToTop = document.querySelector(id).offsetTop - 140;
  smoothScrollTo(0, distanceToTop);
  links.style.display = "none"    
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}