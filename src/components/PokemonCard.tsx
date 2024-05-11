import { Ruler, Weight, Zap } from "lucide-react";
import { fetchWrapper, TypeProps } from "../util"
import React from 'react';
import { PekemonSource, PokemonData } from "../Dtos";
import { useQuery } from "@tanstack/react-query";

type IProps = {
  source: PekemonSource
}

export const PokemonCard: React.FC<IProps> = (props) => {
  const getPokemonInformation = useQuery({
    queryKey: ["pokemon_info", props.source.name],
    queryFn: () => fetchWrapper<PokemonData>(props.source.url)
  });

  const bindTypeByType = (type: string) => {
    return TypeProps.filter(data => data.name === type)[0]
  }

  return (
    <div className="w-full h-[535px] relative border rounded-[40px] border-[#303030] bg-[#010912] flex flex-col justify-start items-center">
      {getPokemonInformation.isLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img src='/pokedex.png' className='w-[25%] animate-spin' style={{
            filter: "invert(100%)"
          }} />
          <h1 className="text-white font-semibold mt-[30px] text-[1.2em]">Carregando Pokémon...</h1>
        </div>
      ) : (
        <>
          <div className='w-full h-full rounded-[40px] absolute top-0 left-0 flex justify-center items-center overflow-hidden z-30'>
            <img src='/pokedex.png' className='spin_animation opacity-[0.05] absolute left-[-150px] z-10' style={{
              filter: "invert(100%)"
            }} />
            <div className='w-full h-full z-20' style={{
              background: `radial-gradient(circle at bottom, ${bindTypeByType(getPokemonInformation.data?.types[0].type.name as string).foreground} 0%, rgba(0,212,255,0) 70%, rgba(0,212,255,0) 100%)`
            }} />
          </div>
          <div className='w-full h-full flex justify-center items-center flex-col z-40'>
            <img
              src={getPokemonInformation.data?.sprites.other.home.front_default}
              className='absolute top-[-120px] w-[90%] bounce'
            />
            <div className='w-full mt-[200px]'>
              <div className='w-full flex flex-col justify-start items-center py-[20px]'>
                <h1 className='text-white font-semibold flex justify-center items-center text-[2em]'>
                  <span className='bg-white mt-[5px] mr-[15px] w-[10px] h-[10px] rounded-[50px]' />
                  {props.source.name}
                  <span className='bg-white mt-[5px] ml-[15px] w-[10px] h-[10px] rounded-[50px]' />
                </h1>
                <div className='w-full flex justify-center items-center mt-[15px]'>
                  {getPokemonInformation.data?.types.map((type, index) => (
                    <span
                      key={index}
                      className='w-[120px] mr-[20px] rounded-[8px] p-[5px] uppercase font-semibold text-white flex justify-center'
                      style={{
                        backgroundColor: bindTypeByType(type.type.name).background
                      }}
                    >
                      <img src={`/${bindTypeByType(type.type.name).iconPathImage}`} className="w-[20px] mr-[5px]" />
                      {bindTypeByType(type.type.name).name}
                    </span>
                  ))}
                </div>
                <div className="w-full flex justify-center items-center mt-[25px]">
                  <span className="flex mr-[65px] flex-col justify-center items-center">
                    <h1 className="text-[1.5em] font-bold text-white">0.7 M</h1>
                    <p className="text-white flex justify-center items-center">
                      <Ruler width={15} className="text-white mr-[5px]" />
                      Altura
                    </p>
                  </span>
                  <span className="flex flex-col justify-center items-center">
                    <h1 className="text-[1.5em] font-bold text-white">6.5 KG</h1>
                    <p className="text-white flex justify-center items-center">
                      <Weight width={15} className="text-white mr-[5px]" />
                      Peso
                    </p>
                  </span>
                </div>
                <button className="text-white w-[200px] mt-[40px] mb-[25px] h-[45px] flex justify-center items-center rounded-[8px] bg-[#000000ac]">
                  <Zap width={18} className="text-white mr-[10px]" />
                  Mais detalhes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}