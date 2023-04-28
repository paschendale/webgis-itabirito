import { SearchBoxContainer, SearchButton, SearchInput } from "./styles";
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { api } from "../../services/api";
import { toastError } from "../../utils";
import { useState } from "react";
import { useLocation } from "react-router";

interface SearchBoxProps { 
  setFeatures: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  setDisplayLeftSidePanel: React.Dispatch<React.SetStateAction<any>>;
  layers: any;
}

function SearchBox({setFeatures,setLoading,setDisplayLeftSidePanel,layers}: SearchBoxProps) {
  
  const location = useLocation()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const[projectId,setProjectId] = useState(location.pathname.split('/map/')[1])

  async function onSubmit(data:any) {
    
    setLoading(true)
    setDisplayLeftSidePanel(true)

    try {
      
      const response = await api.post('/search',
      {
        keywords: data.searchInput,
        layers: layers?.filter((e: any) => e['@_queryable'] === '1').map((e: any) => e.Name),
        projectId: projectId
      })
  
      setLoading(false)
      setFeatures(response.data.features)
    } catch (error: any) {
      
      if (error.response.status === 401) {
          
        toastError('O usuário não possui credenciais válidas para realizar esta operação.')
      } else {

        toastError('Ocorreu um erro ao tentar obter os resultados da pesquisa.')
      }
      
      setLoading(false)
      setFeatures([])
      throw error
    }

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