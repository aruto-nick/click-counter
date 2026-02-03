const message = document.getElementById("message");
const btn = document.getElementById("btnMessage");

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

const countText = document.getElementById("count");
const btnCount = document.getElementById("btnCount");

let count = 0;

btnCount.addEventListener("click",()=>{
  count++;
  countText.textContent = `クリック回数:${count}`;
});