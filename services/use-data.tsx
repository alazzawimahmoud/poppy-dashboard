import { useEffect, useState } from "react";

const useData = () => {
    const [data, setData] = useState();
    useEffect(() => {
        getData('dashboard').then(setData);
    }, []);
    return { data }
}

export async function getData(path: string) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${path}`).then(results => results.json())
}

export default useData;