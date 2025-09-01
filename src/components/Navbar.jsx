import React from 'react'

const Navbar = () => {

    const currentcolor = '#9ca3af'
    const textcolor = 'text-gray-300'
    const tab = 'flex items-center p-3 hover:bg-zinc-600'
    const tabActive = 'flex items-center bg-zinc-600 p-3'

    return (
        <div className="max-width bg-zinc-700 min-h-50">
            <div className="flex min-h-14 justify-between">
                <div className='flex'>
                    <a className={tabActive} href="/cash-table">
                        <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height:'1.5rem'}}><path d="M11.19,2.25C11.97,2.26 12.71,2.73 13,3.5L18,15.45C18.09,15.71 18.14,16 18.13,16.25C18.11,17 17.65,17.74 16.9,18.05L9.53,21.1C9.27,21.22 9,21.25 8.74,21.25C7.97,21.23 7.24,20.77 6.93,20L1.97,8.05C1.55,7.04 2.04,5.87 3.06,5.45L10.42,2.4C10.67,2.31 10.93,2.25 11.19,2.25M14.67,2.25H16.12A2,2 0 0,1 18.12,4.25V10.6L14.67,2.25M20.13,3.79L21.47,4.36C22.5,4.78 22.97,5.94 22.56,6.96L20.13,12.82V3.79M11.19,4.22L3.8,7.29L8.77,19.3L16.17,16.24L11.19,4.22M8.65,8.54L11.88,10.95L11.44,14.96L8.21,12.54L8.65,8.54Z" style={{fill: currentcolor}}></path></svg>
                        <span className={textcolor}>Сash games</span>
                    </a>
                    <a className={tab} href="/tournaments">
                        <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height:'1.5rem'}}><path d="M2,2V4H7V8H2V10H7C8.11,10 9,9.11 9,8V7H14V17H9V16C9,14.89 8.11,14 7,14H2V16H7V20H2V22H7C8.11,22 9,21.11 9,20V19H14C15.11,19 16,18.11 16,17V13H22V11H16V7C16,5.89 15.11,5 14,5H9V4C9,2.89 8.11,2 7,2H2Z" style={{fill: currentcolor}}></path></svg>
                        <span className={textcolor}>Tournaments</span>
                    </a>
                </div>
                <div className='flex'>
                    <a className={tab + ' asdasd'} href="/settings">
                        <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height:'1.5rem'}}><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" style={{fill: currentcolor}}></path></svg>
                        <span className={textcolor}>Settings</span>
                    </a>
                </div>
            </div>
        </div>    
    )
}

export default Navbar