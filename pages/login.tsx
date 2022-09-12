import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { withIronSessionSsr } from "iron-session/next";
import Layout from "../components/Layout";
import { sessionOptions } from "../lib/session";

type Inputs = {
  username: string,
  password: string,
};
function Login() {
  const { register,setError, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = data => {
    const requestOptions : RequestInit= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
    };


    fetch("/api/users/login", requestOptions)
        .then(res => {
            if(res.status == 200){
              window.location.replace("/edit");
            }else{
                res.json().then((data) =>{
                    setError('username', { type: 'custom', message: data.error });
                })
            }
        });
        

  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Layout>
      <h2 style={{marginTop: "200px"}}>welcome back owo</h2>
    <form style={{background: "inherit", maxWidth: "460px"}}onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="username" {...register("username")} />
      <input placeholder="password" type={"password"}{...register("password", { required: true })} />

      {errors.username && <div className="registerError">{errors.username?.message}</div>}
      

      <input style={{background: "white"}} className="submit" type="submit" value="login" />
    </form>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) : Promise<{props: {username:string}}> {


    
    if (req.session.user) {
      res.setHeader('location', '/edit')
      res.statusCode = 302
      res.end()
      return {props: {username: ""}}
    }
    return {
      props: {username: "",}
    };
  },
  sessionOptions,
);


export default Login