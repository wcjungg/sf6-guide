
// --- 動画のクリック再生・一時停止機能 ---
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("video.click-toggle-video").forEach(video => {
    video.addEventListener("click", function () {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
});

// フォント切り替え機能
document.addEventListener("DOMContentLoaded", function () {
  const fontSwitcher = document.getElementById("fontSwitcher");
  if (fontSwitcher) {
    const classMap = {
      mplus: "font-mplus",
      inter: "font-inter",
      ibmplex: "font-ibmplex",
      kosugi: "font-kosugi",
      roboto: "font-roboto"
    };

    fontSwitcher.addEventListener("change", function () {
      const selected = classMap[fontSwitcher.value];
      document.querySelectorAll(".switchable-font").forEach(el => {
        el.classList.remove("font-mplus", "font-inter", "font-ibmplex", "font-kosugi", "font-roboto");
        el.classList.add(selected);
      });
    });
  }
});

// 簡易スライド機能（左右ドラッグ・ドットクリック対応）
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".swiper-container").forEach((container, index) => {
    const wrapper = container.querySelector(".swiper-wrapper");
    const dots = container.nextElementSibling?.querySelectorAll(".dot");
    let currentIndex = 0;

    const updateSlide = () => {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (dots) {
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentIndex]) dots[currentIndex].classList.add("active");
      }
    };

    // ドットクリックでスライド変更
    if (dots) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateSlide();
        });
      });
    }

    let startX = 0;
    let isDragging = false;

    container.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    container.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff > 50 && currentIndex > 0) currentIndex--;
      else if (diff < -50 && currentIndex < wrapper.children.length - 1) currentIndex++;
      isDragging = false;
      updateSlide();
    });

    container.addEventListener("mousedown", e => {
      startX = e.clientX;
      isDragging = true;
    });

    container.addEventListener("mouseup", e => {
      const diff = e.clientX - startX;
      if (diff > 50 && currentIndex > 0) currentIndex--;
      else if (diff < -50 && currentIndex < wrapper.children.length - 1) currentIndex++;
      isDragging = false;
      updateSlide();
    });

    updateSlide();
  });
});

// --- 自動再生される動画（.autoplay-on-load） ---
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("video.autoplay-on-load").forEach(video => {
    video.play().catch(e => {
      console.log("Autoplay blocked:", e);
    });
  });
});
