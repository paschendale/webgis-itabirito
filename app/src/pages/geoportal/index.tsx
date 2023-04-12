import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { GeoportalContainer, GeoportalViewport, Navbar, NavbarBrand, ServicesContainer, ServicesTitleContainer, NavbarLogo, NavbarTitle } from "./styles"
import ServiceCard from "../../components/serviceCard"
import brasao from "./../../assets/brasao.png"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardTitle, ServiceCardContainer } from "../../components/serviceCard/styles"

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
    .catch(e => {

      toast.error(
        'Ocorreu um erro ao carregar o catálogo de WebGIS',
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 10000
        }
      )
      setWebgisList([{title: 'Não foi possível carregar os WebGIS'}])
      setIsLoadingWebgisList(false)
    })
  },[])

  return (
    <>
      <Navbar>
        <NavbarBrand href="/geoportal">
          <NavbarLogo src={brasao} alt="Logo da prefeitura" />
          <NavbarTitle>
            &nbsp; PREFEITURA DE <b> ITABIRITO</b> | GEOPORTAL
          </NavbarTitle>
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

                    if (e.url) {

                      return (
                        <ServiceCard key={e.id} title={e.title} backgroundColor="#590404" color={e.color || "white"} url={`/map/${e.id}`}/>
                      )
                    } else {

                      return (
                        <ServiceCardContainer>
                          <Card>
                            <CardTitle>
                              Não foi possível carregar os WebGIS
                            </CardTitle>
                          </Card>
                        </ServiceCardContainer>
                      )
                    }
                  })}
                </>
              )
            }
            <ServiceCard subtitle="SIGEFM" backgroundColor="green" color="white" url="https://sigefm.itabirito.genteufv.com.br/"></ServiceCard>
            <ServiceCard subtitle="Ajuda" backgroundColor="gray" color="white"></ServiceCard>
          </ServicesContainer>
        </GeoportalViewport>
      </GeoportalContainer>
      <ToastContainer />
    </>
  )
}