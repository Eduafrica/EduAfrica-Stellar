import { useNavigate, useLocation, Link } from 'react-router'
import useUserStore from '../store/userStore'
import PageLayout from './PageLayout'
import { useFetchWalletBalance, useFetchWalletStellarTransactionHistroy } from '../Helpers/fetch'
import { TbCopy } from "react-icons/tb";
import { notify } from '../Utils/toast';
import { useEffect, useState } from 'react';
import Spinner from '../Component/Helpers/Spinner';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { fundStellarWallet } from '../Helpers/api';

function Wallet({ setSelectedCourse }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUserStore()
    const [ balance, setBalance ] = useState(0)
    const [ transactionnHistroy, setTransactionHistroy ] = useState([])


  const { data, isFetching } = useFetchWalletBalance()
  
  useEffect(() => {
      if(data) {
          setBalance(data?.data[0]?.balance)
    }
  }, [data])

  // ✅ Copy wallet key
  const handleCopyWalletKey = async (text) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      notify('success', "Wallet address copied ✅")
    } catch (error) {
      notify('error', "Failed to copy")
    }
  }

  // ✅ Truncate wallet key
  const truncateKey = (key, start= 6, end = 6) => {
    if (!key) return ""
    if (key.length <= start + end) return key
    return `${key.slice(0, start)}...${key.slice(-end)}`
  }


  //fetch wallet histroy
  const { data: dataHistroy, isFetching: isFetchingHistroy  } = useFetchWalletStellarTransactionHistroy()
  useEffect(() => {
      if(dataHistroy) {
            setTransactionHistroy(dataHistroy?.data)
            //console.log('dataHistroydataHistroy', dataHistroy?.data)
    }
  }, [dataHistroy])

    const statusColor = (status) => {
    switch (status) {
      case true:
        return "text-green-600 border-green-600 bg-green-50";
      case "Processing":
        return "text-blue-600 border-blue-600 bg-blue-50";
      case false:
        return "text-red-600 border-red-600 bg-red-50";
      default:
        return "text-gray-600 border-gray-400 bg-gray-50";
    }
  };

    const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
    });
  };

  //apis
  const [ loading, setLoading ] = useState(false)
  const handleFundWallet = async () => {
    if(balance > 10000) return notify('info', 'Account balance already exceeds 10000 minimium balance')
    if(loading) return
    try {
        setLoading(true)
        const res = await fundStellarWallet()

        if(res.success){
            notify('success', res.message)
            window.location.reload()
        } else {
            notify('error', res.message || 'Unable to form wallwt')
        }
    } catch (error) {
        
    } finally {
        setLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="bg-cream padx min-h-screen flex flex-col">
        <h2 className='text-[21px] mt-12 font-semibold'>Wallet</h2>

        {/* Wallet Balance */}
        <div className="flex items-center justify-center gap-[45px] flex-col">
            <div className="flex items-center flex-col justify-center gap-5">
                <div className="">
                    { 
                        isFetching ? (
                            <p className='text-[13px] font-normal text-gray-400'>Fetching Wallet Balance....</p>
                        ) : (
                            <p className='text-[36px] text-gray-700 font-bold max-tablet:text-[21px]'>{balance} XLM</p>
                        ) 
                    }
                </div>
                <div className="flex items-center gap-5">
                    <div className="max-w-[400px] overflow-hidden py-[10px] px-[18px] rounded-[24px] border-[1px] bg-white border-primary-700">
                        {truncateKey(user?.publicKey)}
                    </div>
                    <div 
                        onClick={() => handleCopyWalletKey(user?.publicKey)} 
                        className="cursor-pointer"
                        title="Copy wallet address"
                    >
                        <TbCopy className='text-[24px]' />
                    </div>
                </div>
            </div>    
            {/**BTN TO FUND */}
            <div className="flex items-center justify-center gap-[22px]">
                <div onClick={handleFundWallet} className="btn">{loading ? 'Please Wait...' : 'Fund Wallet'}</div>
            </div> 
        </div>

        {/**STELLAr Histroy */}
        <div className="mt-6">
            <h2 className='text-[21px] mt-12 font-semibold'>Transaction Histroy</h2>

            <div className="">
                {
                    isFetchingHistroy ? (
                        <div className="flex flex-col items-center justify-center">
                            <Spinner />
                            <p className="font-normal text-primary">Fetching Transaction Histroy...</p>
                        </div>
                    ) : (
                        <div className="mt-8 overflow-x-auto">
                            <table className="min-w-full border-collapse text-sm">
                                <thead>
                                <tr className=" text-[#7E808B] font-normal text-[14px] text-left px-6 whitespace-nowrap">
                                    <th className="p-3 font-medium">
                                    Transaction ID <FaArrowUpLong className="inline" />
                                    <FaArrowDownLong className="inline -ml-2" />
                                    </th>
                                    <th className="p-3 font-medium">
                                    Date <FaArrowUpLong className="inline" />
                                    <FaArrowDownLong className="inline -ml-2" />
                                    </th>
                                    <th className="p-3 font-medium">Type</th>
                                    <th className="p-3 font-medium">Amount</th>
                                    <th className="p-3 font-medium">Fee Charged</th>
                                    <th className="p-3 font-medium">Asset type</th>
                                    <th className="p-3 font-medium">
                                    Receiver <FaArrowUpLong className="inline" />
                                    <FaArrowDownLong className="inline -ml-2" />
                                    </th>
                                    <th className="p-3 font-medium">Status</th>
                                    <th className="p-3 font-medium">View</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                {transactionnHistroy?.map((tx) => (
                                    <tr key={tx.id} className="px-6 bg-white text-[14px] font-medium text-cod-gray-80 hover:bg-gray-50 border-b-cod-gray-16">
                                    <td className="p-3 ">
                                        {tx?.id}
                                        {/**
                                         * 
                                        <div className="text-[10px] text-cod-gray-56">
                                        {tx.convertingFrom} → {tx.convertingTo}
                                        </div>
                                         */}
                                    </td>
                                    <td className="p-3">{formatDate(tx?.created_at)}</td>
                                    <td className="p-3">{tx.type}</td>
                                    <td className="p-3">
                                        {
                                            tx.type === 'create_account' ? (
                                                tx?.starting_balance?.toLocaleString()
                                            ) : (
                                                tx?.amount?.toLocaleString()
                                            )
                                        } xlm
                                    </td>
                                    <td className="p-3">{tx?.fee_charged ? (parseFloat(tx.fee_charged) / 1e7).toFixed(5) : null} xlm</td>
                                    <td className="p-3">{tx?.asset_type}</td>
                                    <td className="p-3">{truncateKey(tx?.to || tx?.account)}</td>
                                    <td className="p-3">
                                        <span
                                        className={`px-2 py-1 rounded-full border text-xs font-medium ${statusColor(
                                            tx.transaction_successful
                                        )}`}
                                        >
                                        {tx.transaction_successful ? 'Successful' : 'Failed'}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <a target='_blank' href={`https://stellar.expert/explorer/testnet/tx/${tx?.transaction_hash}`} className="btn py-2">View</a>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>

      </div>
    </PageLayout>
  )
}

export default Wallet
