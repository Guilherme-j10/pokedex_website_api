import axios from "axios";

export const TypeProps = [
  { name: "bug", iconPathImage: "bug.svg", background: "#92BC2C", foreground: "#a5ec00b4" }, //ok
  { name: "dark", iconPathImage: "dark.svg", background: "#595761", foreground: "#535b6e" }, //ok
  { name: "dragon", iconPathImage: "dragon.svg", background: "#0C69C8", foreground: "#005fac" }, //ok
  { name: "electric", iconPathImage: "electric.svg", background: "#F2D94E", foreground: "#e5c406" }, //ok
  { name: "fairy", iconPathImage: "fairy.svg", background: "#EE90E6", foreground: "#da27cb" }, //ok
  { name: "fighting", iconPathImage: "fighting.svg", background: "#D3425F", foreground: "#c00e31" }, //ok
  { name: "fire", iconPathImage: "fire.svg", background: "#FBA54C", foreground: "#de7b10" }, //ok
  { name: "flying", iconPathImage: "flying.svg", background: "#A1BBEC", foreground: "#A1BBEC" },
  { name: "ghost", iconPathImage: "ghost.svg", background: "#5F6DBC", foreground: "#324197" }, //ok
  { name: "grass", iconPathImage: "grass.svg", background: "#5FBD58", foreground: "#259a1d" }, //ok
  { name: "ground", iconPathImage: "ground.svg", background: "#DA7C4D", foreground: "#b74912" }, //ok
  { name: "ice", iconPathImage: "ice.svg", background: "#75D0C1", foreground: "#0fa190" }, //ok
  { name: "normal", iconPathImage: "normal.svg", background: "#A0A29F", foreground: "#909090" }, //ok
  { name: "poison", iconPathImage: "poison.svg", background: "#B763CF", foreground: "#b209e0" }, //ok
  { name: "psychic", iconPathImage: "psychic.svg", background: "#FA8581", foreground: "#b23e3a" }, //ok
  { name: "rock", iconPathImage: "rock.svg", background: "#C9BB8A", foreground: "#9e893f" }, //ok
  { name: "steel", iconPathImage: "steel.svg", background: "#5695A3", foreground: "#0092b3" }, //ok
  { name: "water", iconPathImage: "water.svg", background: "#539DDF", foreground: "#0d82e8" } //ok
];

export const fetchWrapper = async <T>(route: string): Promise<T> => {
  const response = await axios.get(route);

  if (response.data?.error || response.status !== 200)
    throw new Error(response.data.message?.payload || response.data.message);

  return response.data;
}

export const interpolation = (value: number, input: number[], output: number[]): number => {
  return output[0] + (((value - input[0]) / (input[1] - input[0])) * (output[1] - output[0]))
} 