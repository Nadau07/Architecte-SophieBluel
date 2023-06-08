//MODALE 1 //
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".modal-close");
const ajoutImg = document.querySelector(".modal-ajout");
const suppImg = document.querySelector(".modal-supp");
const btnModal = document.querySelector(".modal-btn");
const modal2 = document.querySelector(".modal2-container");
const precedent = document.querySelector("#precedent");



//AFFICHER-MASQUER LA MODALE//
function afficherModal() {
  modal.style.display = "block";
}
function masquerModal() {
  modal.style.display = "none";
}
btnModal.addEventListener("click", afficherModal);
closeModal.addEventListener("click", masquerModal);

//IMAGES dans modale//
async function displayModalImg(works) {
  const gallery2 = document.querySelector(".gallery2");
  gallery2.innerHTML = "";
  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;
    const workP = document.createElement("p");
    workP.innerText = "éditer";

    gallery2.appendChild(figureElement);
    figureElement.appendChild(workImg);
    figureElement.appendChild(workP);
  });
}


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
    barreEdition.style.display = "block";
    boutonModifier2.style.display = "block";
    filter.style.display = "none";
    //cliquer sur Logout pour se déconnecter
    logStatus.addEventListener("click", () => {
      localStorage.clear("token");
      console.log("déconnecter");
      window.location.href = "./index.html";
    });
  }
}

updateLogin();


//MODALE 2//

//Afficher les categories dans le menu déroulant //

async function displayListeDeroulante(categories){
  const listeDeroulante = document.querySelector(".categoriesModal2");
    //console.log(listeDeroulante);
  categories.forEach((category)=>{
    const options = document.createElement("option");
    options.innerText = category.name;
    console.log(options)
    listeDeroulante.appendChild(options);
  
  })

}

//Retour a la 1ere modale//
precedent.addEventListener("click", ()=>{
  afficherModal();
  modal2.style.display="none";
});
// Passer a la seconde modale (Ajouter une photo)//
ajoutImg.addEventListener("click", ()=>{
  modal2.style.display="block";
  modal.style.display="none";
});



async function init() {
  const works = await getWorks();
  const categories = await getCategories();
  displayModalImg(works);
  displayListeDeroulante(categories);
}

init();
