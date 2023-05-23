function askForName() {
  let name;
  let isValid = false;

  do {
    name = prompt("¿Cual es tu nombre?");

    if (typeof name === "string" && name.trim() !== "" && name.length > 0) {
      isValid = true;
    }
  } while (!isValid);

  return name;
}

function askForMoney(name) {
  let money;
  let isValid = false;

  do {
    money = parseFloat(prompt(`¿${name}, cuanto dinero tienes?`));

    if (typeof money === "number" && money > 0) {
      isValid = true;
    }
  } while (!isValid);

  return money;
}

function existsMoreClients() {
  let oneMore;
  let result;

  do {
    oneMore = parseInt(prompt("¿Hay otro cliente? \n1) Si \n2) No"));

    switch (oneMore) {
      case 1:
        result = true;
        break;
      case 2:
        result = false;
        break;
      default:
        alert("Seleccione opcion valida.");
    }
  } while (oneMore !== 1 && oneMore !== 2);

  return result;
}

function printMessage(element, message) {
  element.innerHTML += `<p>${message}</p>`;
}

function searchIceCream(money) {
  let moreExpensive = iceCreams
    .filter((i) => i.price <= money) // obtiene los helados menores al dinero total
    .sort((a, b) => a.price - b.price) // ordena los helados por precio
    .slice(-1); // obtiene el helado mas caro dentro del array

  //console.log (moreExpensive);

  if (moreExpensive.length === 0) {
    return moreExpensive;
  }

  return iceCreams.filter((i) => i.price === moreExpensive[0].price);
}

function selectIceCream(usuario,iceCreams) {
  let message = `${usuario} Selecciona una opcion:`;
  let selection;
  let isValid = false;

  iceCreams.forEach((item, index) => {
    message += `\n${index + 1}) ${item.name} - $${item.price} MXN`;
  });

  do {
    selection = parseInt(prompt(message));

    if (iceCreams[selection - 1] !== undefined) {
      isValid = true;
    }
  } while (!isValid);

  return iceCreams[selection - 1];
}

const iceCreams = [
  {
    name: "Helado 1L de fresa",
    price: 45,
  },
  {
    name: "Helado Napolitano",
    price: 50,
  },
  {
    name: "Paleta de limon",
    price: 15,
  },
  {
    name: "Paleta de fresa",
    price: 15,
  },
  {
    name: "Paleta de leche",
    price: 25,
  },
  {
    name: "Helado 1L de Limon",
    price: 45,
  },
];

function main() {
  let defaultClients = ["Abigail", "Miguel", "Yeray"];
  let client = 0;
  let result = document.getElementById("messages");
  let existsClient = true;
  let name;
  let money;
  let items;

  do {
    name = defaultClients[client];

    if (name === undefined) {
      name = askForName();
    }

    money = askForMoney(name);

    items = searchIceCream(money);

    //se agrego

    if (items.length === 0) {
      printMessage(
        result,
        `Hola ${name}, con $${money} MXN, No tenemos una opcion de helado con tu presupuesto`
      );
    } else {
      printMessage(
        result,
        `Hola ${name}, con $${money} MXN, te puedo ofrecer lo siguiente:`
      );

      items.forEach((item, index) => {
        printMessage(result, `${index + 1}) ${item.name} a $${item.price} MXN`);
      });

      if (items.length > 1) {
        let iceCream = selectIceCream(name,items);
        printMessage(
          result,
          `Seleccionaste: ${iceCream.name}, con precio de $${
            iceCream.price
          }, su cambio es $${money - iceCream.price} MXN`
        );
      } else {
        printMessage(
          result,
          `Su unica opcion: ${items[0].name}, con precio de $${
            items[0].price
          }, su cambio es $${money - items[0].price} MXN`
        );
      }
    }

    client++;
    if (defaultClients[client] === undefined) {
      existsClient = existsMoreClients();
    }
  } while (existsClient);

  console.log("Bye.");
}

main();
