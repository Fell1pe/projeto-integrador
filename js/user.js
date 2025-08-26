        const menu = document.getElementById('head');



        menu.addEventListener('mouseenter', () => {
            menu.style.left = '0';
        });

        menu.addEventListener('mouseleave', () => {
            menu.style.left = '-50px';
        });