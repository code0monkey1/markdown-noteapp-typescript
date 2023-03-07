import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string,val:T | (() =>T)) {

   const [value,setValue] = useState<T>(()=>{

     const storedValue =localStorage.getItem(key)

     if(storedValue)return (JSON.parse(storedValue))
     else{
         if ( typeof val === 'function') return( (val as ()=>T )())
         else return val           
     }

   })

   useEffect(() => {
   
     localStorage.setItem(key,JSON.stringify(value))
   }, [key,value])
   

 return [value,setValue] as const
}

export default useLocalStorage