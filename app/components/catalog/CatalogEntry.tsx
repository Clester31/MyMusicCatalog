/* eslint-disable @next/next/no-img-element */
import { catalogItem } from "@/app/types";
import StarRating from "../search/StarRating";

export default function CatalogEntry({ item }: { item: catalogItem }) {
    return (
        <div className="bg-white flex flex-row w-48 h-72 p-4 rounded border-2 border-gray-300 relative group hover:w-1/4 transition-all duration-250 ease-in-out text-white hover:text-black shadow-md">
            <div className="flex-shrink-0">
                <div className="flex flex-col"></div>
                <h1 className="text-black font-semibold truncate">{item.itemTitle}</h1>
                <h1 className="flex text-black italic truncate overflow:hidden">{item.itemArtist}</h1>
                <img className="w-40 rounded shadow-md" alt="cover art" src={item.itemCoverArt}></img>
                <div className="flex flex-row items-center text-3xl gap-2 mt-2">
                    <StarRating
                        defaultRating={item.itemRating}
                        maxRating={1}
                        onSetRating={() => { }}
                    />
                    <h1 className="font-bold text-main_1">{item.itemRating}</h1>
                </div>
            </div>
            <div className="top-0 left-full w-0 h-64 bg-white overflow-hidden transition-all duration-300 group-hover:w-full px-4 group-hover:block hidden overflow-y-auto">
                <p>{item.itemReview}</p>
                <div className="mt-4 overflow-y-auto text-lg">
                    {
                        item.itemTracks.length > 0 ?
                        item.itemTracks.map((track, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 bg-gray-100 px-2 py-2">
                                <h1 className="w-5/6">{track.trackTitle}</h1>
                                <h1 className="font-bold text-main_1 w-1/6 text-end">{track.trackRating === 0 ? '-' : track.trackRating}</h1>
                            </div>
                        ))
                        :
                        <h1 className="flex justify-between items-center mb-2 bg-gray-100 px-2 py-2">No Tracklist Available</h1>
                    }
                </div>
            </div>
        </div>
    )
}