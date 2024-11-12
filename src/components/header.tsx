import { useTheme } from '@/constants/theme-provider'
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom'
import { CitySearch } from './city-search';

export default function Header() {
    const { theme , setTheme} = useTheme();
    const isdark = theme === 'dark';
    return (
        <header className='sticky top-0 z-50 w-full border-b border-white/15 backdrop-blur py-2'>
            <div className="px-10 flex items-center justify-between h-14">
                <Link to="/" className='text-2xl font-bold text-blue-500'>Breezio</Link>

                <div className="flex flex-row gap-5 items-center">
                    {/* Search */}
                    <CitySearch />

                    {/* Theme Switch */}
                    <div className="" onClick={() => setTheme(isdark ? 'light' : 'dark')}>
                        {isdark ? (
                            <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all'/>
                        ): (
                            <Moon className='h-6 w-6 text-blue-600 rotate-0 transition-all'/>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
