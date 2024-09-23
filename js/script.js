$.ajax( {
    type: "GET",
    url: 'js/pctViagem.json',
    dataType: "json",
    success: dados => { 
        let pacotes = dados.pacotes;
        
        let contador = 1
        pacotes.forEach(element => {
            
            let listItem = $(`<li class="nav-item"></li>`);
            let divCard = $(`<div class="card-destino-${contador}"></div>`);
            listItem.append(divCard);

            let divImg = $(`<div class="card-destino-img"></div>`);
            let cardDestinoTexto = $(`<div class="card-destino-texto d-flex justify-content-between flex-column "><div></div></div>`);
            divCard.append(divImg, cardDestinoTexto);

            let h3 = $(`<h3 class="mb-3 text-truncate">${element.cidade}</h3>`);
            let dias = $(`<div class="d-flex flex-row justify-content-start gap-1"><i class="fas fa-plane-departure"></i><p class="card-destino-texto-geral text-truncate">${element.data_inicial.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')} - ${element.data_final.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1')}</p></div>`);
            let preco = $(`<div class="d-flex flex-column justify-content-start"><p class="card-destino-texto-geral">Pacotes <br>a partir de</p> <h1><span class="card-destino-texto-geral">R$ </span>${element.preco}</h1></div>`);
            cardDestinoTexto.append(h3);
            cardDestinoTexto.append(dias);
            cardDestinoTexto.append(preco);

            // Adiciona o <li> ao elemento com id 'pacote-viagens'
            $('#pacote-viagens').append(listItem);
            contador ++;
        });
     },
    error: ()=> { console.log('Erro') }
})

$.ajax ( {
    type: "GET",
    url: 'js/pctViagem.json',
    dataType: "json",
    success: dados => {
        let passagens = dados.passagens;
        let contadorPassagens = 1;
        passagens.forEach(element => {
            
            let listItem = $(`<li class="nav-item"></li>`);
            let divCard = $(`<div class="card-passagem-${contadorPassagens}"></div>`);
            listItem.append(divCard);

            let divImg = $(`<div class="card-passagem-img"></div>`);
            let cardPassagemTexto = $(`<div class="card-passagem-texto d-flex justify-content-between flex-column "><div></div></div>`);
            divCard.append(divImg, cardPassagemTexto);

            let h3 = $(`<h3 class="mb-3 text-truncate">${element.cidade}</h3>`);
            let mes = $(`<div class="d-flex flex-row justify-content-start gap-1"><i class="fas fa-plane-departure"></i><p class="card-passagem-texto-geral text-truncate">${element.mes}</p></div>`);
            let preco = $(`<div class="d-flex flex-column justify-content-start"><p class="card-passagem-texto-geral">Passagem <br>a partir de</p> <h1><span class="card-passagem-texto-geral">R$ </span>${element.preco}</h1></div>`);
            cardPassagemTexto.append(h3);
            cardPassagemTexto.append(mes);
            cardPassagemTexto.append(preco);

            // Adiciona o <li> ao elemento com id 'passagens-aereas'
            $('#passagens-aereas').append(listItem);
            contadorPassagens ++;
        });
    },
    error: ()=> { console.log('Erro') }
})

$(document).ready(()=> {

    $('#dateGo, #dateReturn').on('focus', (e) => {
        $(e.currentTarget).attr('type', 'date');
    })

    $('#dateGo, #dateReturn').on('blur', (e) => {
        if ($(e.currentTarget).val() != '') {
            $(e.currentTarget).val($(e.currentTarget).val())
        } else {
            $(e.currentTarget).attr('type', 'text');
        }
    })


    // botão buscar destino, topo da página
    let dadosBuscaPassagem = {};

    $("#buscarDestino").on('click', () => {

        let origem = $("#origem").val();
        let destino = $("#destino").val();
        let dateGo = $("#dateGo").val();
        let dateReturn = $("#dateReturn").val();
        let rooms = $("#rooms").val();
        let travelers = $("#travelers").val();

        dadosBuscaPassagem = {
            'origem': origem,
            'destino': destino,
            'dateGo': dateGo,
            'dateReturn': dateReturn,
            'rooms': rooms,
            'travelers': travelers,
        }
    })

    // Box pacotes de viagens botão scroll para mostrar mais cards de viagens
    const sliderPacotes = $('#pacote-viagens');
    const cardPacotesWidth = $('#pacote-viagens li').outerWidth(true);
    
    $('.arrow-right-pacotes').on('click', () => {
        sliderPacotes.animate({
            scrollLeft: '+=' + cardPacotesWidth
        },400);
    })
    $('.arrow-left-pacotes').on('click', () => {
        sliderPacotes.animate({
            scrollLeft: '-=' + cardPacotesWidth
        },400);
    })

    // Box passagens aéreas botão scroll para mostrar mais cards de viagens
    const sliderPassagens = $('#passagens-aereas');
    const cardPassagensWidth = $('#passagens-aereas li').outerWidth(true);
    
    $('.arrow-right-passagens').on('click', () => {
        sliderPassagens.animate({
            scrollLeft: '+=' + cardPassagensWidth
        },400);
    })
    $('.arrow-left-passagens').on('click', () => {
        sliderPassagens.animate({
            scrollLeft: '-=' + cardPassagensWidth
        },400);
    })

    // Newsletter
    $("#assinar").on('click', () => {
        let nomeNewsletter = $("#nomeNewsletter").val();
        let emailNewsletter = $("#emailNewsletter").val();

        $.ajax({
            url: '/add-newsletter', // Rota no backend que vai lidar com a requisição
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: nomeNewsletter, email: emailNewsletter }),
            success: function(response) {
              alert('Cadastrado com sucesso!');
            },
            error: function(error) {
                alert('Ocorreu um erro inesperado!');
            }
          });

        $("#nomeNewsletter").val('');
        $("#emailNewsletter").val('');

    })
})