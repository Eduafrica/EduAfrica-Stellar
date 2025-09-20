
function LoadingPage({ text }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-[#a59b9b39] z-[999]">
      {/* CARD */}
      <div className="w-[145px] h-[116px] bg-white rounded-[4px] flex flex-col items-center justify-center gap-4">
        
        {/* LOADER */}
        <div className="w-10 h-10 border-4 border-[#00BF63] border-t-transparent rounded-full animate-spin"></div>

        <p className="text-black-700 font-normal text-[16px]">
          {text || "Processing"}
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
