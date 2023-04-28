import { LoginPage, LoginContainer, LeftSide, RightSide, Form, Input, Text, SmallText, BrandContainer, Logo, LogoContainer } from "./styles";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api } from "../../services/api";
import { useHistory } from "react-router";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import { Box, createTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import brasao from "./../../assets/brasao.png"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const[isLoading,setIsLoading] = useState(false)

  const history = useHistory()

  async function onSubmit(data: any) {

    setIsLoading(true)

    try {
      
      await api.post('/login',{
        email: data.email,
        password: data.senha
      }).then(login => {

        localStorage.setItem(`webgisLogin`,JSON.stringify(login.data))
        
        setIsLoading(false)
        toast.success('Autenticação realizada com sucesso')
        history.push('/geoportal')
      })

    } catch (error: any) {
      
      setIsLoading(false)
        
      if (error.response.status === 401) {

        toast.error('Usuário ou senha inválidos')
      } else {

        toast.error('Não foi possível realizar a autenticação do usuário')
        console.log(error)
      }
    }
  };

  return (
    <LoginPage>
      <ToastContainer />
      <LogoContainer>
        <Logo src={brasao} alt="Logo da prefeitura" />
        <BrandContainer>
            &nbsp; PREFEITURA DE <b> ITABIRITO</b> | GEOPORTAL
        </BrandContainer>
      </LogoContainer>
      <LoginContainer>
        <LeftSide>
          <Text>
            O acesso ao Geoportal de Itabirito 
            é realizado através do CPF e 
            senha de usuário cadastrado
            pela prefeitura ou pela conta gov.br.
            Após identificado, o usuário tem 
            acesso a um maior número de 
            serviços como o <b>Sistema de 
            Gestão Fundiária Municipal</b>, 
            emissão de documentos e certidões,
            mapas interativos e conteúdos 
            exclusivos. 
          </Text>
        </LeftSide>
        <RightSide>
          <h4>Insira os dados para login:</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input id="email" type="text" placeholder="Email" {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
            <Input type="password" placeholder="Senha" {...register("senha", {required: true})} />
            {
              (!isLoading) ? (
                <Button variant="contained" type="submit">Acessar</Button>
              ) : (
                
                <Button disabled variant="contained" type="submit">Acessando</Button>
              )
            }
          </Form>
          <SmallText>
            Se você não possuir uma credencial de acesso, entre em contato com a <b>Prefeitura Municipal de Itabirito</b> e solicite o credenciamento.
          </SmallText>
        </RightSide>
      </LoginContainer>
    </LoginPage>
  )
}