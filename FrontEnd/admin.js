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
  const boutonModif = document.querySelector(".btn-modifier2");
  const filter = document.querySelector(".filter");

  const loginOk = () => (token ? true : false);

  if (loginOk()) {
    logStatus.innerHTML = "logout";
    boutonModifierModal.style.display = "block";
    boutonModif.style.display = "block";
    barreEdition.style.display = "flex";
    boutonModifier2.style.display = "block";
    filter.style.display = "none";
    //cliquer sur Logout pour se déconnecter
    logStatus.addEventListener("click", () => {
      localStorage.clear("token");
      console.log("déconnecter");
    });
  }
}

///////// AFFICHAGE DES MODALES /////////

//AFFICHER-MASQUER LA MODALE 1 ET 2 //
function afficherModal() {
  modal.style.display = "block";
}
function masquerModal() {
  modal.style.display = "none";
}
function masquerModal2() {
  modal2.style.display = "none";
}
btnModal.addEventListener("click", afficherModal);
closeModal.addEventListener("click", masquerModal);
closeModal2.addEventListener("click", masquerModal2);

//AFFICHER LA MODALE 2 (bouton : Ajouter une photo)//
ajoutImg.addEventListener("click", () => {
  modal2.style.display = "block";
  modal.style.display = "none";
});
//RETOUR A LA MODALE 1 (bouton : <- ) //
precedent.addEventListener("click", () => {
  afficherModal();
  modal2.style.display = "none";
});

// MODALE 2 : menu déroulant : (categories) //

function displayListeDeroulante(categories) {
  const listeDeroulante = document.querySelector(".categoriesModal2");
  //console.log(listeDeroulante);
  categories.forEach((category) => {
    const options = document.createElement("option");
    options.innerText = category.name;
    //console.log(options)
    listeDeroulante.appendChild(options);
  });
}


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
    iconeDelet.setAttribute("data-id", work.id);

    //Supprimer un projet avec l'icone //
    async function deleteWorks(id) {
      const token = window.localStorage.getItem("token");
      console.log(token);

      await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Suppression réussie");
            const figureIndex = document.querySelectorAll(".gallery figure");
            const figureModal = document.querySelectorAll(".gallery2 figure");
            console.log(figureIndex);
            console.log(figureModal);
          } else if (response.status === 401) {
            console.log("Erreur dans l’identifiant ou le mot de passe+");
          }
        })
        .catch((error) => {
          console.log(
            "Une erreur s'est produite lors de la suppression :",
            error
          );
        });
         const works = await getWorks();
        const categories = await getCategories();
        displayModalImg(works);
        displayWorks(works);

    }

    iconeDelet.addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.currentTarget.getAttribute("data-id");
      deleteWorks(id);
    });

    //// Supprimer toutes les photos( modale 1)////
    suppImg.addEventListener("click", (event) => {
      event.preventDefault();
      gallery2.innerHTML = "";
      gallery.innerHTML = ""; //supp aussi la gallerie sur index.html//
    });


    const firstFigure = document.querySelector(".gallery2 figure:first-child");
    if (firstFigure && !firstFigure.querySelector(".iconePosition")) {
      const iconePosition = document.createElement("div");
      iconePosition.innerHTML =
        '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
      iconePosition.classList.add("iconePosition");
      firstFigure.appendChild(iconePosition);
    }

    gallery2.appendChild(figureElement2);
    figureElement2.appendChild(workImg);
    figureElement2.appendChild(workP);
    figureElement2.appendChild(iconeDelet);
  });
}

//Ajouter une image dans la modale et l'index//



function addElementPhoto(photoFile, title, gallery) {
  const newFigure = document.createElement("figure"); // Création d'une nouvelle balise <figure>
  const newImage = document.createElement("img");
  newImage.src = URL.createObjectURL(photoFile);
  const ajoutTitre = document.createElement("figcaption");
  ajoutTitre.textContent = title;
  newFigure.appendChild(newImage);
  newFigure.appendChild(ajoutTitre);
  gallery.appendChild(newFigure);
}

function addWorks(){
  const token = window.localStorage.getItem("token");
  console.log(token);

  fetch (`http://localhost:5678/api/works`,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
  })
  .then((response)=>{
    if (response.status === 200){
      console.log("Image ajoutée");
      addElementPhoto(window.selectedFile, title);
      boutonValider.style.backgroundColor = "#1D6154";
      boutonValider.style.color ="white";
    } else if (response.status === 401){
      const messageErreur = document.querySelector(".error-title");
      messageErreur.style.display = "block";
    } else if ( response.status === 401){
      const messageErreur2 = document.querySelector(".error-log");
      messageErreur2.style.display="block";
    }
  })
.catch((error) =>{
  console.log(error);
})
};

imageUpload.addEventListener("change", (event) => {
  event.preventDefault();
  const selectedFile = event.target.files[0]; //extrait le fichier
  window.selectedFile = selectedFile; //stocke le fichier
});

boutonValider.addEventListener("click", () => {
  if (window.selectedFile) {
    const title = document.querySelector(".titreModal2").value;
    if (title === "") {
      const messageErreur = document.querySelector(".error-title");
      messageErreur.style.display = "block";
      return;
    }
    addElementPhoto(window.selectedFile, title, gallery);
  }
  addWorks()
});










async function init() {
  const works = await getWorks();
  const categories = await getCategories();
  displayModalImg(works);
  displayListeDeroulante(categories);
  updateLogin();
}

init();
