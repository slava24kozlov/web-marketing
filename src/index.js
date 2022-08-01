import "./index.scss";
import "./handlebars/partials/sorting.scss";
import "./handlebars/partials/pagination.scss";
import "./handlebars/partials/card.scss";
import "./handlebars/partials/paragraphs.scss";

/*CURRENT YEAR*/
document.getElementById("date").innerText = new Date().getFullYear().toString();

/*SORTING*/
const selectList = document.querySelectorAll(".sorting > label > select");

selectList.forEach(el => el.addEventListener("change", (event) => {
  selectList.forEach(el => {
    if (event.target.value !== el.value) {
      el.value = event.target.value;
    }
  })
}));

/*PAGINATION*/
let currentValue = 1;
const paginationList = document.querySelectorAll(".pagination > div");
const cards = document.getElementById("cards");

function setActiveClass() {
  paginationList.forEach(page => {
    if (currentValue === Number(page.textContent)) {
      page.className = "activePage";
    } else {
      page.className = "";
    }
  })

  if (currentValue !== 1) {
    cards.style.visibility = "hidden";
  } else {
    cards.style.visibility = "initial";
  }
}

function onChangePaginationRight() {
  if (currentValue === 3) {
    currentValue = 1
  } else {
    currentValue += 1
  }
  setActiveClass();
}

function onChangePaginationLeft() {
  if (currentValue === 1) {
    currentValue = 3;
  } else {
    currentValue -= 1;
  }
  setActiveClass();
}

document.querySelectorAll(".pagination > button").forEach((button, index) => {
  if (index === 0) {
    button.addEventListener("click", onChangePaginationLeft);
  } else {
    button.addEventListener("click", onChangePaginationRight);
  }
});
setActiveClass();

