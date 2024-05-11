export type PekemonSource = {
  name: string,
  url: string
}

export type List = {
  next: string,
  results: PekemonSource[]
}

export type PokemonData = {
  types: Array<{
    type: {
      name: string
    }
  }>,
  sprites: {
    other: {
      home: {
        front_default: string
      }
    }
  }
}