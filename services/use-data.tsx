import { useEffect, useState } from "react";

const useData = () => {
    const [data, setData] = useState<any>();
    useEffect(() => {
        getData('dashboard').then(setData);
    }, []);
    return { data }
}

export async function getData(path: string) {
    return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${path}`).then(results => results.json())
}

export default useData;