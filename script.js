document.addEventListener("DOMContentLoaded", () => {
  const noMercyBtn = document.getElementById("noMercyBtn");
  const mercyBtn = document.getElementById("mercyBtn");
  const verdict = document.getElementById("verdict");
  const objectionSound = document.getElementById("objectionSound");
  const holdItSound = document.getElementById("holdItSound");
  const takeThatSound = document.getElementById("takeThatSound");

  // 5 vị trí cố định cho nút
  const positions = [
    { x: 20, y: 20 }, // Góc trên trái
    { x: 20, y: 150 }, // Giữa trái
    { x: 400, y: 80 }, // Giữa phải
    { x: 200, y: 20 }, // Giữa trên
    { x: 350, y: 150 }, // Góc dưới phải
  ];

  let currentPosition = 0;

  function moveButton() {
    // Chuyển đến vị trí tiếp theo
    currentPosition = (currentPosition + 1) % positions.length;

    noMercyBtn.style.position = "absolute";
    noMercyBtn.style.transition = "all 0.1s ease-out";
    noMercyBtn.style.left = `${positions[currentPosition].x}px`;
    noMercyBtn.style.top = `${positions[currentPosition].y}px`;

    // Phát âm thanh ngẫu nhiên
    const sounds = [objectionSound, holdItSound, takeThatSound];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound
      .play()
      .catch((error) => console.log("Không thể phát âm thanh:", error));
  }

  // Thêm sự kiện mouseover để nút nhảy khi di chuột vào
  noMercyBtn.addEventListener("mouseover", moveButton);

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

  verdict.style.display = "none";
});
