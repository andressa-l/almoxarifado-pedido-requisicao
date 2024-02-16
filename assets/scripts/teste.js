// ----------------- PRODUTOS ----------------- //
saideElement = document.getElementById("Saida");

document.getElementById("CodigoProduto").addEventListener("blur", function () {
    const idProduto = document.getElementById("CodigoProduto").value;
    const produtoFiltrado = produtos.filter((p) => p.idProduto == idProduto);

    if (produtoFiltrado.length == 0) {
        document.getElementById("DescricaoProduto").value = "";
        document.getElementById("Estoque").value = "";
        saideElement.disabled = true;
        return;
    }
    document.getElementById("DescricaoProduto").value =
        produtoFiltrado[0].Descricao;
    document.getElementById("Estoque").value = produtoFiltrado[0].Estoque;

    acimaDe10(produtoFiltrado[0].Estoque, produtoFiltrado[0].EstoqueMinimo);
    saideElement.disabled = false;
});

saideElement.addEventListener("blur", function () {
    if (
        parseInt(document.getElementById("Estoque").value) >=
        parseInt(saideElement.value) &&
        parseInt(saideElement.value) != 0 &&
        saideElement.value != ""
    ) {
        document.getElementById("BtnInserirItens").style.display = "flex";
        return;
    }

    document.getElementById("BtnInserirItens").style.display = "none";
});

let itensDaSecao = [];

function adicionarProduto() {
    event.preventDefault();
    const idProduto = document.getElementById("CodigoProduto").value;

    const produtoFiltrado = produtos.find((p) => p.idProduto == idProduto);

    if (!produtoFiltrado) {
        alert("Produto não encontrado");
        return;
    }

    if (varificarSeExisteProduto(idProduto)) {
        alert("Produto já adicionado");
        return;
    }

    const descricaoProduto = document.getElementById("DescricaoProduto").value;
    const quantidade = document.getElementById("Saida").value; // Suponho que você queira usar o campo Estoque
    const preco = produtoFiltrado.Preco;
    const total = quantidade * preco;

    if (quantidade > produtoFiltrado.Estoque) {
        alert("Quantidade maior que o estoque");
        return;
    }
    if (quantidade <= 0) {
        alert("Quantidade inválida");
        return;
    }

    const novoItem = {
        idProduto,
        descricaoProduto,
        quantidade,
        preco,
        total,
    };

    itensDaSecao.push(novoItem);

    let tabela = document.getElementById("tabela-body");

    let linha = document.createElement("tr");

    let divProduto = document.createElement("td");
    let divDescricao = document.createElement("td");
    divProduto.setAttribute("class", "codigo");
    divDescricao.setAttribute("class", "descricao");
    let divQuantidade = document.createElement("td");
    let divUnidade = document.createElement("td");
    let divPreco = document.createElement("td");
    let divTotal = document.createElement("td");
    let divExcluir = document.createElement("th");
    divExcluir.setAttribute("class", "excluir");

    divProduto.textContent = idProduto;
    divDescricao.textContent = descricaoProduto;
    divQuantidade.textContent = quantidade;
    divUnidade.textContent = `1`; // Substitua com a unidade real, se aplicável
    divPreco.textContent = preco;
    divTotal.textContent = total;
    divExcluir.textContent = "X";

    linha.appendChild(divProduto);
    linha.appendChild(divDescricao);
    linha.appendChild(divQuantidade);
    linha.appendChild(divUnidade);
    linha.appendChild(divPreco);
    linha.appendChild(divTotal);
    linha.appendChild(divExcluir);

    divExcluir.addEventListener("click", () => {
        tabela.removeChild(linha);
        removeItemDaSecao(idProduto, quantidade);
        atualizarTotal();
    });

    tabela.appendChild(linha);

    saidaDeProdutos(idProduto, quantidade);
    limparCampoProduto();
    saideElement.disabled = true;
    document.getElementById("BtnInserirItens").style.display = "none";

    atualizarTotal();
}

function removeItemDaSecao(idProduto, quantidade) {
    adicionaEstoqueProduto(idProduto, parseInt(quantidade));

    itensDaSecao = itensDaSecao.filter((item) => item.idProduto != idProduto);
}

function limparCampoProduto() {
    document.getElementById("CodigoProduto").value = "";
    document.getElementById("DescricaoProduto").value = "";
    document.getElementById("Estoque").value = "";
    document.getElementById("Saida").value = "";
}

function atualizarTotal() {
    let total = 0;

    for (let item of itensDaSecao) {
        total += item.total;
    }
    document.getElementById("totalItens").textContent = total;
}

function varificarSeExisteProduto(idProduto) {
    let existe = false;

    for (const item of itensDaSecao) {
        if (item.idProduto == idProduto) {
            existe = true;
        }
    }
    return existe;
}

function adicionaEstoqueProduto(idProduto, quantidade) {
    produtos[idProduto - 1].Estoque += quantidade;
}



/*function adicionarProduto() {
    event.preventDefault();
    const idProduto = document.getElementById("CodigoProduto").value;

    const produtoFiltrado = produtos.find((p) => p.idProduto == idProduto);

    if (!produtoFiltrado) {
        alert("Produto não encontrado");
        return;
    }

    if (varificarSeExisteProduto(idProduto)) {
        alert("Produto já adicionado");
        return;
    }

    const descricaoProduto = document.getElementById("DescricaoProduto").value;
    const quantidade = document.getElementById("Quantidade").value; // Suponho que você queira usar o campo Estoque
    const preco = produtoFiltrado.Preco;
    const total = quantidade * preco;

    if (quantidade > produtoFiltrado.Estoque) {
        alert("Quantidade maior que o estoque");
        return;
    }
    if (quantidade <= 0) {
        alert("Quantidade inválida");
        return;
    }

    const novoItem = {
        idProduto,
        descricaoProduto,
        quantidade,
        preco,
        total,
    };

    itensDaSecao.push(novoItem);

    let tabela = document.getElementById("tabelaItens");

    let linha = document.createElement("tr");

    let divProduto = document.createElement("td");
    let divDescricao = document.createElement("td");
    divProduto.setAttribute("class", "codigo");
    divDescricao.setAttribute("class", "descricao");
    let divQuantidade = document.createElement("td");
    let divUnidade = document.createElement("td");
    let divPreco = document.createElement("td");
    let divTotal = document.createElement("td");
    let divExcluir = document.createElement("th");
    divExcluir.setAttribute("class", "excluir");

    divProduto.textContent = idProduto;
    divDescricao.textContent = descricaoProduto;
    divQuantidade.textContent = quantidade;
    divUnidade.textContent = `1`; // Substitua com a unidade real, se aplicável
    divPreco.textContent = preco;
    divTotal.textContent = total;
    divExcluir.textContent = "X";

    linha.appendChild(divProduto);
    linha.appendChild(divDescricao);
    linha.appendChild(divQuantidade);
    linha.appendChild(divUnidade);
    linha.appendChild(divPreco);
    linha.appendChild(divTotal);
    linha.appendChild(divExcluir);

    divExcluir.addEventListener("click", () => {
        tabela.removeChild(linha);
        removeItemDaSecao(idProduto, quantidade);
        atualizarTotal();
    });

    tabela.appendChild(linha);

    saidaDeProdutos(idProduto, quantidade);
    limparCampoProduto();
    saideElement.disabled = true;
    document.getElementById("BtnInserirItens").style.display = "none";

    atualizarTotal();
}

function removeItemDaSecao(idProduto, quantidade) {
    adicionaEstoqueProduto(idProduto, parseInt(quantidade));

    itensDaSecao = itensDaSecao.filter((item) => item.idProduto != idProduto);
}

function limparCampoProduto() {
    document.getElementById("CodigoProduto").value = "";
    document.getElementById("DescricaoProduto").value = "";
    document.getElementById("Estoque").value = "";
    document.getElementById("Quantidade").value = "";
}

function atualizarTotal() {
    let total = 0;

    for (let item of itensDaSecao) {
        total += item.total;
    }
    document.getElementById("total").textContent = total;
}

function varificarSeExisteProduto(idProduto) {
    let existe = false;

    for (const item of itensDaSecao) {
        if (item.idProduto == idProduto) {
            existe = true;
        }
    }
    return existe;
}

function adicionaEstoqueProduto(idProduto, quantidade) {
    produtos[idProduto - 1].Estoque += quantidade;
}*/


function criarBtnRemover(tabela, linha) {
    btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.innerHTML = "Remover";
    btnRemover.addEventListener("click", function () {
        tabela.removeChild(linha);
        atualizarValorTotal();
    }),
        linha.appendChild(btnRemover);
}
campoBuscaProdutos.addEventListener('keyup', function (e) {
    if (this.value == "") {
        tabelaProdutos.innerHTML = "";
        return;
    }
    let produtosFiltrados = produtos.filter(p => p.Descricao.toLowerCase().includes(this.value.toLowerCase()));
    tabelaProdutos.innerHTML = "";
    produtosFiltrados.forEach(p => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${p.idProduto}</td><td>${p.Descricao}</td><td>${p.Estoque}</td><td>${p.EstoqueMinimo}</td><td>${p.Unidade}</td><td>${p.Preco}</td>`;
        tabelaProdutos.appendChild(tr);
    }
    );
});

botaoAdicionar.addEventListener('click', function (e) {

    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (!validaCampos()) {  //valida campos
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${idProduto}</td><td>${descricao}</td><td>${estoque}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
});
//função para adicionar um novo elemento a lista de compras
function addItemListaCompra() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (!validaCampos()) {  //valida campos
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${idProduto}</td><td>${descricao}</td><td>${estoque}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
}
//função para limpar os campos
function limparCampos() {
    document.getElementById('idProduto').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('estoque').value = "";
    document.getElementById('estoqueMinimo').value = "";
    document.getElementById('unidade').value = "";
    document.getElementById('preco').value = "";
}
//função para validar os campos
function validaCampos() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (idProduto == "" || descricao == "" || estoque == "" || estoqueMinimo == "" || unidade == "" || preco == "") {
        alert('Todos os campos são obrigatórios');
        return false;
    }
    return true;
}
//função para adicionar um novo elemento a lista de compras
function addItemListaCompra() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (!validaCampos()) {  //valida campos
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${idProduto}</td><td>${descricao}</td><td>${estoque}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
}
//função para limpar os campos
function limparCampos() {
    document.getElementById('idProduto').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('estoque').value = "";
    document.getElementById('estoqueMinimo').value = "";
    document.getElementById('unidade').value = "";
    document.getElementById('preco').value = "";
}
//função para validar os campos
function validaCampos() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (idProduto == "" || descricao == "" || estoque == "" || estoqueMinimo == "" || unidade == "" || preco == "") {
        alert('Todos os campos são obrigatórios');
        return false;
    }
    return true;
}
//função para adicionar um novo elemento a lista de compras
function addItemListaCompra() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (!validaCampos()) {  //valida campos
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${idProduto}</td><td>${descricao}</td><td>${estoque}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
}
//função para limpar os campos
function limparCampos() {
    document.getElementById('idProduto').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('estoque').value = "";
    document.getElementById('estoqueMinimo').value = "";
    document.getElementById('unidade').value = "";
    document.getElementById('preco').value = "";
}
//função para validar os campos
function validaCampos() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (idProduto == "" || descricao == "" || estoque == "" || estoqueMinimo == "" || unidade == "" || preco == "") {
        alert('Todos os campos são obrigatórios');
        return false;
    }
    return true;
}
//função para adicionar um novo elemento a lista de compras
function addItemListaCompra() {
    let idProduto = document.getElementById('idProduto').value;
    let descricao = document.getElementById('descricao').value;
    let estoque = document.getElementById('estoque').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (!validaCampos()) {  //valida campos
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${idProduto}</td><td>${descricao}</td><td>${estoque}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
}
//função para limpar os campos
function limparCampos() {
    document.getElementById('idProduto').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('estoque').value = "";
    document.getElementById('estoqueMinimo').value = "";
    document.getElementById('unidade').value = "";
    document.getElementById('preco').value = "";
}
//função que verifica se o campo "Estoque Atual" é menor do que o campo "Estoque Mínimo" e retorna uma mensagem de erro ou sucesso
//função que busca o produto por código e popula os campos com as informações do produto
function buscarProdutoPorCodigo() {
    let codigoProduto = document.getElementById('codigoProduto').value;
    let produto = produtos.find(p => p.idProduto == codigoProduto);
    if (produto) {
        document.getElementById('descricaoProduto').value = produto.descricao;
        document.getElementById('estoqueAtual').value = produto.estoque;
        document.getElementById('estoqueMinimo').value = produto.estoqueMinimo;
        document.getElementById('unidade').value = produto.unidade;
        document.getElementById('preco').value = produto.preco;
    } else {
        alert('Produto não encontrado');
    }
}
//adicionando eventos ao botão de adicionar item na lista de compra
document.getElementById('btnAdicionarItem').addEventListener('click', function () {
    let codigoProduto = document.getElementById('codigoProduto').value;
    let descricaoProduto = document.getElementById('descricaoProduto').value;
    let estoqueAtual = document.getElementById('estoqueAtual').value;
    let estoqueMinimo = document.getElementById('estoqueMinimo').value;
    let unidade = document.getElementById('unidade').value;
    let preco = document.getElementById('preco').value;
    if (codigoProduto == '' || descricaoProduto == '' || estoqueAtual == '' || estoqueMinimo == '' || unidade == '' || preco == '') {
        alert('Todos os campos são obrigatórios');
        return;
    }
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${codigoProduto}</td><td>${descricaoProduto}</td><td>${estoqueAtual}</td><td>${estoqueMinimo}</td><td>${unidade}</td><td>${preco}</td>`;
    tabelaProdutos.appendChild(tr);
    limparCampos();
});
//função para limpar os campos da tabela de itens da compra
function limparCampoItensCompra() {
    document.getElementById('codigoProduto').value = '';
    document.getElementById('descricaoProduto').value = '';
    document.getElementById('estoqueAtual').value = '';
    document.getElementById('estoqueMinimo').value = '';
    document.getElementById('unidade').value = '';
    document.getElementById('preco').value = '';
}
//função que remove um item da lista de compras
function removerItem(indice) {
    produtosDaCompra.splice(indice, 1);
    atualizarListaDeCompras();
}
//atualizando a lista de compras no html
function atualizarListaDeCompras() {
    //limpando a tabela antes de adicionar novamente
    let linhas = document.querySelectorAll('#tabelaItensCompra tr');
    for (let i = linhas.length - 1; i > 0; i--) {
        linhas[i].parentNode.removeChild(linhas[i]);
    }
    //percorrendo o array e criando as linhas da tabela
    for (let i in produtosDaCompra) {
        let linha = document.createElement('tr');
        //coluna de remoção
        let colunaRemocao = document.createElement('td');
        let botaoRemover = document.createElement('button');
        botaoRemover.className = 'btn btn-danger';
        botaoRemover.innerHTML = 'Remover';
        botaoRemover.onclick = function () { removerItem(i) };
        colunaRemocao.appendChild(botaoRemover);
        linha.appendChild(colunaRemocao);

        //colunas com dados do produto
        for (let j in produtosDaCompra[i]) {
            let colunaDados = document.createElement('td');
            colunaDados.textContent = produtosDaCompra[i][j];
            linha.appendChild(colunaDados);
        }

        //adicionando a linha na tabela
        let corpoTabela = document.querySelector('#corpoTabelaItensCompra');
        corpoTabela.appendChild(linha);
    }
}
//função para calcular o total da compra
function calcularTotal() {
    let total = 0;
    for (let i in produtosDaCompra) {
        total += parseFloat(produtosDaCompra[i].preco);
    }
    document.getElementById('totalCompra').textContent = total;
}
//função que adiciona um item à lista de compras
function adicionarProduto() {

    /*pegando os valores dos inputs*/
    let nome = document.getElementById('nomeProduto').value;
    let preco = document.getElementById('valorUnitario').value;
    let quantidade = document.getElementById('quantidade').value;

    /*verificando se todos os campos foram preenchidos*/
    if (nome == '' || preco == '' || quantidade == '') {
        alert("Preencha todos os campos!");
        return false;
    }

    /*conversão das entradas em float e verificação se é numérico*/
    preco = parseFloat(preco);
    if (isNaN(preco)) {
        alert("O valor unitário deve ser numérico");
        return false;
    }

    quantidade = parseInt(quantidade);
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("A quantidade deve ser um número inteiro maior do que zero.");
        return false;
    }
}