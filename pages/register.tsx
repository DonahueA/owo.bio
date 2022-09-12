import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../components/Layout";


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
                setTimeout(()=>{window.location.replace("/edit")}, 100);
            }else{
                res.json().then((data) =>{
                    setError(data.type, {type: 'custom', message: data.error});
                })
            }
        });
        

  };

  return (
    <Layout>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="email" {...register("email", {pattern: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/ , required: true })} />
      {errors.email?.type =="pattern" && <div className="registerError">Invalid email</div>}
      {errors.email?.type === "custom" && <div className="registerError">{errors.email?.message}</div>}
      <input placeholder="password" type={"password"} {...register("password", { required: true , minLength: 8})} />

      {errors.password && <div className="registerError">Invalid password</div>}
      
      <div className="userSignup">
        <label id="userSignupLabel">owo.bio/</label>
      <input className="usernameInput" {...register("username", {pattern: /^[a-zA-Z0-9\-\_]+$/, required: true})} />
      </div>
      {errors.username?.type == "pattern" && <div className="registerError">Invalid username</div>}
      {errors.username?.type === "custom" && <div className="registerError">{errors.username?.message}</div>}
            
      <input type="submit" className="submit" value="Sign Up"/>
    </form>
    </Layout>
  );
}

export default App