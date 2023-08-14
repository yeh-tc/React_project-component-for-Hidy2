import {useState, useEffect, useCallback} from 'react';
import { api } from "./api";
export default function useDataFetch (lon, lat, date, Rv, parameters){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [noData, setNoData] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setData();
        setNoData(false);
        
        const url = `${api}/bottlediver?lat_from=${lat[0]}&lat_to=${lat[1]}&lon_from=${lon[0]}&lon_to=${lon[1]}&date_from=${date[0]}&date_to=${date[1]}&RV=${Rv}&var=${parameters.join(",")}`;
        console.log(url)
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          if (data === null || data.status === "No result") {
            setNoData(true);
          }
        } catch (error) {
          setData("connection error");
        } finally {
          setLoading(false);
        }
      },[Rv, lon, lat, date, parameters]);
      //有勾選參數，才去fetchData
      useEffect(() => {
        if (parameters.toString() !== ["none"].toString()) {
          fetchData();
        }
      }, [fetchData, parameters]);
      
      return {loading, data, noData}

}