document.addEventListener("DOMContentLoaded", () => {
  const noMercyBtn = document.getElementById("noMercyBtn");
  const mercyBtn = document.getElementById("mercyBtn");
  const verdict = document.getElementById("verdict");
  const objectionSound = document.getElementById("objectionSound");
  const holdItSound = document.getElementById("holdItSound");
  const takeThatSound = document.getElementById("takeThatSound");

  // Xử lý di chuyển nút không khoan hồng
  noMercyBtn.addEventListener("mouseover", (event) => {
    const defenseBox = document
      .querySelector(".defense")
      .getBoundingClientRect();
    const btnRect = noMercyBtn.getBoundingClientRect();

    let newX = Math.random() * (defenseBox.width - btnRect.width - 40);
    let newY = Math.random() * (defenseBox.height - btnRect.height - 40);

    // Đảm bảo nút không di chuyển ra ngoài vùng cho phép
    newX = Math.max(20, Math.min(newX, defenseBox.width - btnRect.width - 20));
    newY = Math.max(
      20,
      Math.min(newY, defenseBox.height - btnRect.height - 20)
    );

    noMercyBtn.style.position = "absolute";
    noMercyBtn.style.left = `${newX}px`;
    noMercyBtn.style.top = `${newY}px`;
    noMercyBtn.style.transform = "none";

    // Phát âm thanh ngẫu nhiên
    const sounds = [objectionSound, holdItSound, takeThatSound];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound
      .play()
      .catch((error) => console.log("Không thể phát âm thanh:", error));
  });

  // Xử lý nút khoan hồng
  mercyBtn.addEventListener("click", () => {
    verdict.style.display = "block";
    verdict.scrollIntoView({ behavior: "smooth" });
    verdict.style.opacity = "0";
    verdict.style.transition = "opacity 1s";

    setTimeout(() => {
      verdict.style.opacity = "1";
    }, 100);

    objectionSound
      .play()
      .catch((error) => console.log("Không thể phát âm thanh:", error));
  });

  // Ẩn bản án ban đầu
  verdict.style.display = "none";
});
