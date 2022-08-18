export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header>
          <title>owo</title>
        </header>
        <style jsx global>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            text-align:center;
          }
          .container {
            max-width: 40%;
            margin: 1.5rem auto;
            padding-left: 1rem;
            padding-right: 1rem;
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