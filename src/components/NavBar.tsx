import React from 'react'

const NavBar = () => {
    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="Apple logo" />

                <ul>
                    {[
                        { label: 'store' },
                        { label: 'mac' },
                        { label: 'iphone' },
                        { label: 'watch' },
                        { label: 'Vision' },
                        { label: 'AirPods' },
                    ].map(({label})=>(
                        <li key={label}>{label}</li>
                    ))}
                </ul>
                <div className='flex-center gap-3'>
                    <button>
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Cart" />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default NavBar