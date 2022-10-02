import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../components/Layout";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

type Inputs = {
  username: string,
  email: string,
  password: string,
};

function App() {
  const { register,setError, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const requestOptions : RequestInit= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
    };


    fetch("/api/users/register", requestOptions)
        .then(res => {
            if(res.status == 200){
                //Fix (should not have to wait)
                setTimeout(()=>{window.location.replace("/account/links")}, 100);
            }else{
                res.json().then((data) =>{
                    setError(data.type, {type: 'custom', message: data.error});
                })
            }
        });
        

  };



  return (
    <Layout>
      <style global jsx>{`body {
            color: white;
            background-color: #FADCDC;
            font-family: Inter;
          }`}</style>
      <h2 className="mt-48 text-2xl font-bold mb-5 text-white">register owo</h2>
    <form style={{backgroundColor: "inherit", color:"black", maxWidth: "460px", margin: "auto"}} onSubmit={handleSubmit(onSubmit)}>
      <input className="block w-full rounded py-2.5 px-3.5 mb-2.5 outline-0 text-sm"  placeholder="email" {...register("email", {pattern: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/ , required: true })} />
      {errors.email?.type =="pattern" && <div className="registerError">Invalid email</div>}
      {errors.email?.type === "custom" && <div className="registerError">{errors.email?.message}</div>}
      <input className="block w-full rounded py-2.5 px-3.5 mb-2.5 outline-0 text-sm	" placeholder="password" type={"password"} {...register("password", { required: true , minLength: 8})} />

      {errors.password && <div className="registerError">Invalid password</div>}
      
      <div className="userSignup">
        <label id="userSignupLabel">owo.bio/</label>
      <input className="usernameInput" {...register("username", {pattern: /^[a-zA-Z0-9\-\_]+$/, required: true})} />
      </div>
      {errors.username?.type == "pattern" && <div className="registerError">Invalid username</div>}
      {errors.username?.type === "custom" && <div className="registerError">{errors.username?.message}</div>}
            
      <input className="w-40 bg-white py-2.5 px-3.5 text-sm	mt-5 rounded text-black" type="submit"  value="Sign Up"/>
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

export default App