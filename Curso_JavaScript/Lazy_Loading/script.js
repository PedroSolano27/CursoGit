// Seleção
const images = document.querySelectorAll(".image-container img");


// Observer
const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;

        const image = entry.target
        image.src = image.src.replace("?w=10&", "?w=1000&");

        observer.unobserve(image);
    });
}, {});


// Eventos
images.forEach(function(image){
    observer.observe(image);
});