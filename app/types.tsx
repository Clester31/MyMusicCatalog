export type user = {
    uid: string;
    username: string;
    email: string;
    profilePicture: string;
    catalogs: string[];
    lists: [];
}

export type catalog = {
    cid: string;
    catalogCreatedBy: string
    catalogCreatedOn: string;
    catalogItems: catalogItem[];
    catalogTitle: string;
    catalogDescription: string;
    catalogImage: string;
    catalogDefaultColors: string[];
}

export type catalogItem = {
    iid: string;
    itemCoverArt: string;
    itemTitle: string;
    itemArtist: string;
    itemTracks: track[];
    itemReview: string;
    itemRating: number;
    itemDate: number[];
}

export type track = {
    trackTitle: string;
    trackDuration: string;
    trackRating: number;
}

export type album = {
    name: string;
    artist: string;
    image: { '#text': string }[];
}