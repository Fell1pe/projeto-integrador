        const menu = document.getElementById('head');
        const presentation = document.querySelector('#presentation');
        const h1 = document.querySelector('#presentation h1');
        const h2 = document.querySelector('#footer_presentation h2');
        const searchBar = document.getElementById('search_bar');
        const homepage = document.querySelector('.homepage');
        const s_space = document.querySelector('.scroll_space');
        const userDiv = document.querySelector('.user');
        const infos = document.querySelectorAll('.info');

          let presentationHidden = false;



        menu.addEventListener('mouseenter', () => {
            menu.style.left = '0';
        });

        menu.addEventListener('mouseleave', () => {
            menu.style.left = '-50px';
        });

        // Animação inicial quando a página carrega
        window.addEventListener('load', () => {
            presentation.classList.add('show');
            h1.classList.add('show');
            h2.classList.add('show');
        });


        window.addEventListener('scroll', () => {

            let scrollPosition = window.scrollY || window.pageYOffset;


            if (scrollPosition > 50 && !presentationHidden) {
                presentationHidden = true;

                presentation.classList.add('retract');

                setTimeout(() => {
                    presentation.classList.add('hidden');
                    s_space.classList.add('hidden');
                }, 300); // Tempo para a animação de retração completar

                searchBar.classList.add('fixed');

                setTimeout(() => {
                    homepage.classList.add('visible');
                }, 1000);

                setTimeout(() => {
                    userDiv.classList.add('show_user');
                }, 1200);
            }
        })

        
        userDiv.addEventListener('click', () => {
        userDiv.classList.toggle('active');
        });


        const fadeInElements = document.querySelectorAll('.resources, .bottons_navegate');


        // Adiciona a classe inicial que prepara a animação
fadeInElements.forEach(el => el.classList.add('fade-in'));

// Cria o observador para ativar a animação quando aparecer na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show'); // adiciona a classe que faz o fade-in
            observer.unobserve(entry.target);    // para de observar para não repetir
        }
    });
}, { threshold: 0.1 });

// Observa todos os elementos selecionados
fadeInElements.forEach(el => observer.observe(el));

infos.forEach(info => {
    info.addEventListener('click', () => {
        if (document.querySelector(".info.animate")) return;

        // fase 1
        info.classList.add("animate");

        // listener ANTES de adicionar o animate
        const onFirstAnimationEnd = () => {
            // cria placeholder e define absolute
            const placeholder = document.createElement("div");
            placeholder.classList.add("placeholder");
            info.parentNode.insertBefore(placeholder, info);

            info.style.left = placeholder.offsetLeft + "px";
            info.style.top = placeholder.offsetTop + "px";
 

            // remove o listener
            info.removeEventListener('animationend', onFirstAnimationEnd);

        };

        info.addEventListener('animationend', onFirstAnimationEnd);
    });
});

