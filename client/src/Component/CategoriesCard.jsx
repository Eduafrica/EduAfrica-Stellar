import { useFetchCategories } from "../Helpers/fetch"

function CategoriesCard() {
  const { data, isFetching } = useFetchCategories() 
  const categories = data?.data?.categories.slice(0, 15) || []

  return (
    <div className="flex flex-col gap-[30px]">
        <h1 className="text-gray-900 text-[36px] font-semibold w-full text-start">Categories</h1>

        <div className="flex flex-wrap gap-[15px]">
            {
                categories?.map((i, idx) => (
                    <div key={idx} className="btn2 rounded-[32px] text-[14px] font-normal px-4 py-2 whitespace-nowrap">{i.name}</div>
                ))
            }
        </div>
    </div>
  )
}

export default CategoriesCard
