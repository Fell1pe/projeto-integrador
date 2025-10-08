// Efeito hover no header lateral
const header = document.getElementById('head');

header.addEventListener('mouseenter', () => {
    header.classList.add('hover');
});

header.addEventListener('mouseleave', () => {
    header.classList.remove('hover');
});

// Dropdown do usuário
const userElement = document.getElementById('userElement');
const dropdown = document.getElementById('dropdown');
let isDropdownOpen = false;

userElement.addEventListener('click', (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
        dropdown.style.maxHeight = '200px';
        dropdown.style.opacity = '1';
        dropdown.style.pointerEvents = 'auto';
        dropdown.style.padding = '20px';
        userElement.classList.add('focus-effect');
    } else {
        dropdown.style.maxHeight = '0';
        dropdown.style.opacity = '0';
        dropdown.style.pointerEvents = 'none';
        dropdown.style.padding = '0 20px';
        userElement.classList.remove('focus-effect');
    }
});

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    if (!userElement.contains(e.target) && isDropdownOpen) {
        dropdown.style.maxHeight = '0';
        dropdown.style.opacity = '0';
        dropdown.style.pointerEvents = 'none';
        dropdown.style.padding = '0 20px';
        userElement.classList.remove('focus-effect');
        isDropdownOpen = false;
    }
});

// MODO ANÔNIMO
const anonymousBtn = document.querySelector('.anonymous');
let isAnonymousMode = false;

anonymousBtn.addEventListener('click', () => {
    isAnonymousMode = !isAnonymousMode;
    
    if (isAnonymousMode) {
        // Ativar modo escuro com melhor contraste
        document.body.style.backgroundColor = '#4a3f35';
        
        // Escurecer elementos principais
        const dad = document.querySelector('.dad');
        dad.style.backgroundColor = '#6b5d4f';
        dad.style.color = '#F0EBD1';
        
        const son = document.querySelector('.son');
        son.style.backgroundColor = '#8b7965';
        
        const title = document.querySelector('.title');
        title.style.backgroundColor = '#8a0000';
        title.style.color = '#F0EBD1';
        
        // Atualizar labels com cor mais clara
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = '#FFF8E7';
        });
        
        // Escurecer inputs e textarea com melhor contraste
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.backgroundColor = '#a89680';
            input.style.color = '#1a1410';
            input.style.border = '1px solid #624129';
        });
        
        // Placeholder mais visível
        const style = document.createElement('style');
        style.id = 'dark-mode-placeholders';
        style.innerHTML = `
            input::placeholder, textarea::placeholder {
                color: #4a3f35 !important;
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
        
        // Atualizar área de arquivos
        const filesDiv = document.querySelector('.files');
        filesDiv.style.backgroundColor = '#a89680';
        filesDiv.style.color = '#1a1410';
        
        // Atualizar linha divisória
        const line = document.querySelector('.line');
        if (line) {
            line.style.borderColor = '#4a3f35';
        }
        
        // Atualizar ícones para ficarem mais visíveis
        const icons = filesDiv.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.color = '#1a1410';
        });
        
        // Atualizar h3
        const h3 = document.querySelector('h3');
        if (h3) {
            h3.style.color = '#ff6b6b';
        }
        
        // Atualizar botão anônimo
        anonymousBtn.style.backgroundColor = 'var(--color-red-50)';
        anonymousBtn.style.color = 'var(--color-light-50)';
        anonymousBtn.querySelector('span').textContent = ' Modo Anônimo Ativo';
        
        // Atualizar ícone do botão anônimo
        const anonIcon = anonymousBtn.querySelector('i');
        if (anonIcon) {
            anonIcon.style.color = '#F0EBD1';
        }
        
        // Esconder informações do usuário
        userElement.style.display = 'none';
        
    } else {
        // Desativar modo escuro (voltar ao normal)
        document.body.style.backgroundColor = 'var(--color-dark-50)';
        
        const dad = document.querySelector('.dad');
        dad.style.backgroundColor = 'var(--color-light-50)';
        dad.style.color = '';
        
        const son = document.querySelector('.son');
        son.style.backgroundColor = 'var(--color-dark-50)';
        
        const title = document.querySelector('.title');
        title.style.backgroundColor = 'var(--color-red-50)';
        title.style.color = 'var(--color-light-50)';
        
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = 'var(--color-dark-900)';
        });
        
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.backgroundColor = 'white';
            input.style.color = 'black';
            input.style.border = 'none';
        });
        
        // Remover estilo de placeholders
        const darkStyle = document.getElementById('dark-mode-placeholders');
        if (darkStyle) {
            darkStyle.remove();
        }
        
        const filesDiv = document.querySelector('.files');
        filesDiv.style.backgroundColor = 'white';
        filesDiv.style.color = 'black';
        
        const line = document.querySelector('.line');
        if (line) {
            line.style.borderColor = 'rgb(175, 175, 175)';
        }
        
        const icons = filesDiv.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.color = 'var(--color-dark-900)';
        });
        
        const h3 = document.querySelector('h3');
        if (h3) {
            h3.style.color = 'var(--color-red-50)';
        }
        
        // Restaurar ícone do botão anônimo
        const anonIcon = anonymousBtn.querySelector('i');
        if (anonIcon) {
            anonIcon.style.color = 'var(--color-dark-900)';
        }
        
        anonymousBtn.style.backgroundColor = 'white';
        anonymousBtn.style.color = '';
        anonymousBtn.querySelector('span').textContent = ' Modo Anônimo';
        
        userElement.style.display = 'flex';
    }
});

// Upload de arquivos
const fileInput = document.getElementById('fileInput');
const fileBtn = document.getElementById('fileBtn');
const fileName = document.getElementById('fileName');
let selectedFiles = [];

fileBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
        selectedFiles = files;
        
        if (files.length === 1) {
            fileName.textContent = files[0].name;
        } else {
            fileName.textContent = `${files.length} arquivos selecionados`;
        }
    } else {
        fileName.textContent = 'Nenhum arquivo escolhido';
        selectedFiles = [];
    }
});

// Botão de configurações
const configBtn = document.getElementById('config');
configBtn.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Configurações',
        text: 'Esta funcionalidade está em desenvolvimento'
    });
});

// Botão de sair
const exitBtn = document.getElementById('exit');
exitBtn.addEventListener('click', () => {
    Swal.fire({
        icon: 'question',
        title: 'Deseja sair?',
        text: 'Você será redirecionado para a página de login',
        showCancelButton: true,
        confirmButtonText: 'Sim, sair',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#730000',
        cancelButtonColor: '#624129'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/login/login.html';
        }
    });
});

// Validação e envio do formulário
const submitBtn = document.querySelector('.go');
const textarea = document.querySelector('textarea');
const localInput = document.querySelector('input[type="text"]');
const dateInput = document.querySelector('input[type="date"]');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Lista de campos obrigatórios para validação
    const camposObrigatorios = [
        { elemento: textarea, nome: 'Relate o Ocorrido', mensagem: 'Por favor, relate o ocorrido' },
        { elemento: localInput, nome: 'Local', mensagem: 'Por favor, informe o local do ocorrido' },
        { elemento: dateInput, nome: 'Data', mensagem: 'Por favor, informe a data do ocorrido' }
    ];
    
    // Valida todos os campos obrigatórios
    for (let campo of camposObrigatorios) {
        if (!campo.elemento || !campo.elemento.value || campo.elemento.value.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campo obrigatório',
                text: campo.mensagem
            });
            campo.elemento.focus();
            return; // PARA AQUI se algum campo estiver vazio
        }
    }
    
    // Preparar dados para envio
    const formData = {
        ocorrido: textarea.value.trim(),
        local: localInput.value.trim(),
        data: dateInput.value,
        arquivos: selectedFiles.map(f => f.name),
        timestamp: new Date().toISOString(),
        anonimo: isAnonymousMode // Indica se é denúncia anônima
    };
    
    // Simular envio
    console.log('Denúncia enviada:', formData);
    
    // Feedback visual
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const protocolo = Math.floor(100000 + Math.random() * 900000);
        
        Swal.fire({
            icon: 'success',
            title: 'Denúncia enviada com sucesso!',
            html: `<strong>Número do protocolo:</strong> ${protocolo}${isAnonymousMode ? '<br><br><em>Denúncia enviada de forma anônima</em>' : ''}`,
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            // Limpar formulário
            textarea.value = '';
            localInput.value = '';
            dateInput.value = '';
            fileInput.value = '';
            fileName.textContent = 'Nenhum arquivo escolhido';
            selectedFiles = [];
            
            submitBtn.textContent = 'Enviar';
            submitBtn.disabled = false;
            
            // Opcional: redirecionar para página inicial
            // window.location.href = '/início/inicial.html';
        });
    }, 1500);
});

// Contador de caracteres no textarea (opcional)
textarea.addEventListener('input', () => {
    const maxLength = 1000;
    const currentLength = textarea.value.length;
    
    if (currentLength > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
    }
});

// Prevenir envio do formulário ao pressionar Enter no textarea
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        submitBtn.click();
    }
});