const validateBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let defaultErrMsg = "Watch this space for error!";

const validateJSON = () => {
  const jsonDataInput = document.getElementById("jsonDataArea").value.trim();
  let boolState;
  if (jsonDataInput.length == 0 || jsonDataInput == " ") {
    alert("Enter json data to validate");
  } else {
    try {
      boolState = JSON.parse(jsonDataInput, null, 2);
      if (boolState) {
        document.getElementById("jsonDataArea").style.backgroundColor =
          "#D1FFBD";
        let errorMsg = document.getElementById("errorMsg");
        if (errorMsg != "Watch this space for error!") {
          document.getElementById("errorMsg").innerText = defaultErrMsg;
        }
      }
    } catch (error) {
      if (error) {
        document.getElementById("jsonDataArea").style.backgroundColor =
          "#FFF7F7";
        document.getElementById("errorMsg").innerText = error;
      }
    }
  }
};

const clearEntireThing = () => {
  let jsonDataInput = document.getElementById("jsonDataArea").value;
  let errorMsg = document.getElementById("errorMsg").innerText;

  if (
    jsonDataInput.length != 0 ||
    (jsonDataInput != " " && errorMsg === "Watch this space for error!")
  ) {
    document.getElementById("jsonDataArea").value = "";
    document.getElementById("jsonDataArea").style.backgroundColor = "#FFFFFF";
  }
  if (
    jsonDataInput.length != 0 ||
    (jsonDataInput != " " && errorMsg != "Watch this space for error!")
  ) {
    document.getElementById("jsonDataArea").value = "";
    document.getElementById("errorMsg").innerText = defaultErrMsg;
    document.getElementById("jsonDataArea").style.backgroundColor = "#FFFFFF";
  }
};

validateBtn.addEventListener("click", validateJSON);

clearBtn.addEventListener("click", clearEntireThing);
