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
    doc.text("Orçamento I9", 105, y, { align: "center" });
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
    doc.text("Relatório de Materiais - Itu Inox (Unificado)", 148, y, { align: "center" });
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

  

  
