import { useEffect, useState } from 'react';
import { useFetchCourseDetail } from '../../Helpers/fetch';
import useUserStore from '../../store/userStore';
import LoadingPage from './LoadingPage';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import LogoImg from '../../assets/images/logo.png';
import { notify } from '../../Utils/toast';
import { coursePayment } from '../../Helpers/api';
import Spinner from './Spinner';

// SVG Icons for payment options
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
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

function BuyCourseCard({ courseId, setSelectedCourse }) {
  const { user, setUser } = useUserStore();
  const { data, isFetching } = useFetchCourseDetail(courseId);
  const [loading, setLoading] = useState(false);
  const [bankTransferLoading, setBankTransferLoading] = useState(false);
  const [courseInfoData, setCourseInfoData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('xlm');
  const [showPaymentOptions, setShowPaymentOptions] = useState(true);

  useEffect(() => {
    if (data) {
      setCourseInfoData(data?.data);
    }
  }, [data]);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      notify('error', 'Please select a payment method');
      return;
    }
    setShowPaymentOptions(false);
  };

  const handleBuyWithXLM = async () => {
    if (!user) {
      notify('error', 'Please Login First');
      window.location.href = '/student/login';
      return;
    }
    if (loading) return;

    try {
      const formData = { courseId };
      setLoading(true);
      const res = await coursePayment(formData);

      if (res.success) {
        setUser(res?.data?.user);
        notify('success', res.message);
        setTimeout(() => {
          window.location.href = '/my-courses';
        }, 3000);
      } else {
        notify('error', 'Unable to purchase course');
      }
    } catch (error) {
      notify('error', 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBankTransfer = async () => {
    setBankTransferLoading(true);
    // Simulate bank transfer processing
    setTimeout(() => {
      setBankTransferLoading(false);
      notify('success', 'Payment successful!');
      setTimeout(() => {
        window.location.href = '/my-courses';
      }, 2000);
    }, 3000);
  };

  const handleClear = () => {
    setSelectedCourse('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify('success', 'Account number copied to clipboard');
  };

  const handleBackToPaymentOptions = () => {
    setShowPaymentOptions(true);
  };

  return (
    <div className="w-[80%] max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden">
      {loading && <LoadingPage />}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={
              showPaymentOptions ? handleClear : handleBackToPaymentOptions
            }
            className="text-gray-600 hover:text-gray-800"
          >
            <IoIosArrowRoundBack className="text-2xl" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Course Payment</h2>
          <button
            onClick={handleClear}
            className="text-gray-600 hover:text-gray-800"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <img alt="Edu africa logo" src={LogoImg} className="w-32" />
        </div>

        {showPaymentOptions ? (
          <>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
              Select Payment Method
            </h3>

            <div className="space-y-4 mb-6">
              <div
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'xlm'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handlePaymentMethodSelect('xlm')}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 ${
                    paymentMethod === 'xlm'
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400'
                  }`}
                >
                  {paymentMethod === 'xlm' && (
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
                  <span className="font-medium">Pay with XLM</span>
                </div>
              </div>

              <div
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handlePaymentMethodSelect('bank')}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 ${
                    paymentMethod === 'bank'
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-400'
                  }`}
                >
                  {paymentMethod === 'bank' && (
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
                  <span className="font-medium">Pay with Bank Transfer</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Continue to Payment
            </button>
          </>
        ) : paymentMethod === 'xlm' ? (
          <>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
              Order Summary
            </h3>
            {isFetching ? (
              <div className="flex justify-center my-8">
                <Spinner />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col">
                  <img
                    alt={courseInfoData?.title}
                    src={courseInfoData?.image}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4 space-y-2">
                    <h2 className="text-gray-800 font-semibold text-lg">
                      {courseInfoData?.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {courseInfoData?.totalStudent || 0} Students Enrolled
                    </p>
                    <h2 className="text-gray-800 font-bold text-xl">
                      {courseInfoData?.price || 0} XLM
                    </h2>
                  </div>
                </div>
                <button
                  onClick={handleBuyWithXLM}
                  className="w-full bg-[#00BF63] hover:bg-[#00BF63] text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    `Pay ${courseInfoData?.price || 0} XLM`
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
              Bank Transfer Details
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">
                    Account Number:
                  </span>
                  <button
                    onClick={() => copyToClipboard('1234567890')}
                    className="text-blue-500 text-sm font-medium hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-gray-800 font-mono">1234567890</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-700">
                  Account Name:
                </span>
                <p className="text-gray-800">Edu Africa</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-700">Bank Name:</span>
                <p className="text-gray-800">Example Bank</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-700 text-sm">
                  Please transfer the exact amount of{' '}
                  <span className="font-bold">
                    {courseInfoData?.price || 0} XLM
                  </span>{' '}
                  to the account above. Your enrollment will be activated once
                  the transfer is confirmed.
                </p>
              </div>

              <button
                onClick={handleBankTransfer}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                disabled={bankTransferLoading}
              >
                {bankTransferLoading
                  ? //   <div className="flex items-center justify-center">
                    //     <Spinner />
                    //     <span className="ml-2">Confirming...</span>
                    //   </div>
                    'Confirming...'
                  : 'Confirm Transaction'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BuyCourseCard;
