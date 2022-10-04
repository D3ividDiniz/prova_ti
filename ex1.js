//Variables
let types_product = [getRandomNum(5,1)];
let types = [];
let prices = [];
let products = [];
let perdas = 0;
let quantidade = 0; 

//Shared
class ProductModel {
    constructor(Tipo,Hoje,Fabricacao,Validade,ValidadeDias, Qualidade, PrecoUnitario, Quantidade){
        this.Tipo = Tipo;
        this.Hoje = Hoje;
        this.Fabricacao = Fabricacao;
        this.Validade = Validade;
        this.ValidadeDias = ValidadeDias;
        this.Qualidade = Qualidade;
        this.PrecoUnitario = PrecoUnitario;
        this.Quantidade = Quantidade;
    }
}
function getRandomNum (max, min=0){
    return (Math.floor(Math.random()*(max - min)+min));
}
function getFltRandomNum (max, min=0){
    return (Math.random()*(max - min)+min).toFixed(2);
}
function getData(end=new Date(2022, 0 , 20)) {
    now = new Date();
    start = new Date(now.getFullYear(),9, 1);
    data = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return data
}
function sumData(data, soma){
    data = new Date(data)
    data.setDate(data.getDate() + soma);
    return data
}

//Code
for(let i = 1; i < types_product[0]+1; i++){
    for(let j = 0; j < getRandomNum(9); j++){
        types.push(i)
    }
    prices.push(getFltRandomNum(100));
}
types_product.push(types);
types_product[1].forEach(typeProduct=>{
    let fabricacao = getData();
    let validadeDias = getRandomNum(365);
    let validade = sumData(fabricacao, validadeDias);

    let product = new ProductModel(
        typeProduct,
        `${(new Date()).toLocaleString().substring(0,10)}`,
        fabricacao.toLocaleString().substring(0,10) ,
        validade.toLocaleString().substring(0,10),
        validadeDias,
        ((Date.now() > validade) ? 'Vencido' : 'Consumível'),
        prices[typeProduct-1],
        getRandomNum(300,1));
    products.push(product);
})
products.forEach(product=>{
    if(product.Qualidade == 'Vencido'){
        quantidade+=product.Quantidade;
        perdas += (Number(product.PrecoUnitario)*product.Quantidade)
    }
})
console.table(products);
console.table({perdas:"R$"+perdas.toFixed(2),quantidade:quantidade});