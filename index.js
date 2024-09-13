const contentArea = document.querySelector("#contentContainer");
const navContainer = document.querySelector("#navContainer");
const inforContainer = document.querySelector("#inforContainer");
const sideBar = document.querySelector("#sideContainer");

const sideButton = document.querySelector(".sideButton");
const alltab = document.querySelector(".nav");
const informationTab = document.querySelector("#informationTab");
const complexityTab = document.querySelector("#complexityTab");
const demandTab = document.querySelector("#demandTab");
const incomeTab = document.querySelector("#incomeTab");

const largeTreeCategory = document.querySelector("#largeTreeCategory");
const smallTreeCategory = document.querySelector("#smallTreeCategory");
const flowerCategory = document.querySelector("#flowerCategory");
const vineCategory = document.querySelector("#vineCategory");
const fastGrowPlantCategory = document.querySelector("#fastGrowPlantCategory");

const searchForm = document.querySelector("#searchForm");
const searchText = document.querySelector("#searchText");
const spinnerSearch = document.querySelector(".spinner-border");
const resultNumber = document.querySelector("#resultList");
//const acre = document.querySelector("#acre");
const incomePerYear = document.querySelector("#incomePerYear");
let activeTarget = "";
const submitForm = document.querySelector("#submitForm");

const submitSearch = (event) => {
  event.preventDefault();
  const query = searchText.value;
  sideBar.innerHTML = "";

  fetch("./myfarm.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      const { myfarm } = data;
      const plants = myfarm.plants;
      let numberList = 0;
      spinnerSearch.classList.remove("spinnerHidden");

      setTimeout(() => {
        spinnerSearch.classList.add("spinnerHidden");
        plants.forEach((plant) => {
          if (plant.name[0].toLowerCase() == query[0].toLowerCase()) {
            numberList += 1;
            const newSideBar = `
            <button id="${plant.name}SideButton" type="button" class="btn sideButton" name="${plant.name}">
            <div class="row align-items-start">
              <div class="col-3 p-2">
                <img src="${plant.icon}" class="sideBarIcon" />
              </div>
              <div class="col-9 text-start">
                ${plant.name} Farm
                <div
                  class="shortDescription text-start badge text-wrap text-secondary fw-lighter fst-italic"
                >
                  ${plant.shortDescription}
                </div>
              </div>
            </div>
          </button> 
        `;
            sideBar.insertAdjacentHTML("beforeend", newSideBar);
          }
          resultNumber.innerHTML = numberList;
        });
      }, 500);
    })

    .catch((error) => console.error("Unable to fetch", error));
};

const sideBarFunc = (event) => {
  sideBar.innerHTML = "";
  spinnerSearch.classList.remove("spinnerHidden");

  fetch("./myfarm.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      const { myfarm } = data;
      const plants = myfarm.plants;
      let numberList = 0;

      setTimeout(() => {
        spinnerSearch.classList.add("spinnerHidden");

        const target = event.delegateTarget.activeElement.id;

        plants.forEach((plant) => {
          if (plant.category == target) {
            numberList += 1;
            const newSideBar = `
        <button id="${plant.name}SideButton" type="button" class="btn sideButton" name="${plant.name}">
              <div class="row align-items-start">
                <div class="col-3 p-2">
                  <img src="${plant.icon}" class="sideBarIcon" />
                </div>
                <div class="col-9 text-start">
                  ${plant.name} Farm
                  <div
                    class="shortDescription text-start badge text-wrap text-secondary fw-lighter fst-italic"
                  >
                    ${plant.shortDescription}
                  </div>
                </div>
              </div>
            </button> 
        `;
            sideBar.insertAdjacentHTML("beforeend", newSideBar);
          }
          resultNumber.innerHTML = numberList;
        });
      }, 500);
    })

    .catch((error) => console.error("Unable to fetch", error));
};

const sideButtonHandler = (event) => {
  contentArea.innerHTML = "";
  fetch("./myfarm.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      const { myfarm } = data;
      const plants = myfarm.plants;

      setTimeout(() => {
        const target = event.delegateTarget.activeElement.name;

        const newTab = `
        <ul class="nav nav-tabs" id="allTab">
              <li class="nav-item" id="informationTab" name="information">
                <a class="nav-link active" id="informationTab"  href="#">Information</a>
              </li>
              <li class="nav-item" >
                <a class="nav-link"  id="complexityTab" name="complexity" href="#">Complexity</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="demandTab" name="demand" href="#">Demand</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="incomeTab" name="income" href="#">Income</a>
              </li>
            </ul>
        `;
        contentArea.insertAdjacentHTML("beforeend", newTab);

        plants.forEach((plant) => {
          if (plant.name == target) {
            const newContent = `
        <div class="container" id="information">
              <p>
                ${plant.description}
              </p>
              <img
                class="rounded img-thumbnail"
                src="${plant.image}"
              />
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th>soil type :</th>
                    <td>${plant.soilType}</td>
                  </tr>
                  <tr>
                    <th>soil depth :</th>
                    <td>${plant.soilDepth}</td>
                  </tr>
                  <tr>
                    <th>weather :</th>
                    <td>${plant.weather}</td>
                  </tr>
                  <tr>
                    <th>light exposure :</th>
                    <td>${plant.lightExposure}</td>
                  </tr>
                  <tr>
                    <th>water :</th>
                    <td>${plant.water}</td>
                  </tr>
                  <tr>
                    <th>duration :</th>
                    <td>${plant.duration}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        `;
            contentArea.insertAdjacentHTML("beforeend", newContent);
            activeTarget = target;
          }
        });
      }, 500);
    })

    .catch((error) => console.error("Unable to fetch", error));
};

const tabHandler = (event) => {
  if (event.target.id == "incomeForm" || event.target.id == "acre") {
    incomeCalculate(event);
    return 0;
  }

  fetch("./myfarm.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      const { myfarm } = data;
      const plants = myfarm.plants;
      const target = event.delegateTarget.activeElement.name;

      const toInactive = document.querySelector(".nav-link.active");
      if (toInactive) {
        toInactive.classList.remove("active");
      }

      const toActive = event.target.closest(".nav-link");
      //const toActive = document.querySelector(`#${target}Tab`);
      if (toActive) {
        toActive.classList.add("active");
      }
      const contentArea = document.querySelector("#information");
      contentArea.innerHTML = "";

      let newContent = "";

      plants.forEach((plant) => {
        if (plant.name == activeTarget) {
          console.dir(event);
          if (target == "complexity") {
            newContent = `
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: ${plant.complexity}%">${plant.complexity}%</div>
        </div>
        `;
          } else if (target == "demand") {
            newContent = `
            <img class="img-big" src="${plant.demandImage}" />
            `;
          } else if (target == "income") {
            newContent = `
            <div id="incomeForm" class="incomeForm mb-3">
              <label for="acre" class="col-form-label"
                >Your land measure in acre </label
              ><input
                class="form-control"
                type="number"
                id="acre"
                name="acre"
              />
            </div>
            <p class="col-lg-10 incomeForm">
              Your income per year = <span id="incomePerYear"> 0</span>
            </p>
          </div>
            `;
          } else {
            //information
            newContent = `
            <div class="container" id="information">
            <p>
              ${plant.description}
            </p>
            <img
              class="rounded img-thumbnail"
              src="${plant.image}"
            />
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>soil type :</th>
                  <td>${plant.soilType}</td>
                </tr>
                <tr>
                  <th>soil depth :</th>
                  <td>${plant.soilDepth}</td>
                </tr>
                <tr>
                  <th>weather :</th>
                  <td>${plant.weather}</td>
                </tr>
                <tr>
                  <th>light exposure :</th>
                  <td>${plant.lightExposure}</td>
                </tr>
                <tr>
                  <th>water :</th>
                  <td>${plant.water}</td>
                </tr>
                <tr>
                  <th>duration :</th>
                  <td>${plant.duration}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
          }
          contentArea.innerHTML = newContent;
        }
      });
    })

    .catch((error) => console.error("Unable to fetch", error));
};

const incomeCalculate = (event) => {
  const acreNumber = document.querySelector("#acre").value;

  fetch("./myfarm.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      const { myfarm } = data;
      const plants = myfarm.plants;

      plants.forEach((plant) => {
        if (plant.name == activeTarget) {
          let newIncomePerYear = plant.incomePerAcre;
          console.log(newIncomePerYear);
          newIncomePerYear *= acreNumber;
          const newincome = document.querySelector("#incomePerYear");
          newincome.innerHTML = newIncomePerYear;
          console.log(newIncomePerYear);
          console.log(acreNumber);
        }
      });
    })

    .catch((error) => console.error("Unable to fetch", error));
};

sideButton.addEventListener("click", sideButtonHandler);
alltab.addEventListener("click", tabHandler);

flowerCategory.addEventListener("click", sideBarFunc);
largeTreeCategory.addEventListener("click", sideBarFunc);
vineCategory.addEventListener("click", sideBarFunc);
fastGrowPlantCategory.addEventListener("click", sideBarFunc);
smallTreeCategory.addEventListener("click", sideBarFunc);

searchForm.addEventListener("submit", submitSearch);

function openNav() {
  const sideBar = document.querySelector("#sideContainer");
  const toggle = document.querySelector("#main");

  if (sideBar.style.width == "250px") {
    sideBar.style.width = "0px";
    toggle.style.marginLeft = "0px";
  } else if (sideBar.style.width == "0px") {
    sideBar.style.width = "250px";
    toggle.style.marginLeft = "250px";
  } else if (sideBar.style.width == "") {
    sideBar.style.width = "250px";
    toggle.style.marginLeft = "250px";
  }
}
