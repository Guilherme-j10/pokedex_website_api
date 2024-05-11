import { ChevronUp, ClipboardList, Home, Loader2, Search } from "lucide-react"
import { PokemonCard } from "./components/PokemonCard";
import { useEffect, useState } from "react";
import { fetchWrapper, TypeProps } from "./util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { List, PekemonSource } from "./Dtos";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [PokemonSourceList, setPokemonSourceList] = useState([] as PekemonSource[]);
  const [NextLinkToList, setNextLinkToList] = useState("");

  useEffect(() => {
    document.body.classList.add("custom-scroll");
  }, []);

  const getNextPage = useMutation({
    mutationFn: () => fetchWrapper<List>(NextLinkToList),
    onSuccess: (data) => {
      setPokemonSourceList(list => ([...list, ...data.results]));
      setNextLinkToList(data.next);
    }
  });

  const getFirstPage = useQuery({
    queryKey: ["first_query"],
    queryFn: () => fetchWrapper<List>("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"),
  });

  useEffect(() => {
    if (!getFirstPage.isLoading) {
      setPokemonSourceList(list => ([...list, ...getFirstPage?.data?.results as []]));
      console.log(getFirstPage.data?.next);
      setNextLinkToList(getFirstPage?.data?.next as string);
      document.querySelectorAll('[class="infinite-scroll-component__outerdiv"]')[0]?.classList.add("w-full")
    }
  }, [getFirstPage.isLoading])

  return (
    <div className="w-[100vw] min-h-[100vh] bg-black p-[80px] px-[150px] flex flex-col justify-start items-center relative">

      {PokemonSourceList.length > 12 ? (
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="w-[36px] h-[36px] rounded-md border border-[#ffffff2d] bg-[#010912] fixed bottom-[80px] right-[80px] flex justify-center items-center"
        >
          <ChevronUp className="text-white" />
        </button>
      ) : false}

      <div className="max-w-[1124px] flex flex-col justify-start items-center">
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
                  {TypeProps.map((type, index) => (
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

        {getFirstPage.isLoading ? (
          <div className="w-full h-[calc(100vh_-_80px)] flex justify-center items-center flex-col absolute">
            <Loader2 className="text-white animate-spin" width={50} height={50} />
            <h1 className="text-white font-semibold mt-[20px]">Carregando Pokémons...</h1>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={PokemonSourceList.length}
            next={getNextPage.mutate}
            hasMore={true}
            loader={
              <p>Carregando mais</p>
            }
          >
            <div className="w-full h-full mt-[120px] grid grid-cols-3 gap-[120px_30px]">
              {PokemonSourceList.map((source, index) => (
                <PokemonCard
                  key={index}
                  source={source}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div >
  )
}

export default App