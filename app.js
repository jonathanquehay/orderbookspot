setInterval("iniciar()", 1000);

window.onload = function () {
    document.getElementById("moneda").focus();
}
const m = document.getElementById("moneda").value


const textbox = document.getElementById("moneda");
textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("calcular").click();
    }
});


document.getElementById("calcular").addEventListener("click", iniciar)




function iniciar() {
    const endpoint = 'https://api.binance.com/api/v3/depth?limit=500&symbol=' + document.getElementById("moneda").value + 'USDT'

    const trades = 'https://api.binance.com/api/v3/trades?symbol=' + document.getElementById("moneda").value + 'USDT'

    const precioActual = 'https://api.binance.com/api/v3/ticker/price?symbol=' + document.getElementById("moneda").value + 'USDT'

    fetch(endpoint)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarData(datos))
        .catch(e => console.log(e))


    fetch(precioActual)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarPrecio(datos))
        .catch(e => console.log(e))
    //********************************************************************************* */
    fetch(trades)
        .then(respuesta => respuesta.json())
        .then(datos => mostrarTrades(datos))
        .catch(e => console.log(e))



    const mostrarTrades = (trade) => {


        function Promediot(myArray) {
            summcompradores = 0;
            summvendedores = 0;
            let cc = 0
            let vv = 0
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i].isBuyerMaker == true) {
                    cc += 1

                    summcompradores += Number(myArray[i].qty);

                }
                else {
                    vv += 1
                    summvendedores += Number(myArray[i].qty);
                }

            }

            document.getElementById("vendedores").innerHTML = '<h6>Cant&Vend</h6><hr>' + (summcompradores / myArray.length).toFixed(2) + ' ' + document.getElementById("moneda").value + '<h6>' + cc + '</h6>';
            document.getElementById("compradores").innerHTML = '<h6>Cant&Comp</h6><hr>' + (summvendedores / myArray.length).toFixed(2) + ' ' + document.getElementById("moneda").value + '<h6>' + vv + '</h6>';;
            //return (summ / myArray.length).toFixed(4);
        }

        const compradores = Promediot(trade);
        const vendedores = Promediot(trade);


    }

    const mostrarPrecio = (precioActual) => {

        let n = precioActual.price
        document.getElementById("precio_actual").innerHTML = '<h6 id="precio">Precio actual => ' + '<span>' + '$ ' + new Intl.NumberFormat().format(n) + '<span>' + '</h6>';



    }



    const mostrarData = (data) => {
        let body = ''

        function Promedio(myArray) {
            summ = 0;
            for (let i = 0; i < myArray.length; i++) {
                summ += Number(myArray[i][0]);
            }
            return (summ / myArray.length).toFixed(4);
        }

        const a = Promedio(data.bids.splice(0, 99));
        const b = Promedio(data.asks.splice(0, 99));
        const c = Promedio(data.bids.splice(1, 99));
        const d = Promedio(data.asks.splice(1, 99));
        const e = Promedio(data.bids.splice(2, 99));
        const f = Promedio(data.asks.splice(2, 99));
        const g = Promedio(data.bids.splice(3, 99));
        const h = Promedio(data.asks.splice(3, 99));
        const i = Promedio(data.bids.splice(4, 99));
        const j = Promedio(data.asks.splice(4, 99));

        const promedioCompra = (Number(a) + Number(c) + Number(e) + Number(g) + Number(i)) / 5

        document.getElementById('promedio').innerHTML = "Compra promedio: " + promedioCompra.toFixed(4)
        body +=
            `<tr><td>${a}</td><td>${b}</td></tr>
                <tr><td>${c}</td><td>${d}</td></tr>
                <tr><td>${e}</td><td>${f}</td></tr>
                <tr><td>${g}</td><td>${h}</td></tr>
                <tr><td>${i}</td><td>${j}</td></tr>`
        //console.log(j)
        document.getElementById('data').innerHTML = body

    }
}

