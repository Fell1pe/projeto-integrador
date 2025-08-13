document.addEventListener('DOMContentLoaded', () => {
    const mode = document.getElementById('mode_icon');
    const form = document.getElementById('login_form');
    const loginForm = document.getElementById('login_form');

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

    // FUNÇÃO PRINCIPAL: Verifica campos e redireciona
    function verificarCamposERedirecionarParaLogin() {
        // Lista de TODOS os campos obrigatórios
        const camposObrigatorios = [
            'name',        // Nome
            'Email',       // Email
            'password',    // Senha
            'CPF',         // CPF
            'CEP',         // CEP
            'rua',         // Rua
            'numero',      // Número
            'bairro',      // Bairro
            'cidade',      // Cidade
            'estado'       // Estado
            // complemento não é obrigatório
        ];

        // Verifica se TODOS os campos estão preenchidos
        let todosPreenchidos = true;
        let campoVazio = '';

        for (let campo of camposObrigatorios) {
            const elemento = document.getElementById(campo);
            if (!elemento || elemento.value.trim() === '') {
                todosPreenchidos = false;
                campoVazio = campo;
                break; // Para no primeiro campo vazio
            }
        }

        // IF: Todos os campos preenchidos = REDIRECIONA
        if (todosPreenchidos) {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado!',
                text: 'Redirecionando para o login...',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                // REDIRECIONA PARA LOGIN
                window.location.href = '/login.html'; // ALTERE PARA SUA PÁGINA DE LOGIN
            });
        } 
        // ELSE: Campos em branco = AVISA USUÁRIO
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios para continuar.'
            });
            
            // Foca no primeiro campo vazio
            if (campoVazio) {
                document.getElementById(campoVazio).focus();
            }
        }
    }

    // Função adicional: Verificar email válido
    function checarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    // Função adicional: Validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // VERSÃO COMPLETA: Com validações + redirecionamento
    function verificarTudoERedirecionarParaLogin() {
        // 1. Verifica se todos os campos estão preenchidos
        const camposObrigatorios = ['name', 'Email', 'password', 'CPF', 'CEP', 'rua', 'numero', 'bairro', 'cidade', 'estado'];
        
        for (let campo of camposObrigatorios) {
            const elemento = document.getElementById(campo);
            if (!elemento || elemento.value.trim() === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obrigatório',
                    text: `Por favor, preencha o campo: ${campo}`
                });
                elemento.focus();
                return false; // PARA AQUI se algum campo estiver vazio
            }
        }

        // 2. Valida email
        const emailInput = document.getElementById('Email');
        if (!checarEmail(emailInput.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Por favor, informe um email válido'
            });
            emailInput.focus();
            return false; // PARA AQUI se email for inválido
        }

        // 3. Valida CPF
        const cpfInput = document.getElementById('CPF');
        if (!validarCPF(cpfInput.value)) {
            Swal.fire({
                icon: 'error',
                title: 'CPF inválido',
                text: 'Por favor, informe um CPF válido'
            });
            cpfInput.focus();
            return false; // PARA AQUI se CPF for inválido
        }

        // 4. SE chegou até aqui = TUDO VÁLIDO = REDIRECIONA
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Redirecionando para o login...',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            // REDIRECIONA PARA LOGIN
            window.location.href = '/login/login.html'; // ALTERE PARA SUA PÁGINA
        });

        return true;
    }

    // Evento de submit do formulário
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede envio padrão

        // CHAMA A FUNÇÃO PRINCIPAL
        verificarTudoERedirecionarParaLogin();
    });

    // Suas outras funções existentes (CEP, formatação, etc.)
    const preencherFormulario = (endereco) => {
        document.getElementById('rua').value = endereco.logradouro || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('cidade').value = endereco.localidade || '';
        document.getElementById('estado').value = endereco.uf || '';
    }

    const limparFormulario = () => {
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }

    const eNumero = (numero) => /^[0-9]+$/.test(numero);
    const cepValido = (CEP) => CEP.length === 8 && eNumero(CEP);

    const pesquisarCep = async () => {
        const CEPInput = document.getElementById('CEP');
        const cep = CEPInput.value.replace(/\D/g, '');
        
        if (cepValido(cep)) {
            limparFormulario();
            const url = `https://viacep.com.br/ws/${cep}/json/`;

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

    // Evento do CEP
    const CEPInput = document.getElementById('CEP');
    CEPInput.addEventListener('focusout', pesquisarCep);
});