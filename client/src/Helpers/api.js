import axios from "axios"


axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

/**MEDIA UPLOAD */
// Upload a file to server using multipart upload
export async function uploadCourseImage(file) {
  try {
    // Step 1: Initiate upload
    const initRes = await axios.post("/upload/initiateUpload", {
      fileName: file.name,
    })

    const uploadId = initRes.data.uploadId
    if (!uploadId) throw new Error("Failed to initiate upload")

    // Step 2: Upload chunks (5MB per chunk)
    const chunkSize = 5 * 1024 * 1024
    const totalChunks = Math.ceil(file.size / chunkSize)

    for (let index = 0; index < totalChunks; index++) {
      const start = index * chunkSize
      const end = Math.min(file.size, start + chunkSize)
      const chunk = file.slice(start, end)

      const formData = new FormData()
      formData.append("file", chunk)
      formData.append("index", index)
      formData.append("fileName", file.name)

      await axios.post(`/upload/uploadFile?uploadId=${uploadId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    }

    // Step 3: Complete upload
    const completeRes = await axios.post(
      `/upload/completeUpload?uploadId=${uploadId}&fileName=${file.name}`
    )

    return completeRes.data // contains { success, message, data: fileUrl }
  } catch (error) {
    console.error("Upload failed:", error)
    return { success: false, message: error.message }
  }
}

/** STUDENT **/
//student register
export async function studentRegister(formData){
    try {
        const res = await axios.post('/student/register', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to register user'}
        return res
    }
}

//student login
export async function studentLogin(formData){
    try {
        const res = await axios.post('/student/login', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to login user'}
        return res
    }
}

//student signout
export async function signout(){
    try {
        const res = await axios.post('/student/signout', {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to logout user '}
        return res
    }
}


/** INSTRUCTOR **/
//instructor register
export async function instructorRegister(formData){
    try {
        const res = await axios.post('/instructor/register', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to register user'}
        return res
    }
}

//instructor login
export async function instructorLogin(formData){
    try {
        const res = await axios.post('/instructor/login', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to login user'}
        return res
    }
}

//instructor create a new course
export async function newCourse(formData){
    try {
        const res = await axios.post('/course/', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to create a new course'}
        return res
    }
}

/**GENERAL */
//fund stellar wallet
export async function fundStellarWallet(formData){
    try {
        const res = await axios.post('/stellar/fund', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to fund user wallet '}
        return res
    }
}

//pay for course with xlm
export async function coursePayment(formData){
    try {
        const res = await axios.post('/stellar/pay', formData, {withCredentials: true})
        if(res.data){
            return res.data
        }
    } catch (error) {
        const res = error.response.data || { message: 'Unable to pay for course from user wallet '}
        return res
    }
}