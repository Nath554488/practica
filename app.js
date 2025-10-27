const UNIDADES = {
  temperatura: ["Celsius", "Fahrenheit", "Kelvin"],
  distancia: ["Metros", "Kilómetros", "Millas", "Pies", "Pulgadas"],
  tiempo: ["Años", "Días", "Horas", "Segundos"],
  moneda: ["MXN", "USD", "EUR"]
};

const TASAS = {
  MXN_POR_USD: 18.0,  // 1 USD = 18.0 MXN
  MXN_POR_EUR: 19.5   // 1 EUR = 19.5 MXN
};


const selCategoria = document.getElementById("categoria");
const selDesde = document.getElementById("desde");
const selHacia = document.getElementById("hacia");
const inputCantidad = document.getElementById("cantidad");
const btnConvertir = document.getElementById("btnConvertir");
const btnIntercambiar = document.getElementById("btnIntercambiar");
const inputResultado = document.getElementById("resultado");


function poblarUnidades(categoria) {
  const opciones = UNIDADES[categoria];
  selDesde.innerHTML = "";
  selHacia.innerHTML = "";

  opciones.forEach((u) => {
    const opt1 = document.createElement("option");
    opt1.value = u;
    opt1.textContent = u;
    selDesde.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = u;
    opt2.textContent = u;
    selHacia.appendChild(opt2);
  });

  if (categoria === "temperatura") { selDesde.value = "Celsius"; selHacia.value = "Fahrenheit"; }
  if (categoria === "distancia") { selDesde.value = "Metros"; selHacia.value = "Kilómetros"; }
  if (categoria === "tiempo") { selDesde.value = "Horas"; selHacia.value = "Segundos"; }
  if (categoria === "moneda") { selDesde.value = "MXN"; selHacia.value = "USD"; }
}

function aBase(categoria, valor, unidad) {
  switch (categoria) {
    case "temperatura":
      if (unidad === "Celsius") return valor + 273.15;
      if (unidad === "Fahrenheit") return (valor - 32) * (5 / 9) + 273.15;
      if (unidad === "Kelvin") return valor;
      break;

    case "distancia":
      switch (unidad) {
        case "Metros": return valor;
        case "Kilómetros": return valor * 1000;
        case "Millas": return valor * 1609.344;
        case "Pies": return valor * 0.3048;
        case "Pulgadas": return valor * 0.0254;
      }
      break;

    case "tiempo":
      switch (unidad) {
        case "Segundos": return valor;
        case "Horas": return valor * 3600;
        case "Días": return valor * 86400;
        case "Años": return valor * 365 * 86400;
      }
      break;

    case "moneda":
      switch (unidad) {
        case "MXN": return valor;
        case "USD": return valor * TASAS.MXN_POR_USD;
        case "EUR": return valor * TASAS.MXN_POR_EUR;
      }
      break;
  }
  return NaN;
}

function desdeBase(categoria, valorBase, unidadDestino) {
  switch (categoria) {
    case "temperatura":
      if (unidadDestino === "Celsius") return valorBase - 273.15;
      if (unidadDestino === "Fahrenheit") return (valorBase - 273.15) * (9 / 5) + 32;
      if (unidadDestino === "Kelvin") return valorBase;
      break;

    case "distancia":
      switch (unidadDestino) {
        case "Metros": return valorBase;
        case "Kilómetros": return valorBase / 1000;
        case "Millas": return valorBase / 1609.344;
        case "Pies": return valorBase / 0.3048;
        case "Pulgadas": return valorBase / 0.0254;
      }
      break;

    case "tiempo":
      switch (unidadDestino) {
        case "Segundos": return valorBase;
        case "Horas": return valorBase / 3600;
        case "Días": return valorBase / 86400;
        case "Años": return valorBase / (365 * 86400);
      }
      break;

    case "moneda":
      switch (unidadDestino) {
        case "MXN": return valorBase;
        case "USD": return valorBase / TASAS.MXN_POR_USD;
        case "EUR": return valorBase / TASAS.MXN_POR_EUR;
      }
      break;
  }
  return NaN;
}

function formatear(categoria, unidad, valor) {
  if (categoria === "moneda") {
    const simbolos = { MXN: "$", USD: "$", EUR: "€" };
    return `${simbolos[unidad] || ""}${valor.toFixed(2)} ${unidad}`;
  }
  const decimales = Math.abs(valor) < 1 ? 6 : 4;
  return `${valor.toFixed(decimales)} ${unidad}`;
}

function convertir() {
  const categoria = selCategoria.value;
  const desde = selDesde.value;
  const hacia = selHacia.value;
  const cantidad = parseFloat(inputCantidad.value);

  if (isNaN(cantidad)) {
    inputResultado.value = "Ingresa una cantidad válida.";
    return;
  }

  const base = aBase(categoria, cantidad, desde);
  const resultado = desdeBase(categoria, base, hacia);
  inputResultado.value = formatear(categoria, hacia, resultado);
}

function intercambiar() {
  const temp = selDesde.value;
  selDesde.value = selHacia.value;
  selHacia.value = temp;
  convertir();
}

selCategoria.addEventListener("change", () => {
  poblarUnidades(selCategoria.value);
  convertir();
});
btnConvertir.addEventListener("click", convertir);
btnIntercambiar.addEventListener("click", intercambiar);
inputCantidad.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convertir();
});

poblarUnidades(selCategoria.value);
inputCantidad.value = "";
inputResultado.value = "";