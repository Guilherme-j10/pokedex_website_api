import { ClipboardList, Home, Search } from "lucide-react"
import { PokemonCard } from "./components/PokemonCard";
import { useLayoutEffect } from "react";
import { iconsArray } from "./util";

function App() {
  useLayoutEffect(() => {
    document.body.classList.add("no_scroll");
  }, [])

  return (
    <div className="w-[100vw] min-h-[100vh] bg-black p-[80px] px-[150px] flex flex-col justify-start items-center">
      
      {/* HEADER */}
      <div className="w-full grid grid-cols-2 gap-[30px]">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="flex justify-start items-center">
            <ClipboardList className="text-white" width={18} />
            <h1 className="text-white ml-[10px] font-semibold">Buque por tipo:</h1>
          </div>
          <div className="w-full border border-[#ffffff2d] bg-[#010912] rounded-md mt-[10px] p-[10px] flex justify-start items-center">
            <button className="mr-[10px]">
              <Home width={18} className="text-white" />
            </button>
            <div className="w-full flex justify-start items-center overflow-scroll no_scroll">
              <div className="flex justify-start items-center flex-nowrap">
                {iconsArray.map((type, index) => (
                  <button
                    key={index}
                    className="w-[30px] h-[30px] rounded-[50px] mr-[10px] last:mr-[0px] flex justify-center items-center"
                    style={{
                      backgroundColor: type.background
                    }}
                  >
                    <img src={`/${type.iconPathImage}`} className="w-[50%] ml-[-1px] mt-[-1px]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start">
          <div className="flex justify-start items-center">
            <Search className="text-white" width={18} />
            <h1 className="text-white ml-[10px] font-semibold">Encontre seu pokémon:</h1>
          </div>
          <div className="w-full h-[52px] border border-[#ffffff2d] bg-[#010912] rounded-md mt-[10px] overflow-hidden grid grid-cols-[1fr_100px]">
            <input
              type="text"
              placeholder="Eu escolho voce!"
              className="bg-transparent px-[20px] text-white"
            />
            <button className="w-full h-full flex justify-center items-center bg-gradient-to-r from-[#8510c4] to-[#4004c5]">
              <Search className="text-white" width={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BODY/LIST  */}
      <div className="w-full h-full mt-[120px] grid grid-cols-3 gap-[30px]">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
    </div>
  )
}

export default App