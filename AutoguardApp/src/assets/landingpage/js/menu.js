document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        item.addEventListener('click', function() {
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.nextElementSibling.style.display = 'none';
                }
            });

            item.classList.toggle('active');
            item.nextElementSibling.style.display = (item.classList.contains('active')) ? 'block' : 'none';
        });
    });
});    

const carousel = document.getElementById('carousel');
let currentIndex = 0;

function showSlide(index) {
    carousel.style.transform = `translateX(${-index * 100}%)`;
    currentIndex = index;
}

function nextSlide() {
    if (currentIndex < carousel.children.length - 1) {
        showSlide(currentIndex + 1);
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        showSlide(currentIndex - 1);
    }
}


const gallery = document.querySelector("#gallery"); /*declaracion de variables con "const"*/ 
/* MENU GALERIA*/
gallery.addEventListener("click", (g) =>{
    g.preventDefault();

    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.scrollIntoView({behavior:"smooth"}); /*hace una transicion */
})

const testimonials = document.querySelector("#testimonials"); 
/* MENU TESTIMONIALS*/
testimonials.addEventListener("click", (t) =>{
    t.preventDefault();

    const sectionTestimonials = document.querySelector(".testimonials");
    sectionTestimonials.scrollIntoView({behavior:"smooth"}); /*hace una transicion */
})

const questions = document.querySelector("#questions"); 
/* MENU QUESTIONS*/
questions.addEventListener("click", (q) =>{
    q.preventDefault();

    const sectionQuestions = document.querySelector(".questions");
    sectionQuestions.scrollIntoView({behavior:"smooth"}); /*hace una transicion */
})

const team = document.querySelector("#Team"); 
/* MENU TEAM */
team.addEventListener("click", (t) =>{
    t.preventDefault();

    const sectionTeam= document.querySelector(".Team");
    sectionTeam.scrollIntoView({behavior:"smooth"}); /*hace una transicion */
})

const Comentarios = document.querySelector("#Comentarios"); 
/* MENU COMENTARIOS */
Comentarios.addEventListener("click", (c) =>{
    c.preventDefault();

    const sectionComentarios= document.querySelector(".Comentarios");
    sectionComentarios.scrollIntoView({behavior:"smooth"}); /*hace una transicion */
})

const botonIngresar = document.getElementById('botonIngresar'); 
/* INICIO SESION */
botonIngresar.addEventListener('click', function() {
    window.location.href= "inicioSesion.html";
});


