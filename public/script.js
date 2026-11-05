const shortenButton = document.querySelector("#shorten-but");
const copybtn = document.querySelector("#copybtn");
const originalurl = document.querySelector("#originalurl");
const errorMessage = document.querySelector("#p3");
const shortenedLink = document.querySelector("#shortenedLink");
const baseUrl = window.location.origin;
const copymessage = document.querySelector("#p4");
shortenButton.addEventListener("click", () => {
  console.log(baseUrl);
  fetch("/shorten", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      originalurl: originalurl.value,
    }),
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      errorMessage.textContent = data.message;
      errorMessage.style.color="red";
      setTimeout(() => {
        errorMessage.textContent="";
      }, 2000);
      return;
    }
    const shortCode = data.shortCode;
    const fullShortUrl = `${baseUrl}/shorten/${shortCode}`;
    shortenedLink.value = fullShortUrl;
  });
});

copybtn.addEventListener("click", async () => {
  const shortUrl = shortenedLink.value;
  if (shortUrl.trim().length === 0) {
    copymessage.textContent = "Nothing to copy";
    copymessage.style.color = "red";
    setTimeout(() => {
      copymessage.textContent = "";
    }, 2000);
    return;
  }
  try {
    await navigator.clipboard.writeText(shortUrl);
    copymessage.textContent = "Copied";
    setTimeout(() => {
      copymessage.textContent = "";
      copymessage.style.color = "green";
    }, 2000);
  } catch (err) {
    console.log("Failed to copy", err);
  }
});
