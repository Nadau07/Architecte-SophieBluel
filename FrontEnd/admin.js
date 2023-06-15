
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".modal-close");
const ajoutImg = document.querySelector(".modal-ajout");
const suppImg = document.querySelector(".modal-supp");
const btnModal = document.querySelector(".modal-btn");
const modal2 = document.querySelector(".modal2-container");
const precedent = document.querySelector("#precedent");
const imageUpload = document.querySelector("#image_uploads");
const imgPrevisuel = document.querySelector("#icone_previsuel");
const btnAjoutImgModal2 = document.querySelector(".btn-ajout-photo");
const gallery = document.querySelector(".gallery");
const figureGallery1 = document.querySelector("figure1");
const boutonValider = document.querySelector(".modal2-valider");
const titreModal2 = document.querySelector(".titreModal2");
const closeModal2 = document.querySelector(".modal2-close");


//console.log(imageUpload);
//console.log(icone_previsuel);


 ///////// AFFICHAGE DES MODALES /////////

//AFFICHER-MASQUER LA MODALE 1 ET 2 //
function afficherModal() {
  modal.style.display = "block";
};
function masquerModal() {
  modal.style.display = "none";
};
function masquerModal2(){
  modal2.style.display="none";
}
btnModal.addEventListener("click", afficherModal);
closeModal.addEventListener("click", masquerModal);
closeModal2.addEventListener("click", masquerModal2);

// MODALE 1 : afficher les projets //
async function displayModalImg(works) {
  const gallery2 = document.querySelector(".gallery2");
  gallery2.innerHTML = "";
  works.forEach((work) => {
    const figureElement2 = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;
    workImg.dataset.indexId = work.id;
    const workP = document.createElement("p");
    workP.innerText = "éditer";
    const iconeDelet = document.createElement("div");
    iconeDelet.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    iconeDelet.classList.add("iconeDelet");

    //Supprimer un element en cliquant sur l'icone corbeille//
    iconeDelet.addEventListener("click", () => {
      figureElement2.remove();
      figureGallery1.remove();
    });
    //// Supprimer toute la gallerie ( modale 1)////
    suppImg.addEventListener("click", ()=>{
      gallery2.innerHTML="";
      gallery.innerHTML=""; //supp aussi la gallerie sur index.html//
    });


    const firstFigure = document.querySelector(".gallery2 figure:first-child");
    if (firstFigure && !firstFigure.querySelector(".iconePosition")) {
      const iconePosition = document.createElement("div");
      iconePosition.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
      iconePosition.classList.add("iconePosition");
      firstFigure.appendChild(iconePosition);
    }

    gallery2.appendChild(figureElement2);
    figureElement2.appendChild(workImg);
    figureElement2.appendChild(workP);
    figureElement2.appendChild(iconeDelet);
  });
};


//Ajouter une image dans la modale et l'index//

imageUpload.addEventListener("change", (event)=>{
  const selectedFile = event.target.files[0];
  window.selectedFile = selectedFile;
  affichagePrevisuel(selectedFile);
});

function affichagePrevisuel(selectedFile){
 
  const newImage = document.createElement("img");
  newImage.src = URL.createObjectURL(selectedFile);
  newImage.classList.add("modal2NewImg");
  imgPrevisuel.appendChild(newImage);

}


boutonValider.addEventListener("click", ()=>{
  if (window.selectedFile){
    
      const title = document.querySelector(".titreModal2").value;
      if (title === ""){
      const messageErreur = document.querySelector(".error-title");
      messageErreur.style.display="block";
      return;
    }
   
    addElementWithPhoto(window.selectedFile, title);
    }
  }
);

function addElementWithPhoto(photoFile, title){
  const newElement = document.createElement("div");
  const newImage = document.createElement("img");
  newImage.src = URL.createObjectURL(photoFile);
  const ajoutTitre = document.querySelector("figcaption");
  ajoutTitre.textContent = title;
  newElement.appendChild(newImage);
  newElement.appendChild(ajoutTitre);
  gallery.appendChild(newElement); 
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
  const boutonModif = document.querySelector(".btn-modifier2") 
  const filter = document.querySelector(".filter");

  const loginOk = () => (token ? true : false);

  if (loginOk()) {
    logStatus.innerHTML = "logout";
    boutonModifierModal.style.display = "block";
    boutonModif.style.display="block";
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
