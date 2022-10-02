export default function Navbar() {
    return (
      <div>
      <div className="pl-1  py-4 font-semibold flex justify-center">
        {/* <a className="mr-4" href="./settings">Account</a> */}
        <a className="mx-2" href="./links">Links</a>
        <a className="mx-2" href="./themes">Themes</a>
        <div onClick={()=>{fetch("./api/users/logout"), {method: "POST"};window.location.replace("/");}} className="font-semibold cursor-pointer mx-2">Logout</div>
      </div>
    
      <hr />
      </div>
    );
  }