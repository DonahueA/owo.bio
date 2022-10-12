export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header>
          <title>owo</title>
        </header>
        <style jsx global>{`
          .container {
            text-align:center;
            max-width: 640px;
            margin: 1.5rem auto;
            padding-left: 1rem;
            padding-right: 1rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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