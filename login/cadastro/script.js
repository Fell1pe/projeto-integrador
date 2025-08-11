document.addEventListener('DOMContentLoaded', () => {
    const mode = document.getElementById('mode_icon');
    const form = document.getElementById('login_form');
  
    // Alterna entre modo claro e escuro
    mode.addEventListener('click', () => {
        if (mode.classList.contains('fa-moon')) {
            mode.classList.remove('fa-moon');
            mode.classList.add('fa-sun');
            form.classList.add('dark');
        } else {
            mode.classList.remove('fa-sun');
            mode.classList.add('fa-moon');
            form.classList.remove('dark');
        }
    });
  
    // Seleciona os elementos do formulário
    const emailInput = document.getElementById('Email'); 
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const CPFInput = document.getElementById('CPF');
    const data_nasInput = document.getElementById('data_nas');
    const CEPInput = document.getElementById('CEP');
    const ruaInput = document.getElementById('rua');
    const numeroInput = document.getElementById('numero');
    const bairroInput = document.getElementById('bairro');
    const complementoInput = document.getElementById('complemento');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
  
    const loginForm = document.getElementById('login_form');
  
    // Validação de preenchimento de campos, CPF e E-mail
    loginForm.addEventListener('submit', (event) => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        const requiredFields = [emailInput, passwordInput, nameInput, CPFInput, data_nasInput, CEPInput, ruaInput, numeroInput, bairroInput, cidadeInput, estadoInput];
        for (let field of requiredFields) {
            if (field.value.trim() === '') {
                event.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
                field.focus();
                return;
            }
        }
  
        // Verificação de E-mail válido
        if (!checarEmail(emailInput)) {
            event.preventDefault();
            return; // Impede o envio do formulário caso o e-mail seja inválido
        }
  
        // Verificação de CPF válido
        if (!validarCPF(CPFInput.value)) {
            event.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "CPF inválido!",
              });
            CPFInput.focus();
        }
    });
  
    // Função de validação de CPF
    function validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
  
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
  
        let soma = 0;
        let resto;
  
        // Valida o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
  
        resto = (soma * 10) % 11;
  
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
  
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }
  
        soma = 0;
  
        // Valida o segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
  
        resto = (soma * 10) % 11;
  
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
  
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
  
        return true;
    }
  
    // Verifica o formato do e-mail
    function checarEmail(emailInput) {
        const emailValue = emailInput.value.trim();
        
        // Expressão regular para validar o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        // Verifica se o e-mail está vazio ou no formato inválido
        if (!emailRegex.test(emailValue)) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Por favor informe um email válido",
              });
            emailInput.focus(); // Coloca o foco no campo de e-mail
            return false;
        } else {
            return true;
        }
    }
  
    // Função de autopreenchimento
    const preencherFormulario = (endereco) => {
        document.getElementById('rua').value = endereco.logradouro || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('cidade').value = endereco.localidade || '';
        document.getElementById('estado').value = endereco.uf || '';
    }
  
    // Função para limpar os campos de endereço
    const limparFormulario = () => {
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }
  
    // Verifica se o CEP é válido
    const eNumero = (numero) => /^[0-9]+$/.test(numero);
    const cepValido = (CEP) => CEP.length === 8 && eNumero(CEP);
  
    const pesquisarCep = async () => {
        const cep = CEPInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cepValido(cep)) {
            limparFormulario();
            const url = `https://viacep.com.br/ws/${cep}/json/`; // URL da API do ViaCEP com o CEP inserido
  
            try {
                const dados = await fetch(url);
                if (!dados.ok) {
                    throw new Error('Erro ao buscar o CEP.');
                }
  
                const address = await dados.json();
  
                if (address.erro) {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "CEP não encontrado!",
                      });
                    limparFormulario();
                } else {
                    preencherFormulario(address);
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Ocorreu um erro ao buscar o CEP. Por favor, tente novamente!",
                  });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "CEP não encontrado! informe o CEP de 8 dígitos",
              });
            limparFormulario();
        }
    }
  
    // Executa a ação de preenchimento do formulário ao deixar o campo CEP
    CEPInput.addEventListener('focusout', pesquisarCep);
  });
  