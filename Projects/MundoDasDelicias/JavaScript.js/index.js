
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("foodCarousel");
  const progressBar = carousel.querySelector(".carousel-progress-bar");

  
  carousel.addEventListener("slide.bs.carousel", function () {
    progressBar.style.animation = "none";
    void progressBar.offsetWidth;
    progressBar.style.animation = "progress-animation 4s linear infinite";
  });
});


window.onscroll = function() {
    const stickyNavbar = document.querySelector('.sticky-navbar');
    const stickyBurguerNav = document.querySelector('.sticky-burguerNav');
    const strawFill = document.querySelector('.straw-fill');
    const smallStrawFill = document.querySelector('.small-straw-fill');
    const smallStrawContainer = document.querySelector('.small-straw-container');
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; 
    const fillPercentage = Math.min(scrollTop / maxScroll, 1) * 100; 

    strawFill.style.width = fillPercentage + '%'; 

    if (scrollTop >= 210) {
        stickyNavbar.classList.add('active');
        stickyBurguerNav.classList.add('active');
        smallStrawContainer.style.display = 'block'; 
        smallStrawFill.style.width = fillPercentage + '%'; 
    } else {
        stickyNavbar.classList.remove('active');
        stickyBurguerNav.classList.remove('active');
        smallStrawContainer.style.display = 'none'; 
    }
};


function searchRecipe(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) return;

    const recipePages = {
        // Entradas
        'entradas': '/MundoDasDelicias/Pages/Entradas.html',
        'bruschetta': '/MundoDasDelicias/Pages/Entradas.html#Bruschetta Italiana',
        'pasteis de bacalhau': '/MundoDasDelicias/Pages/Entradas.html#Pastéis de Bacalhau',
        
        // Sopas
        'sopas': '/MundoDasDelicias/Pages/Sopas.html',
        'caldo verde': '/MundoDasDelicias/Pages/Sopas.html#Caldo Verde',
        'sopa de legumes': '/MundoDasDelicias/Pages/Sopas.html#Sopa de Legumes',
        'creme de abobora': '/MundoDasDelicias/Pages/Sopas.html#Creme de Abóbora',
        
        // Pratos Principais
        'pratos principais': '/MundoDasDelicias/Pages/Pratos_Principais.html',
        'frango assado': '/MundoDasDelicias/Pages/Pratos_Principais.html#Frango Assado',
        'bacalhau com natas': '/MundoDasDelicias/Pages/Pratos_Principais.html#Bacalhau com Natas',
        'feijoada à portuguesa': '/MundoDasDelicias/Pages/Pratos_Principais.html#Feijoada à Portuguesa',

        // Sobremesas
        'sobremesas': '/MundoDasDelicias/Pages/Sobremesas.html',
        'mousse de chocolate': '/MundoDasDelicias/Pages/Sobremesas.html#Mousse de Chocolate',
        'pudim de leite': '/MundoDasDelicias/Pages/Sobremesas.html#Pudim de Leite',
        'pastel de nata': '/MundoDasDelicias/Pages/Sobremesas.html#Pastel de Nata',
        'azevias de batata doce': '/MundoDasDelicias/Pages/Sobremesas.html#Azevias de Batata Doce',
        // Adicione mais receitas conforme necessário
    };
    

    const recipeRegexes = {
     // Entradas
     'entradas': /entrada/i,
     'bruschetta': /bruschetta|bruscheta/i, 
     'pasteis de bacalhau': /pasteis.*bacalhau|pastel.*bacalhau/i, 

     //Sopas
     'sopas': /sopas/i,
     'caldo verde': /caldo.*verde/i,
     'sopa de legumes': /sopa de legume|sopa.*legume/i,
     'creme de abobora': /creme.*abobora/i,

    // Pratos Principais
    'pratos principais': /prato.*principal|prato.*principais/i,
    'frango assado': /frango.*assado|frango.*forno/i,
    'bacalhau com natas': /bacalhau.*nata/i,
    'feijoada à portuguesa': /feijoada.*portuguesa|feijoada/i,

     // Sobremesas
    'sobremesas': /sobremesa/i,
    'pastel de nata': /(pastel de nata|nata)/i,
    'mousse de chocolate': /(mousse|mouse|mousse.*chocolate|chocolate)/i,
    'azevias de batata doce': /(azevias|azevias.*batata|batata.*doce)/i,
    'pudim de leite': /pudim.*leite/i,
    }

    let found = false;
     for (const recipeKey in recipeRegexes) {
        if (recipeRegexes[recipeKey].test(searchTerm)) { 
            window.location.href = recipePages[recipeKey]; 
            found = true;
            break;
        }
    }

    if (!found) {
        let noResultsMsg = document.getElementById('no-results-message');
        if (!noResultsMsg) {
            noResultsMsg = createNoResultsMessage();
        }
        noResultsMsg.style.display = 'block';
    }
}


function createNoResultsMessage() {
    const msg = document.createElement('div');
    msg.id = 'no-results-message';
    msg.className = 'dropdown-message'; 
    msg.innerHTML = `Nenhuma receita encontrada.
     <button class="close-btn" aria-label="Close">&times;</button>`;

    const searchBar = document.querySelector('.search-bar');
    const existingMsg = document.getElementById('no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    searchBar.parentNode.insertBefore(msg, searchBar.nextSibling);
    const closeButton = msg.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        msg.remove(); 
    });
    return msg;
}


document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        searchRecipe(event)
    }
});



function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const searchBar = document.querySelector('.search-bar');
    navLinks.classList.toggle('burguerNav');
    searchBar.classList.toggle('search-barActive');
}


function toggleMenuBurguer() {
    const navLinks = document.querySelector('.nav-linksBurguer');
    navLinks.classList.toggle('sticky-burguerNavLinks');
}

