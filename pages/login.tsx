import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import Layout from "../components/Layout";


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
              window.location.replace("/account/links");
            }else{
                res.json().then((data) =>{
                    setError('username', { type: 'custom', message: data.error });
                })
            }
        });
        

  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <style jsx global>{`
    @media (prefers-color-scheme: dark){
      body {
        background: #161111;
      }
    }
  `}</style>
    
    <div>
      
      <h2 className="mt-48 text-5xl font-bold mb-16 mx-auto max-w-md text-primary-pink">Login</h2>
    <form className="max-w-md mx-auto text-xl text-primary-pink" onSubmit={handleSubmit(onSubmit)}>
      <input className="block w-full bg-inherit rounded-lg py-2.5 px-3.5 mb-2.5 outline-2 border-2 border-primary-pink focus:outline-cyan-600"  placeholder="username" {...register("username")} />
      <input className="block w-full bg-inherit rounded-lg py-2.5 px-3.5 mb-2.5 outline-2 border-2 border-primary-pink focus:outline-cyan-600" placeholder="password" type={"password"}{...register("password", { required: true })} />

      {errors.username && <div className="registerError">{errors.username?.message}</div>}
      
      <div className="ml-auto w-fit pt-2">
      <input className="w-40 cursor-pointer text-white dark:bg-dark-primary-background ml-2 border-2 border-primary-pink bg-primary-pink py-2 px-4 rounded-lg hover:bg-focused-pink" type="submit" value="Login" />
      </div>
    <p className="text-white mt-2">Don&apos;t have an account? <u><a href="./register/">Sign up</a></u></p>
    </form>
    </div>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) : Promise<{props: {username:string}}> {


    
    if (req.session.user) {
      res.setHeader('location', '/account/links')
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