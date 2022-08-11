// console.log("JavaScript");
// ! Initially both the box will be hidden
let paramsBox = (document.getElementById("parametersBox").style.display =
  "none");
let jsonBox = (document.getElementById("jsonBox").style.display = "none");
// console.log(parametersBox);

// ? Click json radio, params box will be hide
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("jsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});
// ? On clicking of params radio , Json box will be hidden
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "block";
  document.getElementById("jsonBox").style.display = "none";
});

//  ! if the user click on + button more parameters box will be visible
// ? let's see how ?
let addParambtn = document.getElementById("addparambtn");
let addParamsBox = document.getElementById("addParamsBox");
let counter = 2;
addParambtn.addEventListener("click", () => {
  let html = `<div class="row mb-2 allParams">
    <legend class="col-form-label col-sm-2 pt-0">Parameter ${counter}</legend>
    <div class="col col-md-5">
      <input type="text" class="form-control" id="key${counter}" placeholder="Enter Key ${counter}" aria-label="First name" />
    </div>
    <div class="col col-md-4">
      <input type="text" class="form-control" id="value${counter}" placeholder="Enter Value ${counter}" aria-label="Last name"/>
    </div>
    <div class="col">
      <button class="btn btn-primary removeBtn">-</button>
    </div>
  </div>`;
  addParamsBox.innerHTML += html;
  counter++;
  //   ! Deleting element if someone clicks on (-) btn
  let deleteParam = document.getElementsByClassName("removeBtn");
  for (const item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  }
});

// ? What if someone click on submit button
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
  // console.log("submit");
  //?   For fun .. Ask user to show some patience while we are fetching data
  let response = document.getElementById("responseText");
  response.value = "Please wait...We are fetching response ";
  //   Get all the data from user
  let url = document.getElementById("url").value;
  let reqType = document.querySelector("input[name='req']:checked").value;
  contentType = document.querySelector("input[name='content']:checked").value;
  // console.log("URL " + url);
  // console.log("reqType " + reqType);
  // console.log("Content " + contentType);

  if (contentType == "PARAMS") {
    var data = {};
    for (let i = 0; i < counter + 1; i++) {
      if (document.getElementById("key" + (i + 1)) != undefined) {
        let key = document.getElementById("key" + (i + 1)).value;
        let value = document.getElementById("value" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
    // console.log(data);
  } else {
    var data = document.getElementById("jsonText").value;
    // console.log(data);
  }

  // ! if user chooses post request
  if (reqType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // console.log(text);
        document.getElementById("responseText").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // console.log(text);
        document.getElementById("responseText").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
