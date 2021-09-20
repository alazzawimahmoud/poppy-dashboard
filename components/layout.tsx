import Head from "next/head";

const Layout: React.FunctionComponent<{ title: string }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Peace out! ✌🏻| {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-10 h-screen place-items-center content-center">
        {children}
      </div>
    </>
  )
}

export default Layout;
