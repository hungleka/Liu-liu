document.addEventListener("DOMContentLoaded", () => {
  const noMercyBtn = document.getElementById("noMercyBtn");
  const mercyBtn = document.getElementById("mercyBtn");
  const verdict = document.getElementById("verdict");
  const courtAudio = document.getElementById("courtAudio");
  const objectionSound = document.getElementById("objectionSound");
  const holdItSound = document.getElementById("holdItSound");
  const takeThatSound = document.getElementById("takeThatSound");

  // Đảm bảo nhạc nền phát khi trang được tải
  courtAudio.play().catch((error) => {
    console.log(
      "Tự động phát nhạc bị chặn. Vui lòng tương tác với trang để phát nhạc."
    );
  });

  // Thêm sự kiện click cho toàn bộ trang để bắt đầu phát nhạc
  document.body.addEventListener(
    "click",
    function () {
      courtAudio.play().catch(function (error) {
        console.log("Lỗi phát nhạc:", error);
      });
    },
    { once: true }
  );

  // Hiệu ứng nút "không khoan hồng" di chuyển
  noMercyBtn.addEventListener("mouseover", () => {
    const maxX = window.innerWidth - noMercyBtn.offsetWidth;
    const maxY = window.innerHeight - noMercyBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noMercyBtn.style.position = "absolute";
    noMercyBtn.style.left = `${randomX}px`;
    noMercyBtn.style.top = `${randomY}px`;

    // Phát âm thanh khi nút di chuyển
    const sounds = [objectionSound, holdItSound, takeThatSound];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch((error) => {
      console.log("Không thể phát âm thanh:", error);
    });
  });

  // Xử lý khi click nút khoan hồng
  mercyBtn.addEventListener("click", () => {
    verdict.style.display = "block";
    verdict.scrollIntoView({ behavior: "smooth" });

    // Hiệu ứng xuất hiện dần dần
    verdict.style.opacity = "0";
    verdict.style.transition = "opacity 1s";

    setTimeout(() => {
      verdict.style.opacity = "1";
    }, 100);

    // Phát âm thanh khi hiển thị bản án
    objectionSound.play().catch((error) => {
      console.log("Không thể phát âm thanh:", error);
    });
  });

  // Thêm hiệu ứng cho các phần tử khi cuộn trang
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate__animated");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.style.opacity = "1";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Ẩn bản án ban đầu
  verdict.style.display = "none";
});
