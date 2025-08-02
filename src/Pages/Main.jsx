import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar';
import InfoCard from '../Components/InfoCard';
import { RECOMMENDATION } from '../constants'

// we should not save key in url but just for assignment purpose, i am adding here.
function Main() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

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

    const handleFetchWeather = () => {
        if (!location) return;
        fetchWeather()
    }

    return (
        <div className='bg-white my-10 shadow-2xl py-10'>
            <SearchBar location={location} setLocation={setLocation} handleFetchWeather={handleFetchWeather} />

            {/* loading state */}
            {loading ? (<div className='text-base'>Loading...</div>) : null}

            {/* error message */}
            {error ? (<div className='text-red-500 text-base'>{error}</div>) : null}

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