import { createContext,useState } from "react";


export const IdContext = createContext(null)


export default function Context ( {children}){
    const [SlotId, setSlotId] = useState(null)

    return(
 
        <IdContext.Provider value={{ SlotId,setSlotId}}>
        {children}
       </IdContext.Provider>

    )   
}
