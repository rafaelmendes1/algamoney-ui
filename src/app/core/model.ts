export class Pessoa {
    id: number;
    nome: string;
    ativo: boolean;
    endereco = new Endereco();
}

export class Lancamento {
    id: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}

export class Categoria {
    id: number;
}

export class Endereco {
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: number;
    cidade: string;
    estado: string;
}
