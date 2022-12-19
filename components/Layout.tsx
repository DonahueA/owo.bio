export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header>
          <title>owo</title>
        </header>
        <style jsx global>{`
          main {
            height: 100%;
          }
          .container {
            height: 100%;
            text-align:center;
            max-width: 640px;
            margin: 1.5rem auto;
            padding-left: 1rem;
            padding-right: 1rem;
            font-family: Inter, sans-serif;
          }
          @media (max-width: 768px){
            .container{
              max-width:90%;
            }
          }
        `}</style>

  
        <main>
          <div className="container">{children}</div>
        </main>
      </>
    );
  }