/* eslint-disable @next/next/no-img-element */
import { catalogItem, user } from "@/app/types";
import StarRating from "../search/StarRating";
import { useState } from "react";
import { deleteAlbumFromCatalog, updateCatalogAlbumRating, updateCatalogTrackRating } from "@/app/auth";

export default function CatalogEntry({ cid, item, editPermissions, user }: { cid: string, item: catalogItem, editPermissions: boolean, user: user }) {
    const [editRating, setEditRating] = useState<boolean>(false);
    const [editTrackRating, setEditTrackRating] = useState<number | null>(null);
    const [newAlbumRating, setNewAlbumRating] = useState<number | null>(1);
    const [newTrackRating, setNewTrackRating] = useState<number | null>(1);

    const updateAlbumRating = () => {
        setEditRating(false);
        if (newAlbumRating !== null) {
            updateCatalogAlbumRating(user.uid, cid, item.iid, newAlbumRating);
        }
    }

    const updateTrackRating = (index: number) => {
        setEditTrackRating(null);
        console.log(newTrackRating);
        if (newTrackRating !== null) {
            updateCatalogTrackRating(user.uid, cid, item.iid, index, newTrackRating);
        }
    }

    return (
        <div className="bg-white flex flex-row w-52 h-76 p-4 rounded border-2 border-gray-300 relative group hover:w-1/4 transition-all duration-250 ease-in-out text-white hover:text-black shadow-md">
            <div className="flex-shrink-0">
                <div className="flex flex-col"></div>
                <h1 className="text-black font-semibold h-12 w-6/6" style={{ maxWidth: '160px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={item.itemTitle}>{item.itemTitle}</h1>
                <h1 className="flex text-black italic w-6/6 text-md truncate" style={{ maxWidth: '160px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.itemArtist}</h1>
                <img className="w-44 rounded shadow-md" alt="cover art" src={item.itemCoverArt}></img>
                <div className="flex flex-row items-center text-3xl gap-2 mt-4 justify-between">
                    <div className="flex flex-row">
                        <StarRating
                            defaultRating={item.itemRating}
                            maxRating={1}
                            onSetRating={() => { }}
                        />
                        <h1 className="font-bold text-main_1">{item.itemRating}</h1>
                    </div>
                    <div>
                        {
                            editPermissions &&
                            <div className="flex flex-row">
                                {
                                    !editRating &&
                                    <button
                                        className="text-black bg-red-200 hover:bg-main_1 hover:text-white transition 250 ease-in-out rounded p-2 rounded-md h-8 flex items-center ml-2"
                                        onClick={() => deleteAlbumFromCatalog(user.uid, cid, item.iid)}
                                    >
                                        <i className="fa-solid fa-trash w-4 text-sm"></i>
                                    </button>
                                }
                                <button
                                    className="text-black bg-gray-200 hover:bg-main_1 hover:text-white transition 250 ease-in-out rounded p-2 rounded-md h-8 flex items-center ml-2"
                                    onClick={() => setEditRating(!editRating)}
                                >
                                    <i className="fa-solid fa-pencil text-sm"></i>
                                </button>
                            </div>
                        }
                    </div>
                    {
                        editRating &&
                        <div className="absolute flex flex-row gap-2">
                            <input type="number" min={1} max={10} className="border-2 border-gray-300 rounded w-16 text-black text-lg text-center" placeholder="1-10" onChange={(e) => setNewAlbumRating(Number(e.target.value))} />
                            <button className="bg-main_1 px-2 rounded" onClick={updateAlbumRating}><i className="fa-solid fa-check text-white"></i></button>
                        </div>
                    }
                </div>
            </div>
            <div className="top-0 left-full w-0 h-64 bg-white overflow-hidden transition-all duration-300 group-hover:w-full px-4 group-hover:block hidden overflow-y-auto">
                <p className="group-hover:block hidden">{item.itemReview}</p>
                <div className="mt-4 overflow-y-auto text-lg group-hover:block hidden">
                    {
                        item.itemTracks.length > 0 ?
                            item.itemTracks.map((track, index) => (
                                <div key={index} className="flex justify-between items-center mb-2 bg-gray-100 px-2 py-2">
                                    <h1 className="w-5/6">{track.trackTitle}</h1>
                                    {editTrackRating !== index && (
                                        <h1 className="font-bold text-main_1 w-1/6 text-end">{track.trackRating === 0 ? '-' : track.trackRating}</h1>
                                    )}
                                    {
                                        editTrackRating === index &&
                                        <div className="flex flex-row gap-2">
                                            <button className="bg-main_1 px-2 rounded" onClick={() => updateTrackRating(index)}><i className="fa-solid fa-check text-white"></i></button>
                                            <input type="number" min={1} max={10} className="border-2 border-gray-300 rounded w-16 text-black text-lg text-center" placeholder="1-10" onChange={(e) => setNewTrackRating(Number(e.target.value))} />
                                        </div>
                                    }
                                    {
                                        editPermissions &&
                                        <button
                                            className="bg-white hover:bg-main_1 hover:text-white transition 250 ease-in-out rounded p-2 rounded-md h-8 flex items-center ml-2"
                                            onClick={() => setEditTrackRating(editTrackRating === index ? null : index)}
                                        >
                                            <i className="fa-solid fa-pencil text-sm"></i>
                                        </button>
                                    }
                                </div>
                            ))
                            :
                            <h1 className="flex justify-between items-center mb-2 bg-gray-100 px-2 py-2">No Tracklist Available</h1>
                    }
                </div>
            </div>
            {
                <div className="absolute bottom-0 right-0 py-4 px-8 text-xl group-hover:block hidden transition 250 ease-in-out">
                    <h1>{item.itemDate[0]}-{item.itemDate[1]}-{item.itemDate[2]}</h1>
                </div>
            }
        </div>
    )
}
