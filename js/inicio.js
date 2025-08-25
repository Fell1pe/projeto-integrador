        const menu = document.getElementById('head');
        const presentation = document.querySelector('#presentation');
        const h1 = document.querySelector('#presentation h1');
        const h2 = document.querySelector('#footer_presentation h2');
        const searchBar = document.getElementById('search_bar');
        const homepage = document.querySelector('.homepage');
        const s_space = document.querySelector('.scroll_space');
        const userDiv = document.querySelector('.user');

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