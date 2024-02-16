const categorias = [
  {
    idCategoria: 1,
    Descricao: "Gestão",
  },
  {
    idCategoria: 2,
    Descricao: "Cliente",
  },
  {
    idCategoria: 3,
    Descricao: "RP",
  },
];

const motivos = [
  {
    idMotivo: 1,
    Descricao: "Planejamento",
    idCategoria: 1,
  },
  {
    idMotivo: 2,
    Descricao: "Financeiro",
    idCategoria: 1,
  },
  {
    idMotivo: 3,
    Descricao: "Quebra de Máquina",
    idCategoria: 2,
  },
  {
    idMotivo: 4,
    Descricao: "Funções",
    idCategoria: 3,
  },
];

const produtos = [
  {
    idProduto: 1,
    Descricao: "Vassoura",
    Estoque: 20,
    EstoqueMinimo: 5,
    Unidade: "Un",
    Preco: 10.0,
  },
  {
    idProduto: 2,
    Descricao: "Fiação",
    Estoque: 11,
    EstoqueMinimo: 10,
    Unidade: "Un",
    Preco: 16.0,
  },
  {
    idProduto: 3,
    Descricao: "Ventilador",
    Estoque: 2,
    EstoqueMinimo: 6,
    Unidade: "Un",
    Preco: 10.0,
  },
];

const departamentos = [
  {
    idDep: 10,
    Descricao: "Sec. Educacao",
    Responsavel: "José",
  },
  {
    idDep: 30,
    Descricao: "Sec. Trabalho",
    Responsavel: "Luiz",
  },
  {
    idDep: 40,
    Descricao: "NAT",
    Responsavel: "Maria",
  },
];

const funcionarios = [
  {
    idFunc: 1,
    Nome: "Felipe Simas",
    Cargo: "Comissionado",
  },
  {
    idFunc: 2,
    Nome: "Roberto Viga",
    Cargo: "Colaborador",
  },
  {
    idFunc: 3,
    Nome: "João Simas",
    Cargo: "Gestor",
  },
  {
    idFunc: 4,
    Nome: "Paullo Farias",
    Cargo: "Gerente",
  },
  {
    idFunc: 5,
    Nome: "Tobias Mello",
    Cargo: "Colaborador",
  },
];
