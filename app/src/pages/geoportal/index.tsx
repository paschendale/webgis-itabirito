import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { GeoportalContainer, GeoportalViewport, Navbar, NavbarBrand, ServicesContainer, ServicesTitleContainer, NavbarLogo } from "./styles"
import ServiceCard from "../../components/serviceCard"
import brasao from "./../../assets/brasao.png"

export default function Geoportal() {
  const[webgisList,setWebgisList] = useState<Array<any>>([])
  const[isLoadingWebgisList,setIsLoadingWebgisList] = useState(true)

  async function getCatalog() {

    const response = await api.get('/catalog')

    return response.data
  }

  useEffect(() => {

    getCatalog()
    .then((data) => {
      
      setWebgisList(data.projects)
      setIsLoadingWebgisList(false)
    })
  },[])

  return (
    <>
      <Navbar>
        <NavbarBrand href="/geoportal">
          <NavbarLogo src={brasao} alt="Logo da prefeitura" />
          &nbsp; PREFEITURA DE &nbsp; <b> ITABIRITO</b> &nbsp; | &nbsp;GEOPORTAL
        </NavbarBrand>
      </Navbar>
      <GeoportalContainer>
        <GeoportalViewport>
          <ServicesTitleContainer>
            <h2>Acesse nossos serviços</h2>
          </ServicesTitleContainer>
          <ServicesContainer>
            {
              (
                isLoadingWebgisList && webgisList
              ) ? ( 
                <>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
                  <ServiceCard/>
                </>
              ) : (
                <>
                  {webgisList?.map((e) => {
                    return (
                      <ServiceCard key={e.id} title={e.title} backgroundColor="#590404" color="white" url={`/map/${e.id}`}/>
                    )
                  })}
                </>
              )
            }
            <ServiceCard subtitle="SIGEFM" backgroundColor="green" color="white" url="https://sigefm.itabirito.genteufv.com.br/"></ServiceCard>
            <ServiceCard subtitle="Ajuda" backgroundColor="gray" color="white"></ServiceCard>
          </ServicesContainer>
        </GeoportalViewport>
      </GeoportalContainer>
    </>
  )
}