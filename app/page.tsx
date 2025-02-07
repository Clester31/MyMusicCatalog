export default function LandingPage() {
    return (
        <div className="h-screen flex flex-col items-center p-8 bg-gradient-to-b from-white to-gray-200">
            <div className="w-max text-center flex flex-col items-center justify-center mt-32">
                <h1 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-main_1 to-main_3 h-32">Welcome to MyMusicCatalog!</h1>
                <p className="text-2xl w-3/5">A website for music enthusiasts to create neat and customizable catalogs for music ratings and reviews</p>
            </div>
        </div>
    )
}