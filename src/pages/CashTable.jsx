import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import MyButton from '../components/UI/MyButton'
import { useFetching } from "../hooks/useFetching";
import CashTablesService from "../api/CashTablesService";
import Loader from "../components/UI/Loader/Loader";
import { useNavigate } from "react-router-dom";

const CashTable = () => {

  const navigate = useNavigate();

  const [tables, setTables] = useState({items: []})
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchTables, isTablesLoading, tableError] = useFetching(async (limit, page) => {

    const response = await CashTablesService.getTableList(limit, page)
    setTables({...response.data.data})
  })

  useEffect(() => {
    fetchTables(limit, page)
  }, [page, limit])
  
  const [playersInfo, setPlayersInfo] = useState([])
  const [isTableInfo, setIsTableInfo] = useState(false)
  const [fetchPlayersInfo, isPlayersInfoLoading, PlayersInfoError] = useFetching(async (settingId) => {
    const response = await CashTablesService.getPlayersInfo(settingId)
    const { isAuthorized, ...players } = response.data.data || []
    setPlayersInfo(Object.values(players))
  })

  const [currentSettingId, setCurrentSettingId] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null);

  const tableInfo = (settingId) => {
    clearSidebar()
    setIsTableInfo(true)
    setIsSettingDetails(false)
    fetchPlayersInfo(settingId)
    setCurrentSettingId(settingId)
    setSelectedRowId(settingId)
  }

  const [settingDetails, setSettingDetails] = useState({})
  const [isSettingDetails, setIsSettingDetails] = useState(false)

  const [fetchSettingDetails, isSettingDetailsLoading, SettingDetailsError] = useFetching(async (settingId) => {
    const response = await CashTablesService.getSettingDetails(settingId)
    setSettingDetails({...response.data.data})
  })

  const getSettingDetails = () => {
    setSettingDetails({})
    settingDetailsVisibility()

    if(!isSettingDetails) {
      fetchSettingDetails(currentSettingId)
    }
  }

  const [fetchTableConnect, isTableConnectLoading, TableConnectError] = useFetching(async (settingId) => {
    const response = await CashTablesService.connectToTable(settingId)

    if(response.data.success) {
      navigate('/cash-game')
    }

    //TODO TableConnectError
  })

  const joinToTable = (settingId) => {
    fetchTableConnect(settingId)
  }

  const settingDetailsVisibility = () => {
    isSettingDetails ? setIsSettingDetails(false) : setIsSettingDetails(true)     
  }

  const clearSidebar = () => {
    setPlayersInfo([])
    setSettingDetails({})
  }

  const closeSidebar = () => {
    clearSidebar()
    setIsTableInfo(false)
    setSelectedRowId(null);
  }

  return (
    <>
      <div className='flex bg-zinc-900 h-vh-fullScreen'>
        
        {isTableConnectLoading &&
          <div className='absolute w-full h-vh-fullScreen bg-black opacity-50 '>
            <div className='absolute top-1/4 left-1/2'>
              <Loader/>   
            </div>
          </div>
        }

        <div className={'rounded border-8 border-solid border-black h-full ' + 
          (isTableInfo ? 'w-2/3' : 'w-full')
        }>
          {isTablesLoading &&
            <div className='absolute left-1/2 top-1/3'>
              <Loader/>
            </div>
          } 
          <table className='table-auto w-full'>
            <thead className='bg-gray-800 text-gray-300'>
              <tr>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>Buy-in</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>Blinds</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>Tables</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>Players</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid last:border-r-0'>Action</th>
              </tr>
            </thead>

            <tbody className='bg-zinc-600 text-gray-300 text-center p-4'>
              {tables.items.map((item) => 
                <tr className={'border-b-4 border-black border-solid hover:bg-red-900 ' +
                   (selectedRowId === item.settingId ? 'bg-red-900' : '')} 
                    key={item.settingId}
                >
                  <td>${item.buyIn}</td>
                  <td>${item.smallBlind}/${item.bigBlind}</td>
                  <td>
                    <div className='flex justify-center items-center p-1'>
                        <div className='playerMaxCount'>{item.limitPlayers}</div>
                        <div className='rounded-full border-2 border-black bg-zinc-800 h-8 w-12 flex justify-center items-center'>
                          {item.countTables}
                        </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center items-center p-1'>
                      <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height: '1.5rem'}}><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" style={{fill: '#22c55e'}}></path></svg>
                      <span className='p-2 text-green-500'>{item.countPlayers}</span>
                    </div>
                  </td>
                  <td>
                    <div className='flex'>
                      <MyButton onClick={() => tableInfo(item.settingId)}>
                        <div className='flex justify-center'>
                          <svg viewBox="0 0 24 24" role="presentation" style={{width: '1.5rem', height: '1.5rem'}}><path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" style={{fill: '#0369a1'}}></path></svg>
                          <p className='text-sky-500 '>Info</p>
                        </div>
                      </MyButton>
                      <MyButton onClick={() => joinToTable(item.settingId)}>
                        <p className='text-green-500'>Join</p>
                      </MyButton>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={'relative rounded border-8 border-black border-solid w-1/3 h-full ml-1 ' + 
            (isTableInfo ? 'flex flex-col' : 'hidden')
          }
        >

          <table className="table-auto w-full ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>Player</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid'>№</th>
                <th className='font-medium p-2 border-r-4 border-gray-300 border-solid last:border-r-0'>Chips</th>
              </tr>
            </thead>
            <tbody className="bg-zinc-600 text-gray-300 text-center p-4">
              {playersInfo.map((player) => 
                <tr key={player.login} className="border-b-4 border-black border-solid hover:bg-red-900">
                  <td>{player.login}</td>
                  <td>{player.tableId}</td>
                  <td>${player.stack}</td>
                </tr>
              )}
            </tbody>
          </table>
          {isPlayersInfoLoading &&
            <div className='flex justify-center p-5'>
              <Loader/>
            </div>
          }  
          <div>
            <MyButton onClick={() => joinToTable(currentSettingId)}>
              <p className='text-green-500'>Join</p>
            </MyButton>
          </div>
          <div onClick={() => getSettingDetails()}
            className='mt-1 flex justify-center items-center cursor-pointer hover:bg-sky-500'>
              <p className='px-6 py-2 text-white'>
                more information about the game
              </p>
              {isSettingDetails 
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{width: '2rem', height: '2rem', fill: '#fff'}}><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{width: '2rem', height: '2rem', fill: '#fff'}}><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"/></svg> 
              }
          </div>

          {isSettingDetailsLoading &&
            <div className='flex justify-center p-5'>
              <Loader/>
            </div>
          }
          <div style={{ display: (isSettingDetails) ? null : 'none'}}
            className='moreInfo text-white flex-1 overflow-y-auto'>

            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Name</p>
              <p className='text-gray-300'>{settingDetails.name}</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Type</p>
              <p className='text-gray-300'>{settingDetails.type}</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Rules</p>
              <p className='text-gray-300'>{settingDetails.rule}</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Buy-in</p>
              <p className='text-gray-300'>{settingDetails.buyIn} $</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Blinds</p>
              <p className='text-gray-300'>{settingDetails.smallBlind}$ / {settingDetails.bigBlind}$</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Time to move</p>
              <p className='text-gray-300'>{settingDetails.turnTime} sec</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Time Bank</p>
              <p className='text-gray-300'>{settingDetails.timeBank?.timeLimit } sec</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Minimum number of players at the table</p>
              <p className='text-gray-300'>2</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Currency</p>
              <p className='text-gray-300'>{settingDetails.currency}</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Rake</p>
              <p className='text-gray-300'>{settingDetails.rake}%</p>
            </div>
            <div className='flex justify-between  p-2 m-2 bg-zinc-600 rounded'>
              <p>Rake cap</p>
              <p className='text-gray-300'>{settingDetails.rakeCap}$</p>
            </div>
            <div className='flex flex-col  p-2 m-2 bg-zinc-600 rounded'>
              <p>Hold'em Rules</p>
              <p className='text-gray-300'>
                Texas Hold'em is the most popular version of poker in the world. A standard deck of 52 cards is used for the game. Each player receives two dark cards ("pocket cards"). Then, during four rounds of trading, five community cards are laid out on the table. With the help of common and closed cards, the player must collect the best combination of five cards.
              </p>
            </div>
          </div>

          <div className="absolute h-24 w-10 inset-1/3 left-0 opacity-20 hover:opacity-100">
            <button onClick={() => closeSidebar()} className='w-full h-full bg-gray-300 rounded-r-lg'>
                <svg viewBox="0 0 24 24" role="presentation" style={{width: '2.5rem', height: '3rem'}}><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CashTable