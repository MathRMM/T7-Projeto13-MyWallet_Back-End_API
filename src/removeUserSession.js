import { Mongo_Session } from "./database/dataService.js"

export default async function removeUserSession(){
    setInterval(async()=>{
        const seconds = Date.now() - 10*1000
       
        try {
            console.log(await Mongo_Session({remove:{
                lastStatus: {$lte: seconds}
            }}))
            
        } catch (error) {
            console.error(error)
        }
    }, 15000)
}