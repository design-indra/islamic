document.addEventListener("DOMContentLoaded", () => {

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="light"){
document.body.classList.add("light");
if(themeToggle) themeToggle.textContent="☀️";
}

if(themeToggle){
themeToggle.onclick=()=>{
document.body.classList.toggle("light");
const light=document.body.classList.contains("light");
themeToggle.textContent=light?"☀️":"🌙";
localStorage.setItem("theme",light?"light":"dark");
};
}

/* QURAN */
const surahList=document.getElementById("surah-list");
if(surahList){
fetch("https://api.alquran.cloud/v1/surah")
.then(r=>r.json())
.then(data=>{
data.data.forEach(s=>{
const div=document.createElement("div");
div.className="card";
div.innerHTML=`${s.number}. ${s.name}`;
div.onclick=()=>loadSurah(s.number,s.name);
surahList.appendChild(div);
});
});
}

});

/* HADITS */
function loadHadits(book){
fetch(`https://api.hadith.gading.dev/books/${book}?range=1-10`)
.then(r=>r.json())
.then(data=>{
const container=document.getElementById("hadits-container");
container.innerHTML="";
data.data.hadiths.forEach(h=>{
container.innerHTML+=`
<div class="card">
<p class="arabic">${h.arab}</p>
<p>${h.id}</p>
</div>`;
});
});
}