
//-----------------------------Dados Principais Requisição--------------------------//

//data igual ou maior que a data atual, data atual no formato yyyy-mm-dd 
var hoje = new Date().toISOString().slice(0, 10);
var dataRequisicao = document.getElementById("dataRequisicao");
dataRequisicao.setAttribute("min", hoje);


function adicionarCorAoFocarInput() {
    const listinput = document.querySelectorAll("input");


    listinput.forEach(function (campo) {
        campo.addEventListener("focus", function () {

            campo.style.outlineColor = "#90ee90";
        });

        campo.addEventListener("blur", function () {
            campo.style.outlineColor = "white";
        });
    });
}
function carregarCategorias() {
    const selectCategoria = document.getElementById("categoriaMotivo");
    selectCategoria.innerHTML = "";

    const optFirst = document.createElement("option");
    optFirst.value = -1;
    optFirst.text = "";
    selectCategoria.add(optFirst);

    categorias.forEach(function (categoria) {
        var opt = document.createElement("option");
        opt.value = categoria.idCategoria;
        opt.text = categoria.Descricao;

        selectCategoria.add(opt);
    });
}

function carregarMotivos() {
    const selectMotivo = document.getElementById("Motivo");
    selectMotivo.innerHTML = "";

    const optFirst = document.createElement("option");
    optFirst.value = -1;
    optFirst.text = "";
    selectMotivo.add(optFirst);

    const valorCategoria = document.getElementById("categoriaMotivo").value;
    console.log("Categoria selecionada: " + valorCategoria);
    const motivosFiltrados = motivos.filter(
        (m) => m.idCategoria == valorCategoria
    );

    motivosFiltrados.forEach(function (motivo) {
        var opt = document.createElement("option");
        opt.value = motivo.idMotivo;
        opt.text = motivo.Descricao;
        selectMotivo.add(opt);
    });
}

document.getElementById("categoriaMotivo").addEventListener("change", function () {
    carregarMotivos();
});

document.getElementById("idDepartamento").addEventListener("keyup", function () {
    const codigoPesquisado = document.getElementById("idDepartamento").value;
    let departamentosFiltrados = departamentos.filter((p) => p.idDep == codigoPesquisado);

    if (departamentosFiltrados.length > 0) {
        document.getElementById("departamento").value = departamentosFiltrados[0].Descricao;
    } else {
        document.getElementById("departamento").value = "";
    }

});

document.getElementById("idFuncionario").addEventListener("keyup", function () {
    const codigoPesquisado = document.getElementById("idFuncionario").value;
    let departamentosFiltrados = funcionarios.filter((p) => p.idFunc == codigoPesquisado);


    if (departamentosFiltrados.length > 0) {
        document.getElementById("NomeFuncionario").value = departamentosFiltrados[0].Nome;
    } else {
        document.getElementById("NomeFuncionario").value = "";
    }
    if (departamentosFiltrados.length > 0) {
        document.getElementById("cargo").value = departamentosFiltrados[0].Cargo;
    } else {
        document.getElementById("cargo").value = "";
    }

});

function carregarMotivos() {
    const selectMotivo = document.getElementById("Motivo");
    selectMotivo.innerHTML = "";

    const optionFirst = document.createElement("option");
    optionFirst.value = -1;
    optionFirst.text = "";
    selectMotivo.appendChild(optionFirst);

    const valorCategoria = document.getElementById("categoriaMotivo");
    const motivosFiltrados = motivos.filter(
        (m) => m.idCategoria == valorCategoria.value
    );

    motivosFiltrados.forEach(function (motivo) {
        let option = document.createElement("option");
        option.value = motivo.idMotivo;
        option.text = motivo.Descricao;
        selectMotivo.add(option);
    });
    document.getElementById("Motivo").disabled = false;
}

let categoriaMotivoElement = document.getElementById("categoriaMotivo");

categoriaMotivoElement.addEventListener("change", function () {
    if (categoriaMotivoElement.value == "-1") {
        document.getElementById("Motivo").disabled = true;

        document.getElementById("Motivo").value = "";

        return;
    }
    carregarMotivos();
});

//Número pedido
var inpNumero = document.getElementById("inpNumero");

    inpNumero.addEventListener("input", function() {
        var numeroRequisicao = inpNumero.value;

        var spanItensRequisicao = document.getElementById("itensRequisicao").querySelector("span");

        spanItensRequisicao.textContent = "Itens da Requisição Nº " + numeroRequisicao;
    });

//-------------------------------ITENS REQUISIÇÃO - PRODUTOS-----------------------------

function verificarProduto() {
    //  Verificar se o produto tem estoque
    const codigoProdutoInput = document.getElementById('CodigoProduto');
    const codigoProduto = parseInt(codigoProdutoInput.value);

    const produto = produtos.find(p => p.idProduto === codigoProduto);

    if (produto) {
        const nivelImg = document.getElementById('nivel');

        const estoqueMinimo = produto.EstoqueMinimo;
        const limiteSuperior = estoqueMinimo * 1.1;
        const limiteInferior = estoqueMinimo * 0.9;

        if (produto.Estoque > limiteSuperior) {
            nivelImg.src = "assets/img/verde.svg";
        } else if (produto.Estoque < limiteInferior) {
            nivelImg.src = "assets/img/vermelho.svg"; 
        } 
        else {
            nivelImg.src = "assets/img/amarelo.svg"; 
        }
    }

    const codigoPesquisado = document.getElementById('CodigoProduto').value;
    let produtosFiltrados = produtos.filter((p)=>p.idProduto == codigoPesquisado);

    if (produtosFiltrados.length>0) {
        document.getElementById('DescricaoProduto').value = produtosFiltrados[0].Descricao;
        document.getElementById('Estoque').value = produtosFiltrados[0].Estoque;
        if (document.getElementById('Estoque').value <= 0) {
            document.getElementById('Quantidade').setAttribute("disabled", true);
            document.getElementById('Quantidade').value = "";
        }
        else {
            document.getElementById('Quantidade').removeAttribute("disabled");
            document.getElementById('Quantidade').value = 1;
        }

    }
    else{
        document.getElementById('DescricaoProduto').value = "";
        document.getElementById('Estoque').value = "";
        document.getElementById('Quantidade').setAttribute("disabled", true);
        document.getElementById('Quantidade').value = "";
    }

    validarQuantidade();
}
//Validar botão adcionar
function verificarEstoqueBotao() {
    var codigoProduto = parseInt(document.getElementById('CodigoProduto').value);
    var quantidade = parseInt(document.getElementById('QuantidadeEstoque').value);
    var btnAdicionar = document.getElementById('BtnInserirItens');
    

    if (codigoProduto && quantidade > 0) {
        var produto = produtos.find(p => p.idProduto === codigoProduto);
        var btnGravar = document.getElementById('btn-gravar');

        if (produto && quantidade <= produto.Estoque) {
            btnAdicionar.removeAttribute('disabled');
            btnGravar.removeAttribute('disabled');
        } else {
            alert('Produto não encontrado ou a quantidade inserida é maior do que a quantidade existente em estoque!\nPor favor, insira outro valor.');
            btnAdicionar.setAttribute('disabled', 'disabled');
            btnGravar.setAttribute('disabled', 'disabled');
        }
    } else {
        btnAdicionar.setAttribute('disabled', 'disabled');
    }
}
document.getElementById("CodigoProduto").addEventListener("keyup", function () {
    let codigoPesquisado = document.getElementById("CodigoProduto").value;
    if (codigoPesquisado < 0) {
        document.getElementById('CodigoProduto').value = Math.abs(document.getElementById('CodigoProduto').value);
    }

    verificarProduto();
});

function validarQuantidade() {
    const campoQuantidade = document.getElementById('Quantidade');
    const campoEstoque = document.getElementById('Estoque');
    
    if (campoQuantidade.value === "") {
        document.getElementById('BtnInserirItens').setAttribute("disabled", true);
        
        return;
    }
    if (campoQuantidade.value < 0) {
        campoQuantidade.value = Math.abs(campoQuantidade.value);

    }
    if (campoQuantidade.value == 0) {
        campoQuantidade.value = 1;
    }

    let quantidade = parseInt(campoQuantidade.value);
    let estoque = parseInt(campoEstoque.value);
    if (quantidade <= estoque && quantidade > 0 && Number.isInteger(quantidade)) {
        document.getElementById('BtnInserirItens').removeAttribute("disabled");
    }
    else {
        document.getElementById('BtnInserirItens').setAttribute("disabled", true);
        
    }
}

document.getElementById('Quantidade').addEventListener("keyup", function(){
    validarQuantidade();
})
document.getElementById('Quantidade').addEventListener("change", function(){
    validarQuantidade();
})



document.getElementById("btn-gravar").addEventListener("click", function () {
    const elementosObrigatorios = document.querySelectorAll('[data-obrigatorio="true"]');
    // console.log(elementosObrigatorios);

    let validadoCamposPreenhcidos = true;

    setTimeout(function () {
        // validadoCamposPreenhcidos=true;
        if (validadoCamposPreenhcidos) {
            document.getElementById("modalSucesso").style.display = "block";
        }
    }, 1000);

    elementosObrigatorios.forEach(function (item) {
        if (item.value == "" || item.value == -1) {
            item.style.backgroundColor = "#e75656";
            validadoCamposPreenhcidos = false;
        }
    });

    const chkUrgenteValue = document.getElementById("urgente").checked;
    const chkMedioValue = document.getElementById("medio").checked;
    const chkBaixoValue = document.getElementById("baixo").checked;
    if (chkUrgenteValue == false && chkMedioValue == false && chkBaixoValue == false) {
        const divPrioridade = document.getElementById("radioPrioridade");

        divPrioridade.classList.remove("radioPrioridade");
        divPrioridade.classList.add("radioPrioridadeDesabilitado");

        document.getElementById("urgente").classList.remove("chkPrioridade");
        document.getElementById("urgente").classList.add("chkPrioridadeDesabilitado");
        document.getElementById("medio").classList.remove("chkPrioridade");
        document.getElementById("medio").classList.add("chkPrioridadeDesabilitado");
        document.getElementById("baixo").classList.remove("chkPrioridade");
        document.getElementById("baixo").classList.add("chkPrioridadeDesabilitado");
        validadoCamposPreenhcidos = false;
    }
});

function eventoClickPrioridadeHabilitarCor() {
    const checkboxesPrioridade = document.querySelectorAll(".chkPrioridade");
    console.log(checkboxesPrioridade);
    checkboxesPrioridade.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            const divPrioridade = document.getElementById("radioPrioridade");
            divPrioridade.classList.add("radioPrioridade");
            divPrioridade.classList.remove("radioPrioridadeDesabilitado");
            document.getElementById("urgente").classList.add("chkPrioridade");
            document.getElementById("urgente").classList.remove("chkPrioridadeDesabilitado");
            document.getElementById("medio").classList.add("chkPrioridade");
            document.getElementById("medio").classList.remove("chkPrioridadeDesabilitado");
            document.getElementById("baixo").classList.add("chkPrioridade");
            document.getElementById("baixo").classList.remove("chkPrioridadeDesabilitado");
        });
    });
}

function adcionarRegraCamposSomenteNumeros() {
    const elementosAceitaSoNumeros = document.querySelectorAll('[data-only-number="true"]');
    elementosAceitaSoNumeros.forEach(function (campo) {
        campo.addEventListener("keypress", function (e) {
            if (e.keyCode < 48 || e.keyCode > 59) {
                e.preventDefault();
            }
        });
    });
}


//Constante do valor total de requisição, zerado para evitar erro
const totalRequisicao = document.getElementById('total')
totalRequisicao.value = 0

//Retonar o elemento btnRemover
function criarBtnRemover(tabela, objLinha, numeroLinha){
    const btnRemoverItem = document.createElement('div');
        btnRemoverItem.className = "BtnRemover";
        btnRemoverItem.id = 'btnRemover' + numeroLinha;
        btnRemoverItem.innerHTML = '<span class="BtnRemover" id="btnRemover">Remover</span>';
    
    btnRemoverItem.addEventListener('click', function(){
        if (objLinha && tabelaItens.contains(objLinha)){
            tabelaItens.removeChild(objLinha);
        }

        const colunas = objLinha.getElementsByTagName('td');
        let valorLinha = colunas[5].innerText;

        totalRequisicao.value = parseFloat(totalRequisicao.value - parseFloat(valorLinha));

    });

    return btnRemoverItem;
}


var qtdLinhasAtualNaTabela = 0;
document.getElementById("BtnInserirItens").addEventListener("click", function () {
    
    const tabelaItens = document.getElementById("tabelaItens");

    const campoProduto = document.getElementById("CodigoProduto");
    const campoDescricaoProduto = document.getElementById("DescricaoProduto");
    const campoQuantidade = document.getElementById("Quantidade");
    // const totalRequisicao = document.getElementById("total");

    const linha = document.createElement("tr");

    const tdCodigo = document.createElement("td");
    const tdDrescricao = document.createElement("td");
    const tdQuantidade = document.createElement("td");
    const tdUnd = document.createElement("td");
    const tdPreco = document.createElement("td");
    const tdTotalLinha = document.createElement("td");
    const tdBtnRemover = document.createElement("td");

    const produtoPesquisado = produtos.filter((p) => p.idProduto == campoProduto.value);
    console.log(produtoPesquisado);

    tdCodigo.innerHTML = campoProduto.value;
    tdDrescricao.innerHTML = campoDescricaoProduto.value;
    tdQuantidade.innerHTML = campoQuantidade.value;
    tdUnd.innerHTML = produtoPesquisado[0].Unidade;
    tdPreco.innerHTML = produtoPesquisado[0].Preco;
    tdTotalLinha.innerHTML = campoQuantidade.value * produtoPesquisado[0].Preco;

    linha.appendChild(tdCodigo);
    linha.appendChild(tdDrescricao);
    linha.appendChild(tdQuantidade);
    linha.appendChild(tdUnd);
    linha.appendChild(tdPreco);
    linha.appendChild(tdTotalLinha);
    tabelaItens.appendChild(linha);

    totalRequisicao.value = parseFloat(totalRequisicao.value) + parseFloat(campoQuantidade.value * produtoPesquisado[0].Preco);

    tdBtnRemover.appendChild(criarBtnRemover(tabelaItens, linha, qtdLinhasAtualNaTabela++));
    linha.appendChild(tdBtnRemover);
    tabelaItens.appendChild(linha);

            // Clear the fields
            document.getElementById("CodigoProduto").value = "";
            document.getElementById("DescricaoProduto").value = "";
            document.getElementById("Estoque").value = "";
            document.getElementById("Quantidade").value = "";

});

document.getElementById('total').addEventListener("change", function () {
    const campoPrecoTotal = document.getElementById('total');
    let total = parseFloat(campoPrecoTotal.value);

    // console.log("Mudança total");

})

document.addEventListener('DOMContentLoaded', function () {
    const imagesWithTooltip = document.querySelectorAll('.image-with-tooltip');

    imagesWithTooltip.forEach(image => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = `<div class="tooltipDiv"><img src="assets/img/verde.svg" alt="Imagem no Tooltip"><p>: Estoque acima de 10% do estoque mínimo.</p></div><div class="tooltipDiv"><img src="assets/img/amarelo.svg" alt="Imagem no Tooltip"><p>: Estoque abaixo de 10% do estoque mínimo.</p></div><div class="tooltipDiv"><img src="assets/img/vermelho.svg" alt="Imagem no Tooltip"><p>: Estoque abaixo do estoque mínimo.</p></div>`;
        image.parentNode.appendChild(tooltip);
    });
});


// Seleciona todos os inputs do tipo number e desativa as setas para cada input do tipo number
document.addEventListener('DOMContentLoaded', function () {
    var numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(function (input) {
        input.addEventListener('wheel', function (e) {
            e.preventDefault();
        });
    });
});





adicionarCorAoFocarInput();
carregarCategorias();
carregarMotivos();
verificarProduto();
adcionarRegraCamposSomenteNumeros();
criarBtnRemover();