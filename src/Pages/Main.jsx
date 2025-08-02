import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar';
import InfoCard from '../Components/InfoCard';
import { RECOMMENDATION, HISTORY_LIMIT } from '../constants'

// we should not save key in url but just for assignment purpose, i am adding here.
function Main() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [history, setHistory] = useState([])

    function fetchWeather() {
        setLoading(true)
        setError("")
        fetch(`https://api.weatherapi.com/v1/current.json?key=4f4ec2dd1afe4167aef113021250208&q=${location}&aqi=no`).then(res => res.json()).then(result => {
            console.log({ result })
            if (result?.error?.message) {
                setError(result?.error?.message)
                return
            }
            setData(result)
        }).catch(error => {
            console.log(error)
            setError(error)
        })
        setLoading(false)
    }

    const saveInHistory = (loc = '') => {
        if (!loc) return;
        //  if city is already 
        let historyCopy = [...history]
        if (historyCopy?.includes(loc)) {
            historyCopy = history.filter(item => item !== loc)
        }

        if (historyCopy.length === HISTORY_LIMIT) {
            const newArr = historyCopy.slice(1)
            newArr.push(loc)
            setHistory(newArr)
        } else {
            setHistory([...historyCopy, loc])
        }
    }

    const handleFetchWeather = () => {
        if (!location) return;
        saveInHistory(location)
        fetchWeather()
    }

    return (
        <div className='bg-white my-10 shadow-2xl py-10'>
            <SearchBar location={location} setLocation={setLocation} handleFetchWeather={handleFetchWeather} />

            {/* loading state */}
            {loading ? (<div className='text-base'>Loading...</div>) : null}

            {/* error message */}
            {error ? (<div className='text-red-500 text-base'>{error}</div>) : null}


            {/* history card */}
            {
                history?.length > 0 && (<div className='w-full p-4 flex justify-start items-center gap-2'>
                    <h4>History : </h4>
                    {
                        history?.map((item, index) => {
                            return (
                                <div key={index} className='bg-gray-300 px-2 py-1 rounded-md text-base font-bold'>{item}</div>
                            )
                        })
                    }
                </div>)
            }

            {/* weather info */}
            {data?.current && data?.location && (<div className='flex justify-around items-start gap-2'>
                {/* locaiton info */}
                <InfoCard
                    heading="Location Info"
                    data={[
                        { label: "Name", value: data?.location?.name || "" },
                        { label: "Country", value: data?.location?.country || "" },
                        { label: "Region", value: data?.location?.region || "" },
                        { label: "Lat", value: data?.location?.lat || "" },
                        { label: "Lon", value: data?.location?.lon || "" },
                        { label: "Local Time", value: data?.location?.localtime || "" }
                    ]}
                />


                {/*  weather info */}
                <InfoCard
                    heading="Weather Info"
                    data={[
                        { label: "Condition", value: data?.current?.condition?.text || "" },
                        { label: "Temp C", value: data?.current?.temp_c || "" },
                        { label: "Temp F", value: data?.current?.temp_f || "" },
                        { label: "Feels Like C", value: data?.current?.feelslike_c || "" },
                        { label: "Feels Like F", value: data?.current?.feelslike_f || "" },
                        { label: "Humidity", value: data?.current?.humidity || "" },
                        { label: "Wind Speed (kph)", value: data?.current?.wind_kph || "" }
                    ]}
                />

                {/*  recommendation info */}
                <InfoCard
                    heading="Recommendation"
                    data={RECOMMENDATION[data?.current?.condition?.text] || []}
                />
            </div>)}
        </div>
    )
}

export default Main