import Head from "next/head";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>Poppy dashboard! 🚗</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative grid content-center h-screen gap-10 place-items-center">
        {children}
      </div>
    </>
  )
}

export default Layout;
