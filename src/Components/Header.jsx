import { UserSettingContext } from '../Contexts/UserSettings';
import { useContext } from 'react'

function Header() {
    const { theme, toggleTheme } = useContext(UserSettingContext);
    return (
        <div className='rounded-md shadow-2xl border border-solid flex justify-between items-center p-4' style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}>
            <div className='text-2xl font-bold'>Weather-Based Outfit Recommender</div>

            {/* right section */}
            <div className='flex flex-col justify-start items-center gap-2'> <p>Current Theme: {theme}</p>
                <button className='border border-solid px-2 py-1 rounded-md' onClick={toggleTheme}>Toggle Theme</button></div>
        </div>
    )
}

export default Header