const mainDiv = document.getElementById("main");
const backButton = document.createElement("div");
backButton.innerHTML = `
<button style="background-color:red;color:white" id="example-back">&lt;-- Back --</button>
<hr>
`;
backButton.querySelector("#example-back").addEventListener("click", () => {
  window.location.href = "/";
});
mainDiv.prepend(backButton);
