import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack, IoIosClose } from 'react-icons/io';
import { RiFileCopyLine } from 'react-icons/ri';
import LogoImg from '../assets/images/logo.png';
import useUserStore from '../store/userStore';
import { truncateAddress, truncateText } from '../Utils/utils';

const WithdrawalModal = ({ isOpen, onClose, balance }) => {
  const { user } = useUserStore();
  const [currentStep, setCurrentStep] = useState('method');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [wallets, setWallets] = useState([]);
  const [sendType, setSendType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletNickname, setWalletNickname] = useState('');

  // Load wallets from localStorage when component mounts or user changes
  useEffect(() => {
    if (user && user.userId) {
      const userWallets =
        JSON.parse(localStorage.getItem(`wallets_${user.userId}`)) || [];
      setWallets(userWallets);
    }
  }, [user, isOpen]);

  const XlmIcon = () => (
    <svg
      width="40"
      height="36"
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5188 3.00586C19.517 3.00586 21.4511 3.39909 23.2808 4.1695C24.2518 4.57878 25.1827 5.10041 26.0494 5.71031L25.8649 5.80662L23.4894 7.0184C21.6758 6.00724 19.6133 5.47759 17.5188 5.47759C17.4867 5.47759 17.4546 5.47759 17.4225 5.47759C15.8094 5.49364 14.2365 5.81464 12.7519 6.43257C11.2672 7.05853 9.93506 7.94931 8.7955 9.08888C6.46822 11.4242 5.18421 14.5219 5.18421 17.8121C5.18421 18.3498 5.21631 18.8875 5.28853 19.4252L5.31261 19.5937L5.46508 19.5135L25.9692 9.05678L30.2145 6.89L35.0215 4.43433V7.21101L30.07 9.73891L27.6384 10.9748L6.02684 22.0093L5.93054 22.0654L4.82308 22.6272L3.69956 23.197V23.189L3.59524 23.2371L0 25.0749V22.2982L1.21981 21.6802C2.239 21.1586 2.84891 20.0832 2.76063 18.9357C2.73655 18.5585 2.7205 18.1813 2.7205 17.8041C2.7205 15.8059 3.11373 13.8638 3.88414 12.0341C4.63048 10.2686 5.69781 8.68762 7.05405 7.32336C8.41029 5.96712 9.99123 4.89175 11.7568 4.14542C13.5784 3.39909 15.5205 3.00586 17.5188 3.00586Z"
        fill="#0F0F0F"
      />
      <path
        d="M35.0295 10.9258V13.7025L33.8097 14.3204C32.7905 14.842 32.1806 15.9174 32.2689 17.065C32.301 17.4422 32.309 17.8274 32.309 18.2045C32.309 20.2028 31.9158 22.1449 31.1454 23.9746C30.399 25.7401 29.3317 27.321 27.9755 28.6853C26.6192 30.0496 25.0302 31.1169 23.2728 31.8632C21.4511 32.6336 19.509 33.0269 17.5107 33.0269C15.5125 33.0269 13.5784 32.6336 11.7487 31.8632C10.7697 31.4459 9.83876 30.9243 8.97205 30.3144L11.4277 29.0625L11.524 29.0143C13.3377 30.0255 15.4082 30.5632 17.5107 30.5632C17.5428 30.5632 17.5669 30.5632 17.599 30.5632C19.2121 30.5551 20.785 30.2341 22.2696 29.6082C23.7543 28.9822 25.0864 28.0914 26.226 26.9519C28.5533 24.6246 29.8373 21.5189 29.8373 18.2286C29.8373 17.6909 29.8052 17.1452 29.7329 16.6075L29.7089 16.439L29.5564 16.5193L9.03625 26.9599L4.79098 29.1267L0 31.5663V28.7896L4.93543 26.2697L7.36703 25.0339L35.0295 10.9258Z"
        fill="#0F0F0F"
      />
    </svg>
  );

  const BankIcon = () => (
    <svg
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5837 10.7715H2.41699M2.41699 15.6048H6.70256C7.35529 15.6048 7.68166 15.6048 7.99724 15.6611C8.27735 15.711 8.55061 15.7937 8.81138 15.9076C9.10517 16.0358 9.37672 16.2169 9.91982 16.5789L10.6225 17.0474C11.1656 17.4094 11.4372 17.5905 11.7309 17.7187C11.9917 17.8326 12.265 17.9153 12.5451 17.9652C12.8607 18.0215 13.187 18.0215 13.8398 18.0215H15.1609C15.8136 18.0215 16.14 18.0215 16.4556 17.9652C16.7357 17.9153 17.0089 17.8326 17.2697 17.7187C17.5635 17.5905 17.8351 17.4094 18.3782 17.0474L19.0808 16.5789C19.6239 16.2169 19.8955 16.0358 20.1893 15.9076C20.45 15.7937 20.7233 15.711 21.0034 15.6611C21.319 15.6048 21.6454 15.6048 22.2981 15.6048H26.5837M2.41699 9.20065L2.41699 20.8006C2.41699 22.1541 2.41699 22.8308 2.68039 23.3478C2.91209 23.8025 3.28179 24.1722 3.73651 24.4039C4.25347 24.6673 4.9302 24.6673 6.28366 24.6673L22.717 24.6673C24.0705 24.6673 24.7472 24.6673 25.2641 24.4039C25.7189 24.1722 26.0886 23.8025 26.3203 23.3478C26.5837 22.8308 26.5837 22.1541 26.5837 20.8007V9.20065C26.5837 7.84719 26.5837 7.17046 26.3203 6.65351C26.0886 6.19878 25.7189 5.82908 25.2641 5.59739C24.7472 5.33399 24.0705 5.33399 22.717 5.33399L6.28366 5.33398C4.9302 5.33398 4.25347 5.33398 3.73652 5.59739C3.28179 5.82908 2.91209 6.19878 2.68039 6.65351C2.41699 7.17046 2.41699 7.84719 2.41699 9.20065Z"
        stroke="#00BF63"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!isOpen) return null;

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === 'xlm') {
      setCurrentStep('stellar');
    } else if (method === 'bank') {
      setCurrentStep('bank');
    }
  };

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setCurrentStep('amount');
  };

  const handleAddWallet = () => {
    setCurrentStep('addWallet');
  };

  const saveWallet = () => {
    if (!walletAddress) return;

    const newWallet = {
      id: Date.now(),
      address: walletAddress,
      network: 'Stellar XLM',
      type: sendType,
      nickname: walletNickname || undefined,
    };

    const updatedWallets = [...wallets, newWallet];
    setWallets(updatedWallets);

    // Save to localStorage
    if (user && user.userId) {
      localStorage.setItem(
        `wallets_${user.userId}`,
        JSON.stringify(updatedWallets)
      );
    }

    // Reset form and go back to wallet selection
    setWalletAddress('');
    setWalletNickname('');
    setSendType('');
    setCurrentStep('stellar');
  };

  const handleAmountSubmit = () => {
    setCurrentStep('pin');
  };

  const handlePinSubmit = () => {
    // Process withdrawal
    // Save transaction to localStorage
    if (user && user.userId) {
      const transaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        amount,
        wallet: selectedWallet,
        method: selectedMethod,
        status: 'completed',
      };

      const transactions =
        JSON.parse(localStorage.getItem(`transactions_${user.userId}`)) || [];
      transactions.push(transaction);
      localStorage.setItem(
        `transactions_${user.userId}`,
        JSON.stringify(transactions)
      );
    }

    setCurrentStep('success');
  };

  const resetAndClose = () => {
    // Reset all state
    setCurrentStep('method');
    setSelectedMethod('');
    setSelectedWallet(null);
    setAmount('');
    setTransactionPin('');
    setSendType('');
    setWalletAddress('');
    setWalletNickname('');

    // Close modal
    onClose();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show success message
  };

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Pick a withdrawal method
      </h2>

      <div className="space-y-4">
        <div
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'xlm'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodSelect('xlm')}
        >
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 ${
              selectedMethod === 'xlm'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-400'
            }`}
          >
            {selectedMethod === 'xlm' && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            )}
          </div>
          <div className="flex items-center">
            <div className="text-blue-500 mr-3">
              <XlmIcon />
            </div>
            <span className="font-medium">Stellar XLM</span>
          </div>
        </div>

        <div
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'bank'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodSelect('bank')}
        >
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 ${
              selectedMethod === 'bank'
                ? 'border-green-500 bg-green-500'
                : 'border-gray-400'
            }`}
          >
            {selectedMethod === 'bank' && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            )}
          </div>
          <div className="flex items-center">
            <div className="text-purple-500 mr-3">
              <BankIcon />
            </div>
            <span className="font-medium">Bank Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStellarSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Pick a withdrawal method
      </h2>

      <div className="space-y-4">
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedWallet?.id === wallet.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleWalletSelect(wallet)}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">
                  {truncateAddress(wallet?.address)}
                </span>
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                    selectedWallet?.id === wallet.id
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400'
                  }`}
                >
                  {selectedWallet?.id === wallet.id && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {wallet.network}, {wallet.type}
                {wallet.nickname && `, ${wallet.nickname}`}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No wallets added yet. Add your first wallet to continue.
          </div>
        )}

        <div
          className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
          onClick={handleAddWallet}
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mr-4">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-600">
            Add Stellar XLM Wallet
          </span>
        </div>
      </div>
    </div>
  );

  const renderAmountEntry = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Enter Amount
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-sm text-gray-500">Selected Wallet</div>
        <div className="font-mono text-sm">
          {truncateAddress(selectedWallet?.address)}
        </div>
        <div className="text-gray-500 text-sm">
          {selectedWallet?.network}, {selectedWallet?.type}
          {selectedWallet?.nickname && `, ${selectedWallet.nickname}`}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How much do you want to send
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              max={balance}
            />
          </div>
          <div className="text-gray-500 text-sm mt-1">{amount || 0} XLM</div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network Fee:</span>
            <span>{(amount * 0.01).toFixed(4)} XLM</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Available Balance:</span>
            <span>{balance} XLM</span>
          </div>
          <div className="flex justify-between text-sm mt-1 font-semibold">
            <span className="text-gray-700">You'll receive:</span>
            <span>{(amount - amount * 0.01).toFixed(4)} XLM</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleAmountSubmit}
        className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!amount || amount <= 0 || amount < balance}
      >
        Next
      </button>
    </div>
  );

  const renderPinEntry = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Enter Transaction PIN
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter transaction PIN
          </label>
          <input
            type="password"
            value={transactionPin}
            onChange={(e) => setTransactionPin(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your 4-digit PIN"
            maxLength="4"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
      </div>

      <button
        onClick={handlePinSubmit}
        className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={transactionPin.length !== 4}
      >
        Confirm Withdrawal
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Withdrawal Successful!
      </h2>
      <p className="text-gray-600">
        Your funds are being processed and will arrive shortly.
      </p>

      <button
        onClick={resetAndClose}
        className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Done
      </button>
    </div>
  );

  const renderBankTransfer = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Bank Transfer Details
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Account Number:</span>
            <button
              onClick={() => copyToClipboard('1234567890')}
              className="text-blue-500 hover:text-[#00BF63] flex items-center"
            >
              <RiFileCopyLine className="mr-1" /> Copy
            </button>
          </div>
          <p className="text-gray-800 font-mono">1234567890</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <span className="font-semibold text-gray-700">Account Name:</span>
          <p className="text-gray-800">Edu Africa</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <span className="font-semibold text-gray-700">Bank Name:</span>
          <p className="text-gray-800">Example Bank</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-700 text-sm">
            Transfers typically take 1-3 minutes to process.
          </p>
        </div>
      </div>

      <button
        onClick={() => setCurrentStep('pin')}
        className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        I've Made the Transfer
      </button>
    </div>
  );

  const renderAddWallet = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add Stellar Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Network*
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value="Stellar XLM"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Send Type*
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sendType}
            onChange={(e) => setSendType(e.target.value)}
            required
          >
            <option value="">Select method</option>
            <option value="Instant (1min, 1% fee)">
              Instant (1min, 1% fee)
            </option>
            <option value="Standard (13min, 0% fee)">
              Standard (13min, 0% fee)
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wallet Address*
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Stellar wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wallet Nickname (Optional)
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. My Main Wallet"
            value={walletNickname}
            onChange={(e) => setWalletNickname(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={saveWallet}
        className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!walletAddress || !sendType}
      >
        Add Wallet
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                if (currentStep === 'method') {
                  resetAndClose();
                } else if (
                  currentStep === 'stellar' ||
                  currentStep === 'bank'
                ) {
                  setCurrentStep('method');
                } else if (currentStep === 'amount') {
                  setCurrentStep('stellar');
                } else if (currentStep === 'pin') {
                  setCurrentStep('amount');
                } else if (currentStep === 'addWallet') {
                  setCurrentStep('stellar');
                } else if (currentStep === 'success') {
                  resetAndClose();
                }
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <IoIosArrowRoundBack className="text-2xl" />
            </button>

            <div className="flex justify-center">
              <img src={LogoImg} alt="Edu Africa" className="h-8" />
            </div>

            <button
              onClick={resetAndClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <IoIosClose className="text-2xl" />
            </button>
          </div>

          {currentStep === 'method' && renderMethodSelection()}
          {currentStep === 'stellar' && renderStellarSelection()}
          {currentStep === 'amount' && renderAmountEntry()}
          {currentStep === 'pin' && renderPinEntry()}
          {currentStep === 'success' && renderSuccess()}
          {currentStep === 'bank' && renderBankTransfer()}
          {currentStep === 'addWallet' && renderAddWallet()}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
