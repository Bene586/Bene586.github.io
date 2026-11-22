// 1. Mode sombre : le choix est gardé dans le navigateur
var racine = document.documentElement;
var boutonTheme = document.getElementById("theme");

function appliquer(mode) {
  racine.setAttribute("data-theme", mode);
  var sombre = mode === "dark";
  boutonTheme.textContent = sombre ? "Mode clair" : "Mode sombre";
  boutonTheme.setAttribute("aria-pressed", String(sombre));
}

var choix = null;
try { choix = localStorage.getItem("theme"); } catch (e) {}
if (!choix) {
  choix = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
appliquer(choix);

boutonTheme.addEventListener("click", function () {
  var suivant = racine.getAttribute("data-theme") === "dark" ? "light" : "dark";
  appliquer(suivant);
  try { localStorage.setItem("theme", suivant); } catch (e) {}
});

// 2. Copier l’adresse e-mail
var boutonCopier = document.getElementById("copier");
var etat = document.getElementById("etat");
var adresse = document.getElementById("adresse").textContent;

boutonCopier.addEventListener("click", function () {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(adresse).then(function () {
      etat.textContent = "Adresse copiée";
    }, function () {
      etat.textContent = "Copie impossible, sélectionne l’adresse à la main";
    });
  } else {
    etat.textContent = "Copie impossible, sélectionne l’adresse à la main";
  }
});
