// Função para adicionar transação no Firestore (retorna Promise)
function adicionarTransacao(tipo, valor, descricao = "", categoria = "") {
    if (!valor || valor <= 0) return Promise.reject("Valor inválido");
    const doc = {
      tipo,
      valor: parseFloat(valor),
      descricao,
      categoria,
      data: new Date()
    };
    return window.db.collection("transacoes").add(doc);
  }
  
  // Adicionar renda
  function adicionarRenda() {
    const valor = parseFloat(document.getElementById("valorRenda").value);
    if (!valor || valor <= 0) return alert("Informe um valor válido!");
    adicionarTransacao("renda", valor)
      .then(() => {
        document.getElementById("valorRenda").value = "";
        atualizarTudo();
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao adicionar renda.");
      });
  }
  
  // Adicionar investimento
  function adicionarInvestimento() {
    const desc = document.getElementById("descInvest").value;
    const valor = parseFloat(document.getElementById("valorInvest").value);
    if (!valor || valor <= 0) return alert("Informe um valor válido!");
    adicionarTransacao("investimento", valor, desc)
      .then(() => {
        document.getElementById("descInvest").value = "";
        document.getElementById("valorInvest").value = "";
        atualizarTudo();
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao adicionar investimento.");
      });
  }
  
  // Adicionar reserva (sem lista)
  function adicionarReserva() {
    const valor = parseFloat(document.getElementById("valorReserva").value);
    if (!valor || valor <= 0) return alert("Informe um valor válido!");
    adicionarTransacao("reserva", valor, "Reserva de Emergência")
      .then(() => {
        document.getElementById("valorReserva").value = "";
        atualizarTudo();
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao adicionar reserva.");
      });
  }
  
  // Adicionar gasto
  function adicionarGasto() {
    const categoria = document.getElementById("categoriaGasto").value;
    const desc = document.getElementById("descGasto").value;
    const valor = parseFloat(document.getElementById("valorGasto").value);
    if (!valor || valor <= 0) return alert("Informe um valor válido!");
    adicionarTransacao("gasto", valor, desc, categoria)
      .then(() => {
        document.getElementById("descGasto").value = "";
        document.getElementById("valorGasto").value = "";
        atualizarTudo();
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao adicionar gasto.");
      });
  }
  
  // Atualiza lista de gastos
  async function atualizarListaGastos() {
    const lista = document.getElementById("listaGastos");
    lista.innerHTML = "";
    const snapshot = await window.db.collection("transacoes")
      .where("tipo", "==", "gasto")
      .orderBy("data", "desc")
      .get();
    snapshot.forEach(doc => {
      const { descricao, valor, categoria } = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `<span class="categoria">${categoria}:</span> ${descricao} - R$ ${valor.toFixed(2)}`;
      lista.appendChild(li);
    });
  }
  
  async function atualizarListaInvestimentos() {
    const lista = document.getElementById("listaInvestimentos");
    lista.innerHTML = "";
    const snapshot = await window.db.collection("transacoes")
      .where("tipo", "==", "investimento")
      .orderBy("data", "desc")
      .get();
  
    console.log("Docs investimento:", snapshot.docs.map(doc => doc.data()));
  
    snapshot.forEach(doc => {
      const { descricao, valor, categoria = "" } = doc.data();
      const li = document.createElement("li");
      const descExibida = descricao || "(Sem descrição)";
      if (categoria) {
        li.innerHTML = `<span class="categoria">${categoria}:</span> ${descExibida} - R$ ${valor.toFixed(2)}`;
      } else {
        li.textContent = `${descExibida} - R$ ${valor.toFixed(2)}`;
      }
      lista.appendChild(li);
    });
  }
  
  // Atualiza os totais e o texto dos cards
  async function atualizarTotais() {
    let renda = 0, gastos = 0, investimentos = 0, reserva = 0;
  
    const snapshot = await window.db.collection("transacoes").get();
    snapshot.forEach(doc => {
      const { tipo, valor } = doc.data();
      if (tipo === "renda") renda += valor;
      else if (tipo === "gasto") gastos += valor;
      else if (tipo === "investimento") investimentos += valor;
      else if (tipo === "reserva") reserva += valor;
    });
  
    document.getElementById("rendaBruta").textContent = `R$ ${renda.toFixed(2)}`;
    document.getElementById("investimentos").textContent = `R$ ${investimentos.toFixed(2)}`;
    document.getElementById("gastos").textContent = `R$ ${gastos.toFixed(2)}`;
    document.getElementById("reservaEmergencia").textContent = `R$ ${reserva.toFixed(2)}`;
  
    // Atualiza renda líquida descontando investimentos, gastos e reserva
    const rendaLiquida = renda - gastos - investimentos - reserva;
    document.getElementById("rendaLiquida").textContent = `R$ ${rendaLiquida.toFixed(2)}`;
  }
  
  // Atualiza tudo (totais + listas)
  async function atualizarTudo() {
    await atualizarTotais();
    await atualizarListaGastos();
    await atualizarListaInvestimentos();
  }
  
  // Atualiza ao carregar a página
  window.onload = atualizarTudo;
  