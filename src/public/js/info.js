let introTab = document.getElementById("intro_tab");
let planTab = document.getElementById("plan_tab");
let scheduleTab = document.getElementById("schedule_tab");
document.getElementById("gtBtn").onclick = () => {
  console.log("click");
  planTab.classList.remove("show_flex");
  scheduleTab.classList.remove("show_grid");
  introTab.classList.add("show_flex");
};
document.getElementById("ndBtn").onclick = () => {
  console.log("click");
  planTab.classList.add("show_flex");
  scheduleTab.classList.remove("show_grid");
  introTab.classList.remove("show_flex");
};
document.getElementById("lhBtn").onclick = () => {
  console.log("click");
  planTab.classList.remove("show_flex");
  scheduleTab.classList.add("show_grid");
  introTab.classList.remove("show_flex");
};
