import { $ } from "../ultil";
import swal from "sweetalert";

export default class assignment {
  async render() {
    let result: string = "";
    const pokemons: number = 20;
    interface PokemonInterface {
      id: number;
      image: string;
    }

    let arrPokemon: PokemonInterface[] = [];

    for (let i = 10; i < pokemons; i++) {
      let data: any = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let pokemon: any = await data.json();
      arrPokemon = [
        ...arrPokemon,
        { id: pokemon.id, image: pokemon.sprites.front_default },
      ];
    }

    const cardPokemon: any = arrPokemon.concat(arrPokemon);

    cardPokemon.sort(() => {
      return Math.random() - 0.8;
    });

    cardPokemon.map((item: any, index: number) => {
      result += `<img src="${item.image}" id_pokemon="${item.id}" index="${index}" class="poke" height="155px">`;
    });

    $(".point").style.display = "";
    $(".point").innerHTML = "Điểm: 0";

    return `
            ${result}
        `;
  }

  async afterRender() {
    let focusPokemon: HTMLElement[] = [];
    let count: number = 0;
    let totalPoint: number = 0;
    let countDuplicatePokemon: number = 0;
    const poke: HTMLElement[] = $(".poke");

    poke.forEach((item: HTMLElement) => {
      item.addEventListener("click", () => {
        item.classList.add("pokeFocus");
        focusPokemon = [...focusPokemon, item];
        count++;
        if (count >= 2) {
          count = 0;

          if (
            focusPokemon[0].getAttribute("id_pokemon") ==
              focusPokemon[1].getAttribute("id_pokemon") &&
            focusPokemon[0].getAttribute("index") !=
              focusPokemon[1].getAttribute("index")
          ) {
            focusPokemon.forEach((item: HTMLElement) => {
              item.style.display = "none";
            });
            totalPoint += 100;
            countDuplicatePokemon += 1;
          } else {
            focusPokemon.forEach((item) => {
              item.classList.remove("pokeFocus");
            });
            if (totalPoint > 0) {
              totalPoint -= 50;
            }
          }

          focusPokemon = [];

          $(".point").innerHTML = "Điểm: " + totalPoint;
        }
        if (countDuplicatePokemon == 10) {
          swal(
            "Chúc mừng!",
            `Bạn đã dành chiến thắng với số điểm là: ${totalPoint}`,
            "success"
          ).then((e) => {
            if (e) {
              location.reload();
            }
          });
        }
      });
    });
  }
}
