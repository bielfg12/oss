$(document).ready(function () {
    $('#cpf').inputmask('999.999.999-99');
    $('#tel').inputmask('(99)99999-9999');
    // $('#cep').inputmask('99.999-999');
    $('#data_nascimento').inputmask('99/99/9999', {
        placeholder: 'dd/mm/aaaa',
        removeMaskOnSubmit: false
    });
});


function validarCPF(cpf) {
    // Removendo formatação do Mask para cálculos
    cpf = cpf.replace(/\D/g, '');

    // Verificando se o tamanho é de 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verificando se possui algum caractere especial ou é inteiro formado por 0
    if (/^(\d)\1+$/.test(cpf) || cpf === '00000000000') {
        return false;
    }

    // Calculando primeiro dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

    // Verificando primeiro dígito
    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calculando segundo dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

    // Verificando segundo dígito
    return segundoDigito === parseInt(cpf.charAt(10));
}





// Verificação de Senhas e CPF
function validarFormulario() {
    // Validação da Senha
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, verifique a senha informada e tente novamente.");
        return false;
    }
      // Validação no CPF
    var cpf = document.getElementById("cpf").value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido. Por favor, verifique o número digitado.");
        return false;
    }
    return true;
}

function buscarCep(cep) {
    // Verificando se o CEP é válido
    if (cep.length !== 8) {
      alert("CEP inválido!");
      return;
    }
  
    // Requisição para a API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        // Se a requisição for bem sucedida
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }
  
        // Preenchendo os campos com os dados da API
        document.getElementById("uf").value = data.uf;
        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;

        // Concatena o bairro, cidade e estado apenas para a visualização do cliente
        const enderecoCompleto = `${data.bairro}, ${data.localidade} - ${data.uf}`;
            document.getElementById("enderecoCompleto").value = enderecoCompleto;
      })
      .catch((error) => {
        // Exibindo mensagem de erro
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar CEP!");
      });
  }
