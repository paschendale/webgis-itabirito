import { SearchBoxContainer, SearchButton, SearchInput } from "./styles";
import { FaSearch } from 'react-icons/fa';

function SearchBox() {

  function search() {
    console.log(`i've been clicked`)
  }

  return (
    <SearchBoxContainer>
      <SearchInput placeholder="Digite aqui o termo de pesquisa"></SearchInput>
      <SearchButton onClick={search}>
        <FaSearch/>
      </SearchButton>
    </SearchBoxContainer>
  );
}

export default SearchBox;