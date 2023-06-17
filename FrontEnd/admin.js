
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
const boutonValider = document.querySelector(".modal2-valider");
const titreModal2 = document.querySelector(".titreModal2");
const closeModal2 = document.querySelector(".modal2-close");



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
    
    iconeDelet.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const works = await getWorks();
        
        figureElement2.remove(); 
        displayWorks(works);
    
        for (const element of works) {
          const id = element.id; 
          await DeleteElementApi(id);
        }
      } catch (error) {
        console.log(error);
      }
    });
    
    async function DeleteElementApi(id) {
      const token = localStorage.getItem("token"); 
    
      const optionDelete = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
      
      try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, optionDelete);
        const resultat = await response.json();
        
        if (response.status === 200) {
          return false;
        } else {
          ErreurMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
        }
      } catch (error) {
        console.error("Erreur dans l’identifiant ou le mot de passe " + error.message);
      }
    }
    
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

async function uploadImgApi() {
  const token = localStorage.getItem("token");
  const gallery = document.querySelector(".gallery");

  const optionUpload = {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: new FormData()
  };

  optionUpload.body.append("image", window.selectedFile);
  optionUpload.body.append("title", document.querySelector(".titreModal2").value);

  try {
    const response = await fetch(`http://localhost:5678/api/works`, optionUpload);
    const resultat = await response.json();
    const title = document.querySelector(".titreModal2").value;
    const boutonValider = document.querySelector("#boutonValider"); // Récupère le boutonValider
    const gallery = document.querySelector("#gallery"); // Récupère l'élément gallery

    if (response.status === 200) {
      console.log("Image ajoutée");
      boutonValider.style.backgroundColor = "#1D6154";
      boutonValider.style.color = "white";
      addElementPhoto(window.selectedFile, title, gallery); // Appel modifié avec les arguments requis
    } else if (response.status === 400 && title === "") {
      const messageErreur = document.querySelector(".error-title");
      messageErreur.style.display = "block";
      return;
    } else if (response.status === 401) {
      const messageErreur2 = document.querySelector(".error-log");
      messageErreur2.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

imageUpload.addEventListener("change", (event) => {
  event.preventDefault();
  const selectedFile = event.target.files[0];
  window.selectedFile = selectedFile;
});

boutonValider.addEventListener("click", () => {
  if (window.selectedFile) {
    const title = document.querySelector(".titreModal2").value;
    if (title === "") {
      const messageErreur = document.querySelector(".error-title");
      messageErreur.style.display = "block";
      return;
    }
    addElementPhoto(window.selectedFile, title, gallery); // Appel modifié avec les arguments requis
  }
});

function addElementPhoto(photoFile, title, gallery) {
  const newFigure = document.createElement("figure"); // Crée un nouvel élément <figure>
  const newImage = document.createElement("img");
  newImage.src = URL.createObjectURL(photoFile);
  const ajoutTitre = document.createElement("figcaption");
  ajoutTitre.textContent = title;
  newFigure.appendChild(newImage);
  newFigure.appendChild(ajoutTitre);
  gallery.appendChild(newFigure);
}





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



async function init() {
  const works = await getWorks();
  const categories = await getCategories();
  displayModalImg(works);
  displayListeDeroulante(categories);
  updateLogin();
};

init();
