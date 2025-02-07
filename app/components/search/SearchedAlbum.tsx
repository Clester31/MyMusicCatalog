import { getAlbumInfo } from "@/app/app";

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
    searchMode: string;
    setOtherAlbumInfo: ({title, artist, coverArt}: {title: string, artist: string, coverArt: string}) => void;
}

export default function SearchedAlbum({ album, index, setAlbumTrackList, setAddAlbumDisplay, searchMode, setOtherAlbumInfo }: SearchedAlbumProps) {
    const displayAlbumInfo = async () => {
        const albumInfo = await getAlbumInfo(album.name, (searchMode === 'artist' ? album.artist.name : album.artist));
        setAlbumTrackList(albumInfo.tracks?.track || []);
        setOtherAlbumInfo({
            title: albumInfo.name,
            artist: albumInfo.artist,
            coverArt: albumInfo.image[2]['#text'] || './no-image.png'
        })
        console.log(albumInfo);
        setAddAlbumDisplay(true);
    }

    return (
        <div key={index} className="flex flex-col hover:scale-105 transition 250 ease-in-out cursor-pointer bg-gray-100 border-2 border-gray-300 p-2 shadow-lg rounded gap-1 hover:bg-gray-200 transition 250 ease-in-out" onClick={displayAlbumInfo}>
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
                className="rounded w-64 flex m-auto mt-2 shadow-md"
            />
        </div>
    )
}