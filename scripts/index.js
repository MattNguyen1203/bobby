const setBobbyActive = () => {
  const bobby1 = document.getElementById("bobby-1");
  const bobby2 = document.getElementById("bobby-2");
  const bobby3 = document.getElementById("bobby-3");
  let bobbyInterval;

  const changeToBobby2 = () => {
    clearInterval(bobbyInterval);
    bobby1.classList.remove("active");
    bobby3.classList.remove("active");
    bobby2.classList.add("active");
  };

  const changeToBobby1 = () => {
    clearInterval(bobbyInterval);
    bobby2.classList.remove("active");
    bobby1.classList.add("active");
    bobby3.classList.add("active");
  };

  // Set interval to change the bobby image
  bobbyInterval = setInterval(() => {
    if (bobby1.classList.contains("active")) {
      bobby1.classList.remove("active");
      bobby3.classList.remove("active");
      setTimeout(() => {
        bobby2.classList.toggle("active");
      }, 500);
    }

    if (bobby2.classList.contains("active")) {
      bobby2.classList.remove("active");
      setTimeout(() => {
        bobby1.classList.toggle("active");
        bobby3.classList.toggle("active");
      }, 500);
    }
  }, 3000);

  // Click on bobby 2 to show bobby 1
  bobby2.addEventListener("click", changeToBobby1);

  // Click on bobby 1 to show bobby 2
  bobby1.addEventListener("click", changeToBobby2);

  return () => {
    clearInterval(bobbyInterval);
    // remove event listener
    bobby1.removeEventListener("click", changeToBobby2);
    bobby2.removeEventListener("click", changeToBobby1);
  };
};

const setHeaderLeftSidebar = () => {
  const openNavSidebarButton = document.getElementById("nav-open-button");
  const closeNavSidebarButton = document.getElementById("nav-close-button");
  const navSidebar = document.getElementById("nav-sidebar");

  const toggleSidebar = () => {
    // if is active, remove active
    openNavSidebarButton.classList.toggle("active");
    navSidebar.classList.toggle("active");
  };

  openNavSidebarButton.addEventListener("click", toggleSidebar);
  closeNavSidebarButton.addEventListener("click", toggleSidebar);

  // add onclick outside to remove active when click to wrapper it still open
  document.addEventListener("click", (event) => {
    // Click with data prevent click nav sidebar
    const shouldCloseTask =
      event.target.closest("[data-prevent-close-nav-sidebar]") === null;
    if (shouldCloseTask) {
      navSidebar.classList.remove("active");
    }
  });

  return () => {
    openNavSidebarButton.removeEventListener("click", toggleSidebar);
    closeNavSidebarButton.removeEventListener("click", toggleSidebar);
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const footerDecorLeft = document.querySelector(".footer__decor-left");
  const footerDecorRight = document.querySelector(".footer__decor-right");
  const footerDecorBear = document.querySelector(".footer__decor-bear");
  const footerWrapper = document.querySelector(".footer__wrapper");
  const mainContentLeft = document.querySelector(".main__content-left");
  const mainContentLeftLeaf = document.querySelector(
    ".main__content-left-leaf"
  );
  const navigationButton = document.getElementById("navigation-button");
  const otherFeatureButton = document.getElementById("other-feature");
  const mainContent = document.getElementById("body-section");
  const videoPlayIcon = document.getElementById("video-play-icon");
  const videoPlayer = document.getElementById("video-player");
  const bimImage = document.getElementById("bim-image");

  setBobbyActive();
  setHeaderLeftSidebar();

  setTimeout(() => {
    videoPlayer.play();
    videoPlayer.pause();
  }, 0);

  videoPlayIcon.addEventListener("click", () => {
    videoPlayer.play();
    // Hide the icon play
    videoPlayIcon.style.display = "none";
  });

  // click on the video player to pause and show the icon play or hide the icon play
  videoPlayer.addEventListener("click", () => {
    videoPlayer.pause();
    // Show the icon play
    videoPlayIcon.style.display = "block";
  });

  function remToPx(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  navigationButton.addEventListener("click", () => {
    // Scroll to main content with a small offset in rem
    const offsetRem = 0; // 0rem offset
    const offsetPx = remToPx(offsetRem);

    const mainContentTop =
      mainContent.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: mainContentTop - offsetPx,
      behavior: "smooth",
    });
  });

  otherFeatureButton.addEventListener("click", () => {
    otherFeatureButton.classList.add("active");
    document.querySelector(".main__content-badge").classList.add("active");
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 10% of the footer is visible
  };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to footer decorative elements
        footerDecorLeft.classList.add("active");
        footerDecorRight.classList.add("active");
        footerDecorBear.classList.add("active");
        footerWrapper.classList.add("active");
      }
    });
  }, observerOptions);

  let intervalId;

  const bodySectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        mainContentLeft.classList.add("active");
        mainContentLeftLeaf.classList.add("active");

        // Xóa interval trước nếu nó tồn tại
        if (intervalId) {
          clearInterval(intervalId);
        }
      }

      // Clear interval khi phần tử không còn trong viewport
      if (!entry.isIntersecting) {
        clearInterval(intervalId);
      }
    });
  }, observerOptions);
  if (window.innerWidth < 768) {
    let intervalId;
    const bodySectionMBObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add interval to bim image to change url image bim-1 and bim-2 alternate after 5 seconds
          const bimImageSrc1 = "./assets/section-main/image-bim.webp";
          const bimImageSrc2 = "./assets/section-main/image-bim-open.webp";
          let isSrc1 = false;

          // Clear interval if it exists
          if (intervalId) {
            clearInterval(intervalId);
          }

          // Set interval to change the bim image source
          intervalId = setInterval(() => {
            document.getElementById("bim-image-mb").src = isSrc1
              ? bimImageSrc1
              : bimImageSrc2;
            isSrc1 = !isSrc1;
          }, 5000);
        }

        // Clear interval when the element is not intersecting
        if (!entry.isIntersecting) {
          clearInterval(intervalId);
        }
      });
    }, observerOptions);
    const bodySection = document.getElementById("body-section");
    if (bodySection) {
      bodySectionMBObserver.observe(bodySection);
    }
  }

  // Start observing the footer
  const footer = document.querySelector(".footer");
  if (footer) {
    footerObserver.observe(footer);
  }

  const bodySection = document.getElementById("body-section");
  if (bodySection) {
    bodySectionObserver.observe(bodySection);
  }

  function scrollToElementById(id) {
    const element = document.getElementById(id);

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth", // Cuộn mượt mà
      });
    } else {
      console.warn(`Element với id "${id}" không tồn tại.`);
    }
  }

  const listNavItem = document.querySelectorAll(".nav__list .nav__item");
  listNavItem?.[0].addEventListener("click", () => {
    scrollToElementById("step-1");
  });
  listNavItem?.[1].addEventListener("click", () => {
    scrollToElementById("body-section");
  });
  listNavItem?.[2].addEventListener("click", () => {
    scrollToElementById("footer");
  });
});
const main__content_left_bim = document.querySelectorAll(
  ".main__content-left-bim"
);

setInterval(() => {
  main__content_left_bim.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    } else {
      element.classList.add("active");
    }
  });
}, 3000);
