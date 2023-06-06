
//MODALE//
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".modal-close");
const ajoutImg = document.querySelector(".modal-ajout");
const suppImg = document.querySelector(".modal-supp");
const btnModal = document.querySelector(".modal-btn");


function afficherModal(){
    modal.style.display ="flex";
}

function masquerModal(){
    modal.style.display = "none";
}

btnModal.addEventListener("click", afficherModal);
closeModal.addEventListener("click", masquerModal);

//FAIRE APPARAITRE: LogOut, Barre d'edition et bouton modifier//

const logStatus = document.querySelector(".login-link");
//console.log(logStatus)
const token = localStorage.getItem("token");
//console.log(tokken);
const boutonModifierModal = document.querySelector(".modal-btn");
const barreEdition = document.querySelector(".barreEdition");
const boutonModifier2 =document.querySelector(".btn-modifier");

const loginOk =() => (token ? true : false);

if(loginOk){
    logStatus.innerHTML ="Logout";
    boutonModifierModal.style.display="block";
      barreEdition.style.display="block";
      boutonModifier2.style.display="block";
      
}else{
    window.location.href="./index.html";
    logStatus.innerText ="Login";
    boutonModifierModal.style.display="none";
      barreEdition.style.display="none";
      boutonModifier2.style.display="none";

};

