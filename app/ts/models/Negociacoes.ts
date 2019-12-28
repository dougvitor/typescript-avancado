import { Negociacao } from './index';
import { logarTempoDeExecucao } from '../helpers/decorators/index';
import { MeuObjeto } from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes>{

    private _negociacoes : Negociacao [] = [];

    adiciona(negociacao : Negociacao): void{
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao()
    getNegociacoes(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
        
    }

    toFuckString(): void{

        console.log(
            `
                Impressão
                ${JSON.stringify(this._negociacoes)}
            `
        );
    }

    ehIgual(negociacoes: Negociacoes): boolean{

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.getNegociacoes());
    }

}