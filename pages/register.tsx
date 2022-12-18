import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

type Inputs = {
  username: string,
  email: string,
  password: string,
};

function App({username} : {username: string}) {
  const { register,setError, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({defaultValues: {username: username}} );
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
    <><style jsx global>{`
    @media (prefers-color-scheme: dark){
      body {
        background: #161111;
      }
    }
  `}</style>
    <div className="text-primary-pink">
      <h2 className="mt-48 text-5xl font-bold mb-16 mx-auto max-w-md ">Register</h2>
    <form className="max-w-md mx-auto text-xl" onSubmit={handleSubmit(onSubmit)}>
      <input className="block bg-inherit w-full rounded-lg py-2.5 px-3.5 mb-2.5 outline-2 border-2 border-primary-pink focus:outline-cyan-600"  placeholder="email" {...register("email", {pattern: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/ , required: true })} />
      {errors.email?.type =="pattern" && <div className="registerError">Invalid email</div>}
      {errors.email?.type === "custom" && <div className="registerError">{errors.email?.message}</div>}
      <input className="block bg-inherit w-full rounded-lg py-2.5 px-3.5 mb-2.5 outline-2 border-2	border-primary-pink focus:outline-cyan-600" placeholder="password" type={"password"} {...register("password", { required: true , minLength: 8})} />

      {errors.password && <div className="registerError">Invalid password</div>}
      
      <div className="flex items-baseline border-2 rounded-lg border-primary-pink  px-3.5 focus-within:border-cyan-600">
        <label className="py-2.5" htmlFor="username" >owo.bio/</label>
        <input id="username" className="w-full bg-inherit focus:outline-none py-2.5" placeholder="username" {...register("username", {pattern: /^[a-zA-Z0-9\-\_]+$/, required: true})} />
      </div>
      {errors.username?.type == "pattern" && <div className="registerError">Invalid username</div>}
      {errors.username?.type === "custom" && <div className="registerError">{errors.username?.message}</div>}
      <div className="ml-auto w-fit pt-2">
      <input className="text-white cursor-pointer dark:bg-dark-primary-background ml-2 border-2 border-primary-pink bg-primary-pink py-2 px-4 rounded-lg hover:bg-focused-pink" type="submit"  value="Register"/>
      </div>
    </form>
    </div>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ query, req, res }) : Promise<{props: {username:string}}> {


    console.log(query);
    if (req.session.user) {
      res.setHeader('location', '/account/links')
      res.statusCode = 302
      res.end()
      return {props: {username: ""}}
    }
    
    return {
      props: {username: query.username ? query.username as string : "",}
    };
  },
  sessionOptions,
);

export default App