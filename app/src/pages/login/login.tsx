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

export function Login() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const[isLoading,setIsLoading] = useState(false)

  const history = useHistory()

  async function onSubmit(data: any) {

    try {
      
      await api.post('/login',{
        email: data.email,
        password: data.senha
      }).then(login => {

        localStorage.setItem(`webgisLogin`,JSON.stringify(login.data))
        
        history.push('/geoportal')
      })

    } catch (error) {
      
      console.log(error)
    }
  };

  return (
    <LoginPage>
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
                <Box sx={{width: 195, height: 30, borderRadius: '5px'}}>

                  <ContentLoader 
                    speed={1}
                    height={30}
                    width={195}
                    backgroundColor="#cccccc"
                    foregroundColor="#e0e0e0"
                  >
                    <rect x="0" y="0" width="195" height="30"/> 
                  </ContentLoader>
                </Box>
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