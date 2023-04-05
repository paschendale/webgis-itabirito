import { SearchBoxContainer, SearchButton, SearchInput } from "./styles";
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { api } from "../../services/api";
import { SetStateAction } from "react";

interface SearchBoxProps { 
  setFeatures: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<any>>;
}

function SearchBox({setFeatures,setLoading}: SearchBoxProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  async function onSubmit(data:any) {
    
    setLoading(true)
    console.log(data) 

    const response = await api.post('/search',
    {
      keywords: data.searchInput
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