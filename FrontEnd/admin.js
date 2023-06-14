
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".modal-close");
const ajoutImg = document.querySelector(".modal-ajout");
const suppImg = document.querySelector(".modal-supp");
const btnModal = document.querySelector(".modal-btn");
const modal2 = document.querySelector(".modal2-container");
const precedent = document.querySelector("#precedent");
const imageUpload = document.querySelector("input");
const imgPrevisuel = document.querySelector("#icone_previsuel");

console.log(imageUpload);
console.log(icone_previsuel);

//UPLOAD UNE NOUVELLE IMAGE//

/*function updateImgDisplay(){
  while(imgPrevisuel.firstChild){
    imgPrevisuel.removeChild(imgPrevisuel)
  }; //vide le contenu (icone)
};*/




 ///////// AFFICHAGE DES MODALES /////////

//AFFICHER-MASQUER LA MODALE 1 //
function afficherModal() {
  modal.style.display = "block";
};
function masquerModal() {
  modal.style.display = "none";
};
btnModal.addEventListener("click", afficherModal);
closeModal.addEventListener("click", masquerModal);

// MODALE 1 : afficher les projets //
async function displayModalImg(works) {
  const gallery2 = document.querySelector(".gallery2");
  gallery2.innerHTML = "";
  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;
    const workP = document.createElement("p");
    workP.innerText = "éditer";
    const iconeDelet = document.createElement("div");
    iconeDelet.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    iconeDelet.classList.add("iconeDelet");
    const firstFigure = document.querySelector(".gallery2 figure:first-child");
    if (firstFigure && !firstFigure.querySelector(".iconePosition")) {
      const iconePosition = document.createElement("div");
      iconePosition.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
      iconePosition.classList.add("iconePosition");
      firstFigure.appendChild(iconePosition);
    }

    gallery2.appendChild(figureElement);
    figureElement.appendChild(workImg);
    figureElement.appendChild(workP);
    figureElement.appendChild(iconeDelet);

    
  });
};



//AFFICHER LA MODALE 2 (bouton : Ajouter une photo)//
ajoutImg.addEventListener("click", ()=>{
  modal2.style.display="block";
  modal.style.display="none";
});
//RETOUR A LA MODALE 1 (bouton : <- ) //
precedent.addEventListener("click", ()=>{
  afficherModal();
  modal2.style.display="none";
});



// MODALE 2 : menu déroulant : (categories) //

 function displayListeDeroulante(categories){
  const listeDeroulante = document.querySelector(".categoriesModal2");
    //console.log(listeDeroulante);
  categories.forEach((category)=>{
    const options = document.createElement("option");
    options.innerText = category.name;
    //console.log(options)
    listeDeroulante.appendChild(options);
  
  });
};

//MODE ADMINISTRATEUR : LogIn OK//
function updateLogin() {
  const logStatus = document.querySelector(".login-link");
  //console.log(logStatus)
  const token = localStorage.getItem("token");
  //console.log(tokken);
  const boutonModifierModal = document.querySelector(".modal-btn"); 
  const barreEdition = document.querySelector(".barreEdition"); 
  const boutonModifier2 = document.querySelector(".btn-modifier"); 
  const filter = document.querySelector(".filter");

  const loginOk = () => (token ? true : false);

  if (loginOk()) {
    logStatus.innerHTML = "logout";
    boutonModifierModal.style.display = "block";
    barreEdition.style.display = "flex";
    boutonModifier2.style.display = "block";
    filter.style.display = "none";
    //cliquer sur Logout pour se déconnecter
    logStatus.addEventListener("click", () => {
      localStorage.clear("token");
      console.log("déconnecter");
    });
  };
};









async function init() {
  const works = await getWorks();
  const categories = await getCategories();
  displayModalImg(works);
  displayListeDeroulante(categories);
  updateLogin();
  //updateImgDisplay()
};

init();
