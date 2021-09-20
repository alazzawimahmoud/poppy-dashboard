import { useEffect, useState } from "react";

const useData = () => {
    const [data, setData] = useState();
    useEffect(() => {
        getData('data').then(setData);
    }, []);
    return { data }
}

export async function getData(path: string) {
    return await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${path}`).then(results => results.json())
}

export default useData;