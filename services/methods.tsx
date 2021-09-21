import { useEffect, useState } from "react";

export interface Data<DataType> {
    loading?: boolean,
    data: DataType
}
export function createDataHook<DataType>(loader: () => Promise<DataType>) {
    return function useData() {

        const [data, setData] = useState<Data<DataType>>({ loading: true, data: undefined });

        useEffect(() => {
            loader()
                .then((_data) => setData({ loading: false, data: _data }));
        }, []);

        return data;
    }
}

export async function getData<DataType>(path: string) {
    const response = await fetch(`/api/${path}`);
    return await response.json() as DataType;
}