let nConta = new Set();

let qntdContas = [];
let nTransf = [];

let transfSorteio = getRandomNum("int", 20, 1);
let bancos = ["Bradesco", "Original", "BB"];
let meio = ["TED", "DOC", "PIX"];
let tipoTransf = ["intrabancaria", "interbancaria"];
let headerContas =  [ "numero", "saldo", "limiteTransf",  "banco", "transfRecebidas", "transfEfetuadas", "transfNegadas"];
let headerTransf = [ "meio", "tipo", "valor",  "origem", "destino", "descricao"];

// funções
function getRandomNum (type="flt", max, min=0){
    if (type == "flt") {
        return (Math.random()*(max-min)+min);
    }
    return Math.floor(Math.random()*(max-min)+min);
}

function typeDescription(saldo, limite, valor){
    if(valor > limite){
        return 0;
    }
    if(valor > saldo){
        return 1;
    }
    return 2;
}

function getBankForId(ori, dest){
    let origem;
    let destino;
    qntdContas.forEach(conta=>{
        if (conta.numero == ori){
            origem = conta.banco;
        }
    })
    qntdContas.forEach(obj=>{
        if (obj.numero == dest){
            destino = obj.banco;
        }
    })
    if (destino == origem){
        return "intrabancario";
    }
    return "interbancario"; 
}

function getRandomId(){
    let nContaArr = Array.from(nConta);
    return nContaArr[getRandomNum("int", 5)];
    
}

// numeros únicos da conta
while (nConta.size < 5){
    let num = Math.floor(Math.random() * 100 + 1);
    nConta.add(num);
}

nConta.forEach (i =>{
    const contaBancaria = {
        numero: i,
        saldo: getRandomNum("flt", 100000, 0).toFixed(2),
        limiteTransf: getRandomNum("flt", 50000, 1000).toFixed(2),
        historico: [], 
        banco: bancos[getRandomNum("str", 3)],
        transfRecebidas: 0,
        transfEfetuadas: 0,
        transfNegadas: 0,
    }; qntdContas.push(contaBancaria);
})

// console
console.log("Antes das transferências");
console.table(qntdContas, headerContas);

console.log("Número de transferências sorteado: ", transfSorteio);

while (nTransf.length < transfSorteio) {
    let origem = getRandomId();
    let destino = getRandomId();
    let tipoTransf = getBankForId(origem, destino);
    let saldo;
    let limite;
    let valor = getRandomNum("flt", 50000, 1000).toFixed(2);
    let msg;
    
    while (origem == destino){
        destino = getRandomId();
    }

    qntdContas.forEach(conta=>{
        if(conta.numero == origem){
            saldo = conta.saldo;
            limite = conta.limiteTransf;
        }
    })

    let desc = typeDescription(saldo, limite, valor);
    if (desc == 0){
        msg = "transação negada! limite excedido";
    } else if (desc == 1){
        msg = "transação negada! saldo insuficiente";
    } else if (desc == 2){
        msg = "transação efetuada!";
    }

    const transferencia = {
        meio: meio[getRandomNum("str", 3)],
        tipo: tipoTransf,
        valor: valor,
        origem: origem ,
        destino: destino,
        descricao: msg,
    }

    qntdContas.forEach(conta => {
        if (conta.numero == transferencia.origem){
            conta.historico.push(transferencia); 
            if (desc == 0 || desc == 1){
                conta.transfNegadas += 1;
            }
            if (desc == 2){
                conta.transfEfetuadas += 1;
            }
        }
        if (conta.numero == transferencia.destino){
            if (desc == 2){
                conta.historico.push(transferencia); 
                conta.transfEfetuadas += 1;
                conta.transfRecebidas += 1;
            }
        }
    })
    nTransf.push(transferencia);
}

console.log("Depois das transferências");
console.table(qntdContas, headerContas);

for (let i = 0; i<5; i++) {
    console.log("Histórico da conta ", qntdContas[i].numero);
    console.table(qntdContas[i].historico, headerTransf);
}