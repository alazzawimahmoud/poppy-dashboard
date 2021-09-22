import Head from "next/head";

const Layout: React.FunctionComponent<{ title: string }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Poppy dashboard - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative grid content-center h-screen gap-10 place-items-center">
        {children}
      </div>
    </>
  )
}

export default Layout;
