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

let ativo = null; // guarda qual está animando/aberto

infos.forEach(info => {
  info.addEventListener('click', () => {
    // se já tem outro aberto e não é o mesmo -> não deixa abrir
    if (ativo && ativo !== info) return;

    // se já está em reverse, ignora até terminar
    if (info.classList.contains("reverse-animate")) return;

    if (info.classList.contains("reverse")) {
      // Inicia o reverse
      info.classList.add("reverse-animate");
      info.classList.remove("animate");
 
      setTimeout(() => {
        info.addEventListener('animationend', () => {


        info.classList.remove("reverse-animate");
        info.classList.remove("reverse");

        if (info.placeholder) {
          info.placeholder.remove();
          info.placeholder = null;
        }

        info.style.left = "";
        info.style.top = "";

        ativo = null; // 🔑 libera para poder abrir de novo
      }, { once: true });
      }, 2500)
      

    } else {
      // fase 1
      info.classList.add("animate");

      const onFirstAnimationEnd = () => {
        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        info.parentNode.insertBefore(placeholder, info);

        info.style.left = placeholder.offsetLeft + "px";
        info.style.top = placeholder.offsetTop + "px";

        info.classList.add("reverse");
        info.placeholder = placeholder;

        ativo = info; // 🔑 marca qual está aberto

        info.removeEventListener("animationend", onFirstAnimationEnd);
      };

      info.addEventListener("animationend", onFirstAnimationEnd);
    }
  });
});
