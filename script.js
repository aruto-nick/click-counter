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

  if(count>=10){
    countText.textContent = "🎉 10回達成！";
  }else{
    countText.textContent = `クリック回数:${count}`;  
  }
  
});