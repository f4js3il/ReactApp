 import {useEffect, useState} from 'react';
 export default httpClient =>{
   
    const [error, setError]= useState(null);  
      
    const resInterceptor = httpClient.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    const reqInterceptor = httpClient.interceptors.request.use((request) => {
      setError(null);
      return request;
    });
  
    useEffect(()=>{
      return (()=>{
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      })
    },[reqInterceptor,resInterceptor])


 const errorHandler = () => {
  setError(null);
  };

  return[error,errorHandler ];

 }