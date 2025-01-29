import { useEffect, useState } from "react";
import { toMinSec } from "@/app/app";
import StarRating from "../../components/search/StarRating";
import { catalog, track } from "@/app/types";

interface AddAlbumDisplayProps {
    albumTrackList: string[];
    setAddAlbumDisplay: (value: boolean) => void;
    addToCatalog: (albumRating: number, trackRatings: number[], reviewContent: string, catalogedDate: number[]) => void;
    userCatalogs: catalog[];
}

export default function AddAlbumDisplay({
    albumTrackList,
    setAddAlbumDisplay,
    addToCatalog,
    userCatalogs
}: AddAlbumDisplayProps) {
    const [albumRating, setAlbumRating] = useState<number>(0);
    const [trackRatings, setTrackRatings] = useState<track[]>(albumTrackList.map(track => ({ trackTitle: track.name, duration: track.duration, trackRating: 0 })));
    const [expandTracklist, setExpandTracklist] = useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [catalogedDate, setCatalogedDate] = useState<number[]>([1, 1, 2025]);
    const [addedCatalog, setAddedCatalog] = useState<string>();

    useEffect(() => {
        if (userCatalogs.length > 0) {
            setAddedCatalog(userCatalogs[0].cid);
        }
    }, [userCatalogs]);

    const handleAlbumRating = (rate: number) => {
        setAlbumRating(rate);
        console.log(albumRating);
    };

    const handleTrackRating = (rate: number, idx: number, trackName: string, trackDuration: number) => {
        setTrackRatings((prevRatings) => {
            const newRatings = [...prevRatings];
            newRatings[idx] = { trackTitle: trackName, duration: trackDuration, trackRating: rate };
            return newRatings;
        });
    };

    const handleSubmit = () => {
        addToCatalog(albumRating, trackRatings, reviewContent, catalogedDate, addedCatalog);
        setAddAlbumDisplay(false);
    };

    return (
        <div className="flex flex-col w-1/2 bg-white p-8 text-center text-lg gap-4 overflow-y-auto h-4/5 rounded border-2 border-gray-300">
            <p
                onClick={() => setAddAlbumDisplay(false)}
                className="flex justify-end text-xl hover:text-red-500 w-min cursor-pointer font-bold"
            >
                X
            </p>
            <div className="flex flex-col items-center bg-gray-100 rounded py-2 gap-2 border-gray-200 border-2">
                <h1 className="font-bold text-xl">Overall Rating</h1>
                <StarRating maxRating={10} size={40} onSetRating={handleAlbumRating} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded pt-2 gap-2 w-full border-gray-200 border-2">
                {albumTrackList.length > 0 ? (
                    <div className="w-full ">
                        <h1 className="text-xl font-bold mb-4">Tracklist Ratings</h1>
                        {expandTracklist ? (
                            <div className="w-full flex flex-col justify-center m-auto items-center">
                                <div className="flex flex-row justify-between w-4/5 gap-8 text-start font-semibold underline">
                                    <h1 className="text-xl flex-1">Title</h1>
                                    <h1 className="flex-1 text-xl text-center">Duration</h1>
                                    <h1 className="flex-1 flex justify-end">Rating</h1>
                                </div>
                                <div className="w-4/5">
                                    {albumTrackList.map((track: string, idx: number) => {
                                        return (
                                            <div
                                                key={idx}
                                                className="flex flex-row justify-between gap-8 text-start my-2"
                                            >
                                                <h1 className="text-xl flex-1 truncate">{track.name}</h1>
                                                <p className="flex-1 text-xl text-center">
                                                    {toMinSec(track.duration)}
                                                </p>
                                                <div className="flex-1 flex justify-end">
                                                    <StarRating
                                                        maxRating={10}
                                                        size={20}
                                                        onSetRating={(rate: number) =>
                                                            handleTrackRating(rate, idx, track.name, track.duration)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="w-full bg-gray-200 hover:bg-gray-300 transition 250 ease-in-out">
                                    <button
                                        className="px-8 w-full"
                                        onClick={() => setExpandTracklist(false)}
                                    >
                                        hide
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-gray-200 hover:bg-gray-300 transition 250 ease-in-out">
                                <button
                                    className="px-8 w-full"
                                    onClick={() => setExpandTracklist(true)}
                                >
                                    expand
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <h1>No Tracklist Available</h1>
                )}
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded py-2 gap-2 border-gray-200 border-2">
                <h1 className="font-bold text-xl">Review (max: 300)</h1>
                <textarea
                    className="p-2 resize-none border-gray-200 border-2 w-4/5 h-max"
                    rows={7}
                    maxLength={300}
                    onChange={(e) => setReviewContent(e.target.value)}
                />
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded py-2 gap-2 border-gray-200 border-2">
                <h1 className="font-bold text-xl">Date Listened</h1>
                <div className="flex flex-row w-1/2 justify-center items-center gap-4 text-xl">
                    <select
                        className="w-1/3 border-gray-200 border-2 text-center py-2"
                        defaultValue={new Date().toLocaleString("default", {
                            month: "long",
                        })}
                        onChange={(e) => {
                            const monthIndex = new Date(Date.parse(e.target.value + " 1, 2023")).getMonth() + 1;
                            setCatalogedDate((prevDate) => [monthIndex, prevDate[1], prevDate[2]]);
                        }}
                    >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                    <input
                        className="w-1/3 border-gray-200 border-2 text-center py-2"
                        type="number"
                        name="date-day"
                        id="date-day"
                        max={31}
                        min={1}
                        defaultValue={new Date().getDate()}
                        onChange={(e) => setCatalogedDate((prevDate) => [prevDate[0], parseInt(e.target.value), prevDate[2]])}
                    />
                    <input
                        className="w-1/3 border-gray-200 border-2 text-center py-2"
                        type="number"
                        name="date-year"
                        id="date-year"
                        max={new Date().getFullYear()}
                        defaultValue={new Date().getFullYear()}
                        onChange={(e) => setCatalogedDate((prevDate) => [prevDate[0], prevDate[1], parseInt(e.target.value)])}
                    />
                </div>
            </div>
            {
                <div className="flex flex-col items-center bg-gray-100 rounded py-2 gap-4 border-gray-200 border-2">
                    <h1 className="font-bold text-xl">Select a catalog to add to</h1>
                    <select className="w-32 text-center text-xl py-2 rounded border-2 border-gray-300" onChange={(e) => setAddedCatalog(e.target.value)}>
                        {
                            userCatalogs &&
                            userCatalogs.map((catalog, idx) => {
                                return (
                                    <option key={idx} value={catalog.cid}>{catalog.catalogTitle}</option>
                                )
                            })
                        }
                    </select>
                    <button
                        disabled={albumRating === 0}
                        className="disabled:bg-blue-500/25 text-xl bg-main_1 w-1/3 px-4 py-2 m-auto text-white rounded hover:bg-main_3 transition 250 ease-in-out"
                        onClick={handleSubmit}
                    >
                        Add to catalog
                    </button>
                </div>
            }

        </div>
    );
}