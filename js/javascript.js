
document.addEventListener("DOMContentLoaded", () => {
  const frontPageAA = document.getElementById("FrontPage");
  const glow = document.getElementById("glowEffect");

  function revealContent() {
    document.body.classList.add("revealed");
    window.removeEventListener("wheel", handleScroll);
    window.removeEventListener("touchmove", handleTouchMove);
    aOs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- testing the debounce system ----
  let wheelScrollAmount = 0;
  function handleScroll(e) {
    wheelScrollAmount += e.deltaY;

    if (wheelScrollAmount > 150) {
      revealContent();
    }
  }

  let touchStartY = 0;
  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    const deltaY = touchStartY - e.touches[0].clientY;
    if (deltaY > 50) {
      revealContent();
    }
  }

  window.addEventListener("wheel", handleScroll);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);

  window.addEventListener("mousemove", (event) => {
    const rect = frontPageAA.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = Math.max(rect.width / 2, rect.height / 2, 300);

    if (distance < maxDistance) {
      const degree = (distance / maxDistance) * 45;
      const rotateX = deltaY / distance;
      const rotateY = -deltaX / distance;

      frontPageAA.style.transform = `translate(-50%, -50%) perspective(500px) rotate3d(${rotateX}, ${rotateY}, 0, ${degree}deg)`;
      glow.style.transform = `translate(${rotateY * 100}%, ${rotateX * 100}%) scale(2.4)`;
      glow.style.opacity = (distance / maxDistance) * 0.5;
    } else {
      frontPageAA.style.transform = "translate(-50%, -50%)";
    }
  });

  window.addEventListener("mouseleave", () => {
    frontPageAA.style = null;
    glow.style.opacity = 0;
  });

  frontPageAA.addEventListener("click", revealContent);
});

function aOs() {
  AOS.init({
    duration: 3000,
  });
}



function modeToggler() {
  const toggleButtons = [document.getElementById("toggleThemeMain"), document.getElementById("toggleThemeSticky")];
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const userTheme = localStorage.getItem("theme");
  
    function setTheme(mode) {
      if (mode === "light") {
        document.body.classList.add("light-mode");
        toggleButtons.forEach(btn => btn.innerHTML = "🌞");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light-mode");
        toggleButtons.forEach(btn => btn.innerHTML = "🌙");
        localStorage.setItem("theme", "dark");
      }
    }
  
    if (userTheme) {
      setTheme(userTheme);
    } else if (!prefersDark) {
      setTheme("light");
    }
  
    toggleButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-mode");
        setTheme(isLight ? "dark" : "light");
      });
    });
    
  }
  
  document.addEventListener("DOMContentLoaded", modeToggler);

  document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".accordion-header");
  
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const parent = header.parentElement;
        const isOpen = parent.classList.contains("open");

        document.querySelectorAll(".accordion").forEach(acc => {
          acc.classList.remove("open");
          acc.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
        });
  
        if (!isOpen) {
          parent.classList.add("open");
          header.setAttribute("aria-expanded", "true");
        }
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    const stickyHeader = document.getElementById("stickyHeader");
    const stickyMenu = document.getElementById("sticky-menuIcon");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 140) {
        stickyHeader.classList.add("visible");
        stickyMenu.classList.add("visible");
      } else {
        stickyHeader.classList.remove("visible");
        stickyMenu.classList.remove("visible");
      }
    });
  });
  

  function toggleMenu() {
    const menuLinks = document.querySelector('.sticky-menuLinks');
    menuLinks.classList.toggle('sticky-menuLinksShow');

    const imageMenu = document.querySelector('.tome_portal');
    

    if (imageMenu.src.includes('town-portal.png')) {
      imageMenu.src = 'images/open_book_portal.png';
    } else {
      imageMenu.src = 'images/town-portal.png';
    }
}


document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    const isMobile = window.innerWidth < 620;
    const hasRevealed = document.body.classList.contains("revealed");
  
    if (hasRevealed && window.scrollY > 300 && isMobile) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("revealed")) {
      backToTopBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({top: 0,behavior: "smooth"});
  });
});


const images = document.querySelectorAll('.modal-img');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Open modal when image clicked
images.forEach((img, idx) => {
  img.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.textContent = img.alt;
    currentIndex = idx;
  });
});

// Close modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Navigate images
function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  modalImg.src = images[index].src;
  captionText.textContent = images[index].alt;
  currentIndex = index;
}

prevBtn.onclick = function() {
  showImage(currentIndex - 1);
}
nextBtn.onclick = function() {
  showImage(currentIndex + 1);
}

// Optional: Close modal when clicking outside image
modal.onclick = function(event) {
  if (event.target === modal) modal.style.display = "none";
}
