export default function CatalogInfo({ text, icon }: { text: string, icon: string }) {
    return (
        <div className='w-64 h-64 p-4 flex flex-col shadow-lg justify-around items-center bg-gray-100 border-2 border-gray-200 rounded-3xl hover:bg-gray-200 transition 250 ease-in-out cursor-pointer'>
            <h1>{text}</h1>
            <i className={`fa-solid fa-${icon} text-5xl text-main_1`}></i>
        </div>
    )
}