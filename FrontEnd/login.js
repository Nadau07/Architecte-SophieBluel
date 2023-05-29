/* Compte de test Sophie Bluel:

email: sophie.bluel@test.tld
password: S0phie 
'http://localhost:5678/api/users/login'

Message erreur a afficher " Erreur dans l’identifiant ou le mot de passe "
*/

const form = document.getElementById("loginForm");
//console.log(form)     
form.addEventListener("submit", (event) => {
  event.preventDefault(); //empeche le comportement par defaut de submit

  let BaliseEmail = document.getElementById("email");
  let email = BaliseEmail.value;
  let BalisePassword = document.getElementById("password");
  let password = BalisePassword.value;
  console.log(email);
  console.log(password);

Login(email,password);
});

async function Login(email, password) {
    const User = {
      email: "sophie.bluel@test.tld",
      password: "S0phie",
    };
  
    const optionRequete = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(User),
    };
  
    try {
      const response = await fetch(
        "http://localhost:5678/api/users/login",
        optionRequete
      );
      const resultat = await response.json();
      console.log(resultat);
    } catch (error) {
      console.error(
        "Erreur dans l’identifiant ou le mot de passe " + error.message
      );
      }

}
Login(email,password);

/*const ErreurMessage = document.getElementById("erreur-message");
Servira pour mettre le message d'erreur 


 if (email === User.email && password === User.password){
window.location.href ="./index.html //redirection vers page d'accueil/

} else {

ErreurMessage.innerText = "Erreur dans l’identifiant ou le mot de passe"


*/
