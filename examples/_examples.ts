const mainDiv = document.getElementById("main");
const backButton = document.createElement("div");
backButton.innerHTML = `
<button id="example-back">&lt;-- Back --</button>
<hr>
`;
backButton.querySelector("#example-back").addEventListener("click", () => {
  window.location.href = "/";
});
mainDiv.prepend(backButton);
