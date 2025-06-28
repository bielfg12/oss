// Ao carregar a página, adiciona automaticamente uma linha de item e uma linha de material
window.onload = () => {
    adicionarLinha();
    adicionarMaterialParte1();
    adicionarMaterialParte2();
  };
  
  // Alterna entre as abas "Orçamento" e "Material"
  function mostrarAba(id, event) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
    document.getElementById(id).style.display = 'block';
    event.target.classList.add('active');
  }
  
  // Adiciona uma nova linha na tabela de Itens
  function adicionarLinha() {
    const tabela = document.getElementById('corpoTabelaItens');
    const linha = document.createElement('tr');
  
    for (let i = 0; i < 15; i++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.style.width = '100%';
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  
  // Adiciona linha na Parte 1 da tabela de Materiais
  function adicionarMaterialParte1() {
    const tabela = document.getElementById('corpoMateriaisParte1');
    const linha = document.createElement('tr');
  
    for (let i = 0; i < 13; i++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.style.width = '100%';
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  
  // Adiciona linha na Parte 2 da tabela de Materiais
  function adicionarMaterialParte2() {
    const tabela = document.getElementById('corpoMateriaisParte2');
    const linha = document.createElement('tr');
  
    for (let i = 0; i < 12; i++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.style.width = '100%';
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  
  // Função para adicionar linha na tabela unificada (se usar tabela unificada)
  function adicionarMaterialUnificada() {
    const tabela = document.getElementById('corpoMateriaisUnificada');
    if (!tabela) {
      console.error('Erro: tbody com id "corpoMateriaisUnificada" não encontrado');
      return;
    }
  
    const linha = document.createElement('tr');
    const totalColunas = 25; // total colunas da tabela unificada
  
    for (let i = 0; i < totalColunas; i++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.style.width = '100%';
      input.disabled = false; // garantir que não esteja desabilitado
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  
  // Gera o PDF da aba de Orçamento
  function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
  
    doc.setFontSize(18);
    doc.text("Orçamento", 105, y, { align: "center" });
    y += 10;
  
    const camposIniciais = [
      ["Cliente", "cliente"], ["CNPJ", "cnpj"], ["IE", "ie"], ["A/C Sr", "ac"],
      ["Requisição", "requisicao"], ["Fone", "fone"], ["Email", "email"],
      ["Orçamento Nº", "orcamento"], ["Data", "data"]
    ];
  
    doc.setFontSize(12);
    camposIniciais.forEach(([label, id]) => {
      doc.text(`${label}: ${document.getElementById(id).value}`, 10, y);
      y += 7;
    });
  
    y += 5;
  
    const tabela = document.getElementById("tabelaItens");
    const headers = Array.from(tabela.querySelectorAll("thead th")).map(th => th.innerText);
    const body = Array.from(tabela.querySelectorAll("tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    if (body.length === 0) {
      doc.text("Nenhum item adicionado.", 10, y);
    } else {
      doc.autoTable({
        startY: y,
        head: [headers],
        body,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [46, 204, 113] },
        theme: 'striped',
        margin: { left: 10, right: 10 },
        tableWidth: 'auto',
      });
    }
  
    y = doc.lastAutoTable.finalY + 10;
  
    const camposExtras = [
      ["Condições de Pagamento", "pagamento"], ["Prazo de Entrega", "prazo"],
      ["Matéria Prima Fornecimento", "materiaPrima"], ["Acabamento", "acabamento"],
      ["Pintura", "pintura"], ["Engenharia", "engenharia"],
      ["Processo", "processo"], ["Impostos IND", "ind"],
      ["ICMS", "icms"], ["IPI", "ipi"], ["Frete", "frete"]
    ];
  
    doc.setFontSize(12);
    doc.text("Condições Gerais:", 10, y);
    y += 8;
    doc.setFontSize(10);
    camposExtras.forEach(([label, id]) => {
      doc.text(`${label}: ${document.getElementById(id).value}`, 10, y);
      y += 7;
    });
  
    y += 10;
    doc.setFontSize(12);
    doc.text("Observações:", 10, y);
    y += 7;
    const obs = document.getElementById("observacoes").value;
    const splitObs = doc.splitTextToSize(obs, 190);
    doc.setFontSize(10);
    doc.text(splitObs, 10, y);
  
    doc.save("orcamento.pdf");
  }
  
  // Função auxiliar para gerar tabela no PDF
  function gerarTabela(doc, startY, tabelaId, corCabecalho) {
    const tabela = document.getElementById(tabelaId);
    if (!tabela) {
      console.error(`Tabela com id ${tabelaId} não encontrada.`);
      return startY;
    }
  
    const headers = Array.from(tabela.querySelectorAll("thead th")).map(th => th.innerText);
    const body = Array.from(tabela.querySelectorAll("tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    if (body.length === 0) {
      doc.setFontSize(12);
      doc.text(`Nenhum dado na tabela ${tabelaId}`, 10, startY);
      return startY + 10;
    }
  
    doc.autoTable({
      startY,
      head: [headers],
      body,
      styles: { fontSize: 5.5, cellPadding: 1 },
      headStyles: { fillColor: corCabecalho },
      theme: 'striped',
      margin: { left: 5, right: 5 },
      tableWidth: 'wrap',
    });
  
    return doc.lastAutoTable.finalY;
  }
  
  // Gera o PDF da aba de Materiais (unificado)
  function gerarPDFMateriaisUnificada() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });
  
    let y = 10;
    doc.setFontSize(18);
    doc.text("Relatório de Materiais", 148, y, { align: "center" });
    y += 10;
  
    // Buscando tabela unificada no HTML (você deve ter tabela unificada com essas colunas)
    const tabelaUnificada = document.getElementById("tabelaMateriaisUnificada");
    if (!tabelaUnificada) {
      doc.setFontSize(12);
      doc.text("Tabela unificada não encontrada.", 10, y);
    } else {
      const headersUnificados = Array.from(tabelaUnificada.querySelectorAll("thead th")).map(th => th.innerText);
      const bodyUnificado = Array.from(tabelaUnificada.querySelectorAll("tbody tr")).map(tr =>
        Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
      );
  
      doc.autoTable({
        startY: y,
        head: [headersUnificados],
        body: bodyUnificado,
        styles: { fontSize: 6, cellPadding: 1 },
        headStyles: { fillColor: [100, 149, 237] },
        theme: "striped",
        margin: { left: 5, right: 5 },
        tableWidth: "auto",
      });
  
      y = doc.lastAutoTable.finalY + 10;
    }
  
    // Campos Unidade e Total no final
    doc.setFontSize(12);
    doc.text("Resumo Final:", 10, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(`Unidade: ${document.getElementById("unidade").value}`, 10, y);
    y += 6;
    doc.text(`Total: ${document.getElementById("total").value}`, 10, y);
    y += 10;
  
    doc.save("materiais.pdf");
  }

  function adicionarLinhaOrdemProducao() {
    const tabela = document.getElementById("corpoOrdemProducao");
    const linha = document.createElement("tr");
    const totalColunas = 17;
  
    for (let i = 0; i < totalColunas; i++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.style.width = "100%";
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  
  function gerarPDFOrdemProducao() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    let y = 10;
  
    doc.setFontSize(18);
    doc.text("Ordem de Produção", 148, y, { align: "center" });
    y += 10;
  
    // Campos iniciais
    const camposIniciais = [
      ["Ordem de Serviço", "ordemServico"],
      ["Orçamento Nº", "orcamentoNumero"],
      ["A Sr", "aSr"],
      ["Data", "dataOrdem"],
      ["Entrega", "entrega"]
    ];
  
    doc.setFontSize(10);
    camposIniciais.forEach(([label, id]) => {
      doc.text(`${label}: ${document.getElementById(id).value}`, 10, y);
      y += 6;
    });
  
    y += 5;
  
    // Tabela dos Itens
    const headers = Array.from(document.querySelectorAll("#tabelaOrdemProducao thead th")).map(th => th.innerText);
    const body = Array.from(document.querySelectorAll("#tabelaOrdemProducao tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    doc.autoTable({
      startY: y,
      head: [headers],
      body,
      styles: { fontSize: 6, cellPadding: 1 },
      headStyles: { fillColor: [100, 149, 237] },
      theme: "striped",
      margin: { left: 5, right: 5 },
      tableWidth: "auto"
    });
  
    y = doc.lastAutoTable.finalY + 10;
  
    // Tempos de processo
    const tempos = [
      ["Tempo Orçamento", "tempoOrcamento"],
      ["Engenharia (horas)", "tempoEngenharia"],
      ["Corte Laser (horas)", "tempoLaser"],
      ["Dobra (horas)", "tempoDobra"],
      ["Montagem (horas)", "tempoMontagem"],
      ["Acabamento (horas)", "tempoAcabamento"],
      ["Solda (horas)", "tempoSolda"]
    ];
  
    doc.setFontSize(12);
    doc.text("Tempos de Processo:", 10, y);
    y += 8;
  
    doc.setFontSize(10);
    tempos.forEach(([label, id]) => {
      doc.text(`${label}: ${document.getElementById(id).value}`, 10, y);
      y += 6;
    });
  
    y += 8;
  
    // Tabela de Produção (Setores)
    doc.setFontSize(12);
    doc.text("Produção:", 10, y);
    y += 5;
  
    const setores = Array.from(document.querySelectorAll("#aba-ordem-producao .table-wrapper table tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    const setoresHead = ["Setor", "Dia", "Início", "Término", "Pausa", "Até"];
    const setoresBody = setores.map((linha, i) => [ 
      ["Corte a Laser", "Dobradeira", "Montagem", "Solda", "Acabamento"][i], 
      ...linha 
    ]);
  
    doc.autoTable({
      startY: y,
      head: [setoresHead],
      body: setoresBody,
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [200, 100, 100] },
      margin: { left: 10, right: 10 },
      tableWidth: "auto"
    });
  
    y = doc.lastAutoTable.finalY + 10;
  
    // Observação final
    doc.setFontSize(10);
    doc.text("Após a finalização do processo o papel deverá ser retornado ao escritório.", 10, y);
  
    doc.save("ordem_producao.pdf");
  }
  
  function gerarPDFApontamentoHora() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    let y = 10;
  
    doc.setFontSize(18);
    doc.text("Apontamento de Hora", 148, y, { align: "center" });
    y += 10;
  
    // Cabeçalhos da tabela
    const headers = Array.from(document.querySelectorAll("#tabelaApontamentoHora thead th")).map(th => th.innerText);
  
    // Corpo da tabela (valores dos inputs)
    const body = Array.from(document.querySelectorAll("#tabelaApontamentoHora tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    // Geração da tabela
    doc.autoTable({
      startY: y,
      head: [headers],
      body: body,
      styles: { fontSize: 7, cellPadding: 1 },
      headStyles: { fillColor: [100, 149, 237] },
      theme: "striped",
      margin: { left: 5, right: 5 },
      tableWidth: "auto"
    });
  
    y = doc.lastAutoTable.finalY + 10;
  
    doc.setFontSize(10);
    doc.text("Após a finalização do processo, o papel deverá ser retornado ao escritório.", 10, y);
  
    doc.save("apontamento_hora.pdf");
  }

  function adicionarLinhaApontamentoHora() {
    const tabela = document.getElementById("corpoApontamentoHora");
    const linha = document.createElement("tr");
  
    const totalColunas = 8; // OS, SETOR, DIA, INICIO, PAUSA, MOTIVO (PAUSA), ATÉ, TÉRMINO
  
    for (let i = 0; i < totalColunas; i++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.style.width = "100%";
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }

  function gerarPDFChaparia() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l');
    let y = 10;
  
    doc.setFontSize(18);
    doc.text("Cálculo de Aproveitamento de Chaparia", 148, y, { align: "center" });
    y += 10;
  
    // --- TABELA PRINCIPAL ---
    const tabela = document.getElementById("tabelaChaparia");
    const headers = Array.from(tabela.querySelectorAll("thead th")).map(th => th.innerText);
    const body = Array.from(tabela.querySelectorAll("tbody tr")).map(tr =>
      Array.from(tr.querySelectorAll("td input")).map(input => input.value || "")
    );
  
    if (body.length > 0) {
      doc.autoTable({
        startY: y,
        head: [headers],
        body,
        styles: { fontSize: 6, cellPadding: 1 },
        headStyles: { fillColor: [255, 165, 0] },
        theme: "striped",
        margin: { left: 5, right: 5 },
        tableWidth: "auto",
      });
      y = doc.lastAutoTable.finalY + 10;
    } else {
      doc.setFontSize(12);
      doc.text("Nenhum dado na tabela de chaparia.", 10, y);
      y += 10;
    }
  
    // --- TABELA DE MATERIAIS FIXA (preços por tipo) ---
    doc.setFontSize(12);
    doc.text("Tabela de Preços de Materiais:", 10, y);
    y += 7;
  
    const materiaisFixos = [
      ["INOX304", "R$ 55,00", "KG"],
      ["INOX316", "R$ 90,00", "KG"],
      ["INOX430", "R$ 35,00", "KG"],
      ["SAE1020", "R$ 16,00", "KG"],
      ["GALVANIZADO", "R$ 17,00", "KG"]
    ];
  
    doc.autoTable({
      startY: y,
      head: [["MATERIAL CHAPA", "VALOR R$", "UNIDADE"]],
      body: materiaisFixos,
      styles: { fontSize: 9, cellPadding: 1 },
      headStyles: { fillColor: [200, 200, 200] },
      margin: { left: 5, right: 5 },
      tableWidth: "auto",
    });
  
    y = doc.lastAutoTable.finalY + 10;
  
    // --- RESUMO FINAL ---
    doc.setFontSize(12);
    doc.text("Resumo Final:", 10, y);
    y += 7;
  
    // Esses valores devem vir de inputs ou ser calculados, mas aqui está fixo como no modelo
    const pesoTotal = "0,00";
    const areaTotal = "0,00";
    const valorCarbono = "R$ 0,00";
    const valorInox = "R$ 0,00";
    const valorComNotaCarbono = "R$ 0,00";
    const valorComNotaInox = "R$ 0,00";
  
    const resumo = [
      [`Peso Total (Kg):`, pesoTotal],
      [`Área Total (m²):`, areaTotal],
      [`Valor Total Carbono:`, valorCarbono],
      [`Valor Total Inox:`, valorInox],
      [`Valor Real com Nota (Carbono):`, valorComNotaCarbono],
      [`Valor Real com Nota (Inox):`, valorComNotaInox],
    ];
  
    resumo.forEach(([label, valor]) => {
      doc.setFontSize(10);
      doc.text(`${label} ${valor}`, 10, y);
      y += 6;
    });
  
    y += 8;
    doc.setFontSize(10);
    doc.text("Após a finalização do processo o papel deverá ser retornado ao escritório.", 10, y);
  
    doc.save("chaparia.pdf");
  }

  window.onload = () => {
    adicionarLinha();
    adicionarMaterialUnificada();
    adicionarLinhaOrdemProducao();
    adicionarLinhaApontamento();
    adicionarLinhaChaparia();
  };
  
  // Alterna entre as abas
  function mostrarAba(id, event) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));
    document.getElementById(id).style.display = 'block';
    event.target.classList.add('active');
  }
  
  // Adiciona linha à aba Chaparia
  function adicionarLinhaChaparia() {
    const tabela = document.getElementById("corpoChaparia");
    const linha = document.createElement("tr");
    const totalColunas = 11;
  
    for (let i = 0; i < totalColunas; i++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.style.width = "100%";
      td.appendChild(input);
      linha.appendChild(td);
    }
  
    tabela.appendChild(linha);
  }
  

  
