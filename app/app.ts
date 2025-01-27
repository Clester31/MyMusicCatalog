const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function getArtistCatalog(artist: string) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json`
    try {
        const response = await fetch(url);
        const data = await response.json();
        const albums = data.topalbums.album;
        //console.log(albums)
        return albums;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
} 

export async function getAlbum(album: string) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${API_KEY}&format=json`
    try {
        const response = await fetch(url);
        const data = await response.json();
        const albums = data.results.albummatches ? data.results.albummatches.album : [];
        //console.log(albums);
        return albums;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

export async function getAlbumInfo(album: string, artist: string) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data.album)
        return data.album;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

export function toMinSec(duration: number) {
    let minutes = `${Math.floor(duration/60)}`;
    let seconds = `${duration - (minutes * 60)}`;
    if(Number(seconds) < 10) {
        seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`;
}