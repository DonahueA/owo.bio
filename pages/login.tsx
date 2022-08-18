import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { withIronSessionSsr } from "iron-session/next";
import Layout from "../components/Layout";

type Inputs = {
  username: string,
  password: string,
};
function login() {
  const { register,setError, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = data => {
    const requestOptions : RequestInit= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
    };


    fetch("http://localhost:3000/api/users/login", requestOptions)
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
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Username</label>
      <input {...register("username")} />
      <label>Password</label>
      <input {...register("password", { required: true })} />

      {errors.username && <div className="registerError">{errors.username?.message}</div>}
      
      <input type="submit" value="Login" />
    </form>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) : Promise<{props: {username:string}}> {

    const user = req.session.user;
    
    if (user !== undefined) {
      res.setHeader('location', '/edit')
      res.statusCode = 302
      res.end()
      return {props: {username: ""}}
    }
    return {
      props: {username: "",}
    };
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);


export default login