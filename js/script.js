const validateBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const dlJsonBtn = document.getElementById("dl-json-btn");
const dlXMLtn = document.getElementById("dl-xml-btn");
let visible = document.getElementById("download-btn-dropdown");
const jsonDataInput = document.getElementById("jsonDataArea");
let defaultInfoMsg = "Watch this space for information!";

const validateJSON = () => {
  const jsonDataInput = document.getElementById("jsonDataArea").value.trim();
  let colorState = "pass";
  try {
    let jsonObject = JSON.parse(jsonDataInput);
    const prettyJsonString = JSON.stringify(jsonObject, null, 2);
    document.getElementById("jsonDataArea").value = prettyJsonString;
    visible.style.display = "inline-block";
    return colorState;
  } catch (error) {
    if (error) {
      colorState = error;
      return colorState;
    }
  }
};

const clearEntireThing = () => {
  let jsonDataInput = document.getElementById("jsonDataArea").value;
  let infoArea = document.getElementById("infoArea").innerText;

  if (
    jsonDataInput.length != 0 ||
    (jsonDataInput != " " && infoArea === "Watch this space for information!")
  ) {
    document.getElementById("jsonDataArea").value = "";
    document.getElementById("jsonDataArea").style.backgroundColor = "#FFFFFF";
    document.getElementById("infoArea").style.background = "#FFFFFF";
  }
  if (
    jsonDataInput.length != 0 ||
    (jsonDataInput != " " && infoArea != "Watch this space for information!")
  ) {
    document.getElementById("jsonDataArea").value = "";
    document.getElementById("infoArea").innerText = defaultInfoMsg;
    document.getElementById("jsonDataArea").style.backgroundColor = "#FFFFFF";
    document.getElementById("infoArea").style.background = "#FFFFFF";
  }
  visible.style.display = "none";
};

const checkThenWarn = () => {
  const jsonDataInput = document.getElementById("jsonDataArea").value;
  if (
    jsonDataInput.length == 0 ||
    jsonDataInput == "" ||
    jsonDataInput == " "
  ) {
    alert("Enter json data to validate");
  } else {
    let res = validateJSON();
    if (res != "pass") {
      //error if not pass
      document.getElementById("jsonDataArea").style.backgroundColor = "#FFF7F7";
      document.getElementById("infoArea").style.backgroundColor = "#FFF7F7";
      document.getElementById("infoArea").innerText = res;
    } else {
      //okay if pass
      document.getElementById("jsonDataArea").style.backgroundColor = "#D1FFBD";
      let infoArea = document.getElementById("infoArea");
      if (infoArea != "Watch this space for information!") {
        document.getElementById("infoArea").style.backgroundColor = "#D1FFBD";
        document.getElementById("infoArea").innerText = "JSON is valid!";
      }
    }
  }
};

const downloadJSONFile = () => {
  const jsonDataInput = document.getElementById("jsonDataArea").value;
  if (
    jsonDataInput.length == 0 ||
    jsonDataInput == "" ||
    jsonDataInput == " "
  ) {
    alert("Enter json data to validate");
  } else {
    const fileName = "download.json";

    const blob = new Blob([jsonDataInput], { type: "text/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

const structJSONToXMLdownload = () => {
  const jsonDataInput = document.getElementById("jsonDataArea").value;
  if (
    jsonDataInput.length == 0 ||
    jsonDataInput == "" ||
    jsonDataInput == " "
  ) {
    alert("Enter json data to validate");
  } else {
    const xml = json2xml(jsonDataInput, { compact: true, spaces: 4 });
    const fileName = "download.xml";

    const blob = new Blob([xml], { type: "text/xml" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

let cleanerTimeout;

//Focus moved
document.getElementById("jsonDataArea").addEventListener("blur", () => {
  //Clear everything in 1 min
  if (cleanerTimeout) {
    clearTimeout(cleanerTimeout);
  }
  cleanerTimeout = setTimeout(clearEntireThing, 60000);
});

// Add focus
document.getElementById("jsonDataArea").addEventListener("focus", () => {
  // Clear the timeout if the input regains focus
  if (cleanerTimeout) {
    clearTimeout(cleanerTimeout);
    cleanerTimeout = null; // Clear the timeout ID
  }
});

validateBtn.addEventListener("click", checkThenWarn);

clearBtn.addEventListener("click", clearEntireThing);

dlJsonBtn.addEventListener("click", downloadJSONFile);

dlXMLtn.addEventListener("click", structJSONToXMLdownload);
