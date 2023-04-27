import { LoginPage, LoginContainer, LeftSide, RightSide, Form } from "./styles";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api } from "../../services/api";
import { useHistory } from "react-router";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import { Box } from "@mui/system";

export function Login() {

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
      <LoginContainer>
        <LeftSide>left</LeftSide>
        <RightSide>
          <h4>Insira os dados para login:</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField variant="standard" type="text" placeholder="Email" {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
            <TextField variant="standard" type="password" placeholder="Senha" {...register("senha", {required: true})} />
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
        </RightSide>
      </LoginContainer>
    </LoginPage>
  )
}