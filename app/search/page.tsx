"use client"

import { useState } from "react"
import { getAlbum, getArtistCatalog } from "../app";
import SearchedAlbum from "../components/search/SearchedAlbum";
import AddAlbumDisplay from "../components/search/AddAlbumDisplay";
import { useAuth } from "../lib/AuthContext";

export default function SearchPage() {
    const { user } = useAuth();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchMode, setSearchMode] = useState<string>('artist');
    const [searchData, setSearchData] = useState<object[]>([]);
    const [albumTrackList, setAlbumTrackList] = useState<string[]>([]);
    const [albumGenreTags, setAlbumGenreTags] = useState<string[]>([]);
    const [addAlbumDisplay, setAddAlbumDisplay] = useState<boolean>(false);

    const updateSearchPage = async () => {
        let fetchedSearchData;
        if (searchMode === 'artist') {
            fetchedSearchData = await getArtistCatalog(searchTerm);
        } else {
            fetchedSearchData = await getAlbum(searchTerm);
        }
        setSearchData(fetchedSearchData);
    }

    const addToCatalog = (albumRating: number, trackRatings: number[], reviewContent: string, catalogedDate: number[]) => {
        
    }

    return (
        <div className="flex flex-col h-screen">
            {
                addAlbumDisplay &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <AddAlbumDisplay albumTrackList={albumTrackList} setAddAlbumDisplay={setAddAlbumDisplay} addToCatalog={addToCatalog} />
                </div>
                
            }
            <div className="flex flex-col items-center justify-center gap-4 mt-8">
                <input
                    type="text"
                    placeholder={`search for an ${searchMode === 'artist' ? 'artist' : 'album'}`}
                    name="search-bar"
                    id="search-bar"
                    className="border-main_2 focus:border-main_1 transition 250 ease-in-out border-2 rounded-3xl px-4 py-2 text-black w-1/3 text-2xl text-center"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                            await updateSearchPage();
                        }
                    }}
                />
                <div>
                    <button
                        className={`${searchMode === 'artist' ? 'bg-main_3' : 'bg-main_1'} transition 500 ease-in-out w-32 px-8 py-2 text-xl text-white rounded-l-3xl`}
                        onClick={() => {
                            setSearchMode('artist')
                            setSearchData([]);
                            setSearchTerm('');
                        }}
                    >
                        Artist
                    </button>
                    <button
                        className={`${searchMode === 'artist' ? 'bg-main_1' : 'bg-main_3'} transition 500 ease-in-out w-32 px-8 py-2 text-xl text-white rounded-r-3xl`}
                        onClick={() => {
                            setSearchMode('album')
                            setSearchData([]);
                            setSearchTerm('');
                        }}
                    >
                        Album
                    </button>
                </div>
            </div>
            {searchData === undefined ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-2xl">Loading...</p>
                </div>
            ) : searchData.length > 0 ? (
                <div className="grid grid-cols-6 p-8 gap-8">
                    {
                        searchData.map((album: any, index: number) => (
                            <SearchedAlbum key={index} album={album} index={index} setAlbumTrackList={setAlbumTrackList} setAddAlbumDisplay={setAddAlbumDisplay} searchMode={searchMode} />
                        ))
                    }
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <p className="text-2xl">No Results Found</p>
                </div>
            )}
        </div>
    )
}