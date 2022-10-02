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
    <Layout>
      <style global jsx>{`body {
            color: white;
            background-color: #FADCDC;
            font-family: Inter;
          }`}</style>
      <h2 className="mt-48 mb-5 text-2xl font-bold">welcome back owo</h2>
    <form style={{ maxWidth: "460px", color: "black", margin: "auto"}}onSubmit={handleSubmit(onSubmit)}>
      <input className="block w-full rounded py-2.5 px-3.5 mb-2.5 outline-0 text-sm"  placeholder="username" {...register("username")} />
      <input className="block w-full rounded py-2.5 px-3.5 mb-2.5 outline-0 text-sm" placeholder="password" type={"password"}{...register("password", { required: true })} />

      {errors.username && <div className="registerError">{errors.username?.message}</div>}
      

      <input className="w-40 bg-white py-2.5 px-3.5 text-sm	mt-5 rounded text-black" type="submit" value="login" />
    </form>
    </Layout>
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