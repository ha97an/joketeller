const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//DISABLE/ENABLE BUTTON

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: "b94a6d8a3e8546f699acb3c305d975c0",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//get jokes from joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    //Disable button
    toggleButton();
  } catch (error) {
    //  //Catch erros
    console.log("whoops", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
