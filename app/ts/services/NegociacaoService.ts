import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService{

    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]>{
        
        return fetch('http://localhost:8080/dados')
            .then(resp => handler(resp))
            .then(resp => resp.json())
            .then((dados: NegociacaoParcial[]) => 
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {throw new Error(err.message)});
    }
}

export interface HandlerFunction{

    (resp: Response): Response

}
