import { NegociacaoController } from './controllers/index'; 

const controller = new NegociacaoController();

// DOM document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller));

$('.form').submit(controller.adiciona.bind(controller));

$('#btn-importa').click(controller.importaDados.bind(controller));