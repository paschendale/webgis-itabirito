import { SearchBoxContainer, SearchButton, SearchInput } from "./styles";
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { api } from "../../services/api";
import { SetStateAction } from "react";

function SearchBox({setFeatures}: { setFeatures: React.Dispatch<React.SetStateAction<any>> }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  async function onSubmit(data:any) {
    
    console.log(data) 

    const response = await api.post('/search',
    {
      keywords: data.searchInput
    })

    console.log(response.data)
    setFeatures(response.data)
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