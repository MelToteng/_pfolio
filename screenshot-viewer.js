const gallery = document.querySelector(".screenshot-gallery");
const screenshots = Array.from(gallery.querySelectorAll("figure"));
const viewer = document.querySelector(".screenshot-viewer");
const image = viewer.querySelector("img");
const caption = viewer.querySelector("figcaption");
const fullscreenButton = viewer.querySelector(".viewer-fullscreen");
let currentIndex = 0;

function showScreenshot(index) {
  currentIndex = (index + screenshots.length) % screenshots.length;
  const screenshot = screenshots[currentIndex];
  image.alt = screenshot.querySelector("img").alt;
  image.src = screenshot.querySelector("a").href;
  caption.textContent = `${currentIndex + 1} of ${screenshots.length} · ${screenshot.querySelector("figcaption").textContent}`;
}

if (typeof viewer.showModal === "function") {
  fullscreenButton.addEventListener("click", () => {
    const fullscreen = viewer.classList.toggle("is-fullscreen");
    fullscreenButton.setAttribute("aria-pressed", String(fullscreen));
  });

  viewer.addEventListener("close", () => {
    viewer.classList.remove("is-fullscreen");
    fullscreenButton.setAttribute("aria-pressed", "false");
  });

  gallery.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    showScreenshot(screenshots.indexOf(link.closest("figure")));
    viewer.showModal();
  });

  for (const button of viewer.querySelectorAll("[data-step]")) {
    button.addEventListener("click", () => showScreenshot(currentIndex + Number(button.dataset.step)));
  }

  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showScreenshot(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
}
