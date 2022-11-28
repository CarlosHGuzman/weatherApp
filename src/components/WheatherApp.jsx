import axios from "axios"
import { useEffect, useState } from "react"
const WheatherApp = () => {
    const [pos, setPos] = useState()
    const [data, setData] = useState()
    const [tempB, setTempB] = useState(true)
    const [temp, setTemp] = useState()

    const success = (param) =>{
        const position = {
            lon: param.coords.longitude,
            lat: param.coords.latitude,
            APIKEY: "cf847b401b69ce0d115f69aca0375152"
        }
        setPos(position)
    } 
    
    const changeFtoC = () => {
        setTempB(!tempB)
    }
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success)
    }, [])
 
    useEffect(() =>{
        console.log("Dentro de UseEffect Peticion")
        if(pos){
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${pos?.lat}&lon=${pos?.lon}&appid=${pos?.APIKEY}`
            axios.get(URL)
                .then(({data}) =>{
                    setData(data)
                    const tempcelsius = (data?.main?.temp-273).toFixed(1)
                    const tempfahrenheit = ((tempcelsius * 9/5) + 32).toFixed(1)
                    setTemp([tempcelsius, tempfahrenheit])
                })
                .catch((error) => console.log(error))
        }
    }, [pos])
 
    return (
        <article className="card-weather">
            <header className="place">
                <h1>Weather App</h1>
                <h4>{ data?.name +  " " + data?.sys?.country}</h4>
            </header>
            <div className="content">

                <div className="about-weather">
                    <p>{data?.weather[0]?.description}</p>
                    <ul>
                        <li>Wind speed: {data?.wind?.speed}</li>
                        <li>Cloud: {data?.clouds.all}</li>
                        <li>Pressure: {data?.main?.pressure} </li>
                    </ul>
                </div> 
                <div className="climate-img-grades">
                    <img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`} alt=""></img>
                    <p className="text">{temp && (tempB?`${temp[0]} °C`: `${temp[1]}°F`)}</p>
                </div>
            </div>
            <div className="btn-center">

            <button onClick={changeFtoC} className="btn">Degrees F° C°</button>
            </div>
        </article>
    )
}

export default WheatherApp