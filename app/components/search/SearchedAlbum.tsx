import { getAlbumInfo } from "@/app/app";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */


interface Album {
    name: string;
    artist: string;
    image: { '#text': string }[];
}

interface SearchedAlbumProps {
    album: Album;
    index: number;
    setAlbumTrackList: () => void;
    setAddAlbumDisplay: (display: boolean) => void;
    searchMode: string
}

export default function SearchedAlbum({ album, index, setAlbumTrackList, setAddAlbumDisplay, searchMode }: SearchedAlbumProps) {
    const displayAlbumInfo = async () => {
        const albumInfo = await getAlbumInfo(album.name, (searchMode === 'artist' ? album.artist.name : album.artist));
        setAlbumTrackList(albumInfo.tracks?.track || []);
        console.log(albumInfo);
        setAddAlbumDisplay(true);
    }

    return (
        <div key={index} className="flex flex-col hover:scale-105 transition 250 ease-in-out cursor-pointer bg-gray-100 p-2 rounded gap-1 hover:bg-gray-200 transition 250 ease-in-out" onClick={displayAlbumInfo}>
            <h1 className="font-semibold text-lg truncate">{album.name}</h1>
            {
                searchMode === 'artist' ?
                <p className="truncate text-lg">{album.artist.name}</p>
                :
                <p className="truncate text-lg">{album.artist}</p>    
            }
            <img
                src={album.image[2]['#text'] || '/no-image.png'}
                alt={album.name}
                className="rounded w-64"
            />
        </div>
    )
}