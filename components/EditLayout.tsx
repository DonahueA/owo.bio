import { useState } from "react";
import Navbar from "./EditNavBar";
export default function EditLayout({ children }: { children: React.ReactNode }) {

    const [count, setCount] = useState(0);
    return (
      <>
        <header>
          <title>edit</title>
        </header>
        <main>
            <Navbar />
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
          <div className="container">{children}</div>
        </main>
      </>
    );
  }