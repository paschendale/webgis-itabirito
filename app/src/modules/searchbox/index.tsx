import { SearchBoxContainer, SearchButton, SearchInput } from "./styles";
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { api } from "../../services/api";

interface SearchBoxProps { 
  setFeatures: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  setDisplayLeftSidePanel: React.Dispatch<React.SetStateAction<any>>;
  layers: any;
}

function SearchBox({setFeatures,setLoading,setDisplayLeftSidePanel,layers}: SearchBoxProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  async function onSubmit(data:any) {
    
    setLoading(true)
    setDisplayLeftSidePanel(true)

    const response = await api.post('/search',
    {
      keywords: data.searchInput,
      layers: layers?.filter((e: any) => e['@_queryable'] === '1').map((e: any) => e.Name)
    })

    setLoading(false)
    setFeatures(response.data.features)
  }

  return (
    <SearchBoxContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput placeholder="Digite aqui o termo de pesquisa" {...register('searchInput', {required: true})}></SearchInput>
        <SearchButton type={'submit'}>
          <FaSearch/>
        </SearchButton>
      </form>
    </SearchBoxContainer>
  );
}

export default SearchBox;