import { CurrentWeather } from '@/components/currentWeather';
import { FavoriteCities } from '@/components/favorite-city';
import { HourlyTemperature } from '@/components/hourly-tem';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { WeatherDetails } from '@/components/weather-details';
import { WeatherForecast } from '@/components/weather-forecast';
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react'

export default function WeatherDashboard() {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

    const locationQuery = useReverseGeocodeQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);
    console.log(weatherQuery.data);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            // Reload Data WeatherDashboard
            forecastQuery.refetch();
            weatherQuery.refetch();
            locationQuery.refetch();
        }
    }

    if (locationLoading) {
        return <WeatherSkeleton />
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>
                <p className="">{locationError}</p>
                <Button onClick={getLocation} variant={'outline'} className='w-fit'>
                    <MapPin className='mr-2 h-4 w-4'/>
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription>
                <p className="">Please enable location access to see your local weather </p>
                <Button onClick={getLocation} variant={'outline'} className='w-fit'>
                    <MapPin className='mr-2 h-4 w-4'/>
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
        )
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>
                <p className="">Failed to fetch weather data. Please try again.</p>
                <Button onClick={handleRefresh} variant={'outline'} className='w-fit'>
                    <RefreshCcw className='mr-2 h-4 w-4'/>
                    Retry
                </Button>
            </AlertDescription>
        </Alert>
        )
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />
    }

    return (
        <div className='space-y-4'>

            <FavoriteCities />

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button variant={'outline'} size={'icon'} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
                    <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
                </Button>
            </div>


            <div className='grid gap-6 w-full'>
                <div className='grid grid-cols-5 gap-x-5'>
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    <WeatherDetails data={weatherQuery.data}/>
                </div>
                <div className="flex flex-col gap-5">
                    <HourlyTemperature data={forecastQuery.data}/>
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    )
}
