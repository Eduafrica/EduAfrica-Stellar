import { Link, useNavigate } from 'react-router';
import LogoImg from '../../assets/images/logo.png';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { notify } from '../../Utils/toast';
import { useEffect } from 'react';
import { validatePassword } from '../../Utils/utils';
import LoadingPage from '../Helpers/LoadingPage';
import { instructorRegister } from '../../Helpers/api';
import useUserStore from '../../store/userStore';

function RegisterCard() {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClear = () => {
    setFormData({});
  };

  const handleRegister = async () => {
    if (loading) return;
    if (!formData?.name) return notify('error', 'Name is required');
    if (!formData?.email) return notify('error', 'Email is required');
    if (!formData?.password) return notify('error', 'Password is required');
    const verifyPassword = await validatePassword(formData?.password);
    if (!verifyPassword.success) return notify('error', verifyPassword.message);

    try {
      setLoading(true);

      const res = await instructorRegister(formData);

      if (res.success) {
        notify('success', res.message);
        //store user data here
        setUser(res.data);
        setTimeout(() => {
            navigate('/instructor');
        }, 3000)
      } else {
        notify('error', res.message || 'Unable to register account');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[80%] max-w-md border-[1px] border-gray-200 flex flex-col items-center justify-center gap-4 p-4 md:p-6 lg:p-[10px] rounded-lg shadow-sm">
      {loading && <LoadingPage />}
      <div className="flex w-full">
        <div className="flex flex-col gap-4 md:gap-[18px] w-full items-center justify-center">
          <div className="flex flex-col w-full md:w-[80%] gap-6 md:gap-[28px] items-center justify-center">
            <div className="w-full flex flex-col gap-6 md:gap-[30px]">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <IoIosArrowRoundBack className="text-2xl md:text-[24px]" />
                </Link>

                <div onClick={handleClear} className="cursor-pointer">
                  <IoCloseOutline className="text-2xl md:text-[24px]" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <img
                  alt="Edu africa logo"
                  src={LogoImg}
                  className="w-32 md:w-[175px]"
                />
              </div>

              <p className="text-xl md:text-2xl lg:text-[24px] text-text-primary font-bold text-center">
                Create Account
              </p>

              <div className="w-full flex flex-col gap-6 md:gap-[24px]">
                <div className="w-full flex flex-col gap-4 md:gap-5">
                  <div className="inputGroup">
                    <label className="label">Name*</label>
                    <input
                      type="text"
                      id="name"
                      onChange={handleChange}
                      value={formData?.name || ''}
                      placeholder="Enter your Full name"
                      className="input"
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="label">Email*</label>
                    <input
                      type="email"
                      id="email"
                      onChange={handleChange}
                      value={formData?.email || ''}
                      placeholder="Enter your email"
                      className="input"
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="label">Display Name*</label>
                    <input
                      type="text"
                      id="displayName"
                      onChange={handleChange}
                      value={formData?.displayName || ''}
                      placeholder="Enter your display name"
                      className="input"
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="label">Password*</label>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? 'password' : 'text'}
                        id="password"
                        onChange={handleChange}
                        value={formData?.password || ''}
                        placeholder="Create a passowrd"
                        className="input"
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 cursor-pointer absolute right-[8px] top-1/4 bg-white"
                      >
                        {showPassword ? 'Show' : 'Hide'}
                      </div>
                    </div>
                  </div>
                </div>

                {/**BUTTON */}
                <div
                  onClick={handleRegister}
                  className={`btn w-full text-center`}
                >
                  {loading ? 'Please Wait...' : 'Get Started'}
                </div>
              </div>
            </div>

            <div className="text-xs md:text-[12px] text-text-secondary font-medium text-center">
              Already have an account?{' '}
              <Link to="/instructor/login" className="text-primary">
                Go here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
