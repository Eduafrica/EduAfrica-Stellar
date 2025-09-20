import Footer from '../Component/Footer'
import Navbar from '../Component/Navbar'

function PageLayout({ children }) {
  return (
    <div className='w-full min-h-screen relative flex flex-col'>
        {/**NAVBAR */}
        <div className="w-full h-[92px]">
            <Navbar />
        </div>

        <div className="">{children}</div>

        <div className="mt-auto">
            <Footer />
        </div>
    </div>
  )
}

export default PageLayout
