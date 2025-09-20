import { useEffect, useState } from "react";
import axios from 'axios'
import { notify } from "../Utils/toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

//get courses categories
export function useFetchCategories(){
    const [ data, setData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const { data, status} = await axios.get(`/category`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                const errorMsg = error.response.data.data
                notify('error', errorMsg || 'Request Failed')
                setData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchCategoryData()
    }, [])

    return data
}

//get courses
export function useFetchCourse(selectedCategory) {
  const [data, setData] = useState({
    isFetching: true,
    data: null,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isFetching: true })); // show loader on category change
      try {
        const endpoint =
          selectedCategory === "all" || !selectedCategory
            ? "/course"
            : `/course?search=${encodeURIComponent(selectedCategory)}`;

        const { data: responseData, status } = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (status === 200) {
          setData({
            isFetching: false,
            data: responseData,
            status: status,
            serverError: null,
          });
        } else {
          setData({
            isFetching: false,
            data: null,
            status: status,
            serverError: null,
          });
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.data;
        notify("error", errorMsg || "Request Failed");
        setData({
          isFetching: false,
          data: null,
          status: null,
          serverError: error,
        });
      }
    };

    fetchData();
  }, [selectedCategory]); // ✅ refetch when selectedCategory changes

  return data;
}

//get a single course course
export function useFetchCourseDetail(courseId){
    if(!courseId) return notify('error', 'Course Id is required')
    const [ data, setData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const { data, status} = await axios.get(`/course/${courseId}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                const errorMsg = error.response.data.data
                notify('error', errorMsg || 'Request Failed')
                setData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchCategoryData()
    }, [])

    return data
}

//get student courses
export function useFetchStudentCourse(selectedCategory) {
  const [data, setData] = useState({
    isFetching: true,
    data: null,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isFetching: true })); // show loader on category change
      try {
        const endpoint =
          selectedCategory === "all" || !selectedCategory
            ? "/course/student/course"
            : `/course/student/course?search=${encodeURIComponent(selectedCategory)}`;

        const { data: responseData, status } = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (status === 200) {
          setData({
            isFetching: false,
            data: responseData,
            status: status,
            serverError: null,
          });
        } else {
          setData({
            isFetching: false,
            data: null,
            status: status,
            serverError: null,
          });
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.data;
        notify("error", errorMsg || "Request Failed");
        setData({
          isFetching: false,
          data: null,
          status: null,
          serverError: error,
        });
      }
    };

    fetchData();
  }, [selectedCategory]); // ✅ refetch when selectedCategory changes

  return data;
}

//get student courses
export function useFetchInstructorCourse(selectedCategory) {
  const [data, setData] = useState({
    isFetching: true,
    data: null,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isFetching: true })); // show loader on category change
      try {
        const endpoint =
          selectedCategory === "all" || !selectedCategory
            ? "/course/instructor/course"
            : `/course/instructor/course?search=${encodeURIComponent(selectedCategory)}`;

        const { data: responseData, status } = await axios.get(endpoint, {
          withCredentials: true,
        });

        if (status === 200) {
          setData({
            isFetching: false,
            data: responseData,
            status: status,
            serverError: null,
          });
        } else {
          setData({
            isFetching: false,
            data: null,
            status: status,
            serverError: null,
          });
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.data;
        notify("error", errorMsg || "Request Failed");
        setData({
          isFetching: false,
          data: null,
          status: null,
          serverError: error,
        });
      }
    };

    fetchData();
  }, [selectedCategory]); // ✅ refetch when selectedCategory changes

  return data;
}

//get stellar wallet balance
export function useFetchWalletBalance(){
    const [ data, setData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status} = await axios.get(`/stellar/balance`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                const errorMsg = error.response.data.data
                notify('error', errorMsg || 'Request Failed')
                setData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchData()
    }, [])

    return data
}

//get stellar transaction hsitroy
export function useFetchWalletStellarTransactionHistroy(){
    const [ data, setData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status} = await axios.get(`/stellar/paymentHistroy`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                const errorMsg = error.response.data.data
                notify('error', errorMsg || 'Request Failed')
                setData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchData()
    }, [])

    return data
}

//get user notification histroy
export function useFetchNotification(){
    const [ data, setData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status} = await axios.get(`/user/notification`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                const errorMsg = error.response.data.data
                notify('error', errorMsg || 'Request Failed')
                setData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchData()
    }, [])

    return data
}
