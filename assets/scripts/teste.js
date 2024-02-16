// ----------------- PRODUTOS ----------------- //
saideElement = document.getElementById("Quantidade");

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
