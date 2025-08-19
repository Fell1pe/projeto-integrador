const menu = document.getElementById('head'); //cria constante para o cabeçalho//

menu.addEventListener('mouseenter', () => {
    menu.style.left = '0'; //ao passar o mouse, o cabeçalho se torna visível//
});

menu.addEventListener('mouseleave', () => {
    menu.style.left = '-50px'; //ao retirar o mouse, o cabeçalho se oculta//
});



//cria função de pesquisa//

const search = () => {
    const query = document.querySelector('#search_bar input').value;
    console.log('Pesquisar:', query);
};