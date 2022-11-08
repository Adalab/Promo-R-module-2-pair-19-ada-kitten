'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');


//Objetos con cada gatito
const kittenData_1 = {
    image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    name: "Anastacio",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_2 = {
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
    name: "Fiona",
    desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_3 = {
    image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
    name: "Cielo",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};

let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito ECHAR UN OJO, no añade gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;

    const newKittenDataObject = {
        name: valueName,
        desc: valueDesc,
        race: valueRace,
        photo: valuePhoto,
      };
    
    
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
        }
    }

    kittenDataList.push(newKittenDataObject);
    renderKittenList(kittenDataList);

    function clean(){
        inputDesc.value = "";
        inputPhoto.value = "";
        inputName.value = "";
        inputRace.value = "";
    }
  clean();
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceSearchText = input_search_race.value;
    listElement.innerHTML = "";

    //CON BUCLE
    // for (const kittenItem of kittenDataList) {
    //     if (kittenItem.desc.includes(descrSearchText)) {
    //         listElement.innerHTML += renderKitten(kittenItem);
    //     }
    // }

    //CON MÉTODO FILTER
    // const descrFilter = kittenDataList.filter((eachKitten) => eachKitten.desc.includes(descrSearchText)); renderKittenList(descrFilter);

    //CON MÉTODO FILTER ANIDADO PARA DESC Y RACE
    const kittenListFiltered = kittenDataList
    .filter((eachKitten) => eachKitten.desc.includes(descrSearchText))
    .filter((eachKitten) => eachKitten.race.includes(raceSearchText));
    //Vuelve a pintar el listado de gatitos filtrados en el HTML.
    renderKittenList(kittenListFiltered);
}

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);

/////////2.13. Peticiones al servidor.
//Obtener listado de gatitos desde el servidor

const GITHUB_USER = '<Aliripoll>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

fetch(SERVER_URL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then((response) => response.json())
  .then((data) => {
    kittenDataList = data.results;
    renderKittenList(kittenDataList);
  });
  
  
  
  
  
  



