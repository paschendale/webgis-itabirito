import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { GeoportalContainer, GeoportalViewport, Navbar, NavbarBrand, ServicesContainer, ServicesTitleContainer, NavbarLogo, NavbarTitle, NavbarMenuItem, NavbarMenu } from "./styles"
import ServiceCard from "../../components/serviceCard"
import brasao from "./../../assets/brasao.png"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BiUserCircle } from "react-icons/bi"
import { Card, CardTitle, ServiceCardContainer } from "../../components/serviceCard/styles"
import { useHistory } from "react-router"

export default function Geoportal() {
  const[webgisList,setWebgisList] = useState<Array<any>>([])
  const[isLoadingWebgisList,setIsLoadingWebgisList] = useState(true)
  const[authenticatedUser,setAuthenticatedUser] = useState('')

  const history = useHistory()

  async function getCatalog() {

    const response = await api.get('/catalog')

    return response.data
  }

  async function verifyApikey(apiKey: string) {
    
    try {
        
      let auth = await api.post('/auth',{
        apikey: apiKey
      })

      return auth.data
    } catch (error) {
      
      console.log(error)
      throw error
    }
  }

  useEffect(() => {

    let login = localStorage.getItem(`webgisLogin`)
    let parsedLogin = JSON.parse(login || '{}')

    if (parsedLogin.name) {
  
      verifyApikey(parsedLogin.apikey).then((auth: any) => {

        if(auth.name) {

          setAuthenticatedUser( auth.name )
        } else {
          
          setAuthenticatedUser( '' )
        }
      })
    }
  },[])

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

  function handleLogout() {

    localStorage.removeItem(`webgisLogin`)
    setAuthenticatedUser('')
  }

  return (
    <>
      <Navbar>
        <NavbarBrand href="/geoportal">
          <NavbarLogo src={brasao} alt="Logo da prefeitura" />
          <NavbarTitle>
            &nbsp; PREFEITURA DE <b> ITABIRITO</b> | GEOPORTAL
          </NavbarTitle>
        </NavbarBrand>
        <NavbarMenu>
          {
            (!authenticatedUser || authenticatedUser === '') ? (
              <NavbarMenuItem onClick={() => history.push('/login')}>
                Login
              </NavbarMenuItem>
            ) : (
              <>
                <NavbarMenuItem>
                  <BiUserCircle/> &nbsp; {authenticatedUser}
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => handleLogout()}>
                  Sair
                </NavbarMenuItem>
              </>
            )
          }
        </NavbarMenu>
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

                    if ((e.id) !== undefined) {

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