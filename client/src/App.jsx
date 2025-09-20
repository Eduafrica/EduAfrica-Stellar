import { BrowserRouter, Route, Routes } from "react-router"
import StudentGetStarted from "./Pages/Student/StudentGetStarted"
import StudentRegister from "./Pages/Student/StudentRegister"
import StudentLogin from "./Pages/Student/StudentLogin"
import { ToastContainer } from "react-toastify"
import Home from "./Pages/Home"
import Courses from "./Pages/Courses"
import { useEffect, useState } from "react"
import CourseInfoScreen from "./Component/Helpers/CourseInfoScreen"
import MyCourses from "./Pages/Student/MyCourses"
import Wallet from "./Pages/Wallet"
import Notification from "./Pages/Notification"
import InstructorHome from "./Pages/Instructor/InstructorHome"
import InstructorLogin from "./Pages/Instructor/InstructorLogin"
import InstructorRegister from "./Pages/Instructor/InstructorRegister"
import InstructorCourses from "./Pages/Instructor/InstructorCourses"
import NewCourse from "./Pages/Instructor/NewCourse"

function App() {
  //selected coursejkjkj
  const [ selectedCourse, setSelectedCourse ] = useState('')

  useEffect(() => {
    if(selectedCourse){
        console.log('objectooo', selectedCourse)
    }
  }, [selectedCourse])
  
  return (
      <div className="app">
        {
            selectedCourse && <CourseInfoScreen selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
        }
        <ToastContainer position='top-right' />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home setSelectedCourse={setSelectedCourse} />} />
                <Route path="/courses" element={<Courses setSelectedCourse={setSelectedCourse} />} />
                <Route path="/student" element={<StudentGetStarted />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/my-courses" element={<MyCourses setSelectedCourse={setSelectedCourse} />} />
                <Route path="/wallet" element={<Wallet setSelectedCourse={setSelectedCourse} />} />
                <Route path="/notifications" element={<Notification setSelectedCourse={setSelectedCourse} />} />

                <Route path="/instructor" element={<InstructorHome setSelectedCourse={setSelectedCourse} />} />
                <Route path="/instructor/register" element={<InstructorRegister setSelectedCourse={setSelectedCourse} />} />
                <Route path="/instructor/login" element={<InstructorLogin setSelectedCourse={setSelectedCourse} />} />
                <Route path="/instructor-courses" element={<InstructorCourses setSelectedCourse={setSelectedCourse} />} />
                
                <Route path="/new-course" element={<NewCourse setSelectedCourse={setSelectedCourse} />} />

            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
