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

  // Đặt vị trí ban đầu của nút trong khung defense
  const defenseBox = document.querySelector(".defense");
  noMercyBtn.style.position = "absolute";
  noMercyBtn.style.left = "70%";
  noMercyBtn.style.top = "50%";
  noMercyBtn.style.transform = "translate(-50%, -50%)";

  // Hiệu ứng nút "không khoan hồng" di chuyển
  noMercyBtn.addEventListener("mouseover", (event) => {
    const defenseBox = document
      .querySelector(".defense")
      .getBoundingClientRect();

    const maxX = defenseBox.width - noMercyBtn.offsetWidth - 40;
    const maxY = defenseBox.height - noMercyBtn.offsetHeight - 40;

    const moveRange = 150;

    const currentX = noMercyBtn.offsetLeft;
    const currentY = noMercyBtn.offsetTop;

    const mouseX = event.clientX - defenseBox.left;
    const mouseY = event.clientY - defenseBox.top;

    const deltaX = currentX - mouseX;
    const deltaY = currentY - mouseY;

    let newX = currentX + (deltaX > 0 ? moveRange : -moveRange);
    let newY = currentY + (deltaY > 0 ? moveRange : -moveRange);

    newX = Math.min(Math.max(20, newX), maxX);
    newY = Math.min(Math.max(20, newY), maxY);

    if (newX <= 20) newX = maxX - 20;
    if (newX >= maxX) newX = 40;
    if (newY <= 20) newY = maxY - 20;
    if (newY >= maxY) newY = 40;

    noMercyBtn.style.left = `${newX}px`;
    noMercyBtn.style.top = `${newY}px`;

    // Phát âm thanh
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

    verdict.style.opacity = "0";
    verdict.style.transition = "opacity 1s";

    setTimeout(() => {
      verdict.style.opacity = "1";
    }, 100);

    objectionSound.play().catch((error) => {
      console.log("Không thể phát âm thanh:", error);
    });
  });

  // Ẩn bản án ban đầu
  verdict.style.display = "none";
});
