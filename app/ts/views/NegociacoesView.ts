class NegociacoesView extends View<Negociacao[]>{

    template(model: Negociacao[]): string {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADES</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.map(negociacao => 
                `
                    <tr>
                        <td>${('00' + negociacao.data.getDate()).slice(-2)}/${('00' + (negociacao.data.getMonth()+1)).slice(-2)}/${negociacao.data.getFullYear()}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>                        
                `).join('')}  
            </tbody>

            <tfoot>
            </tfoot>
        </table>               
        `
    }
}