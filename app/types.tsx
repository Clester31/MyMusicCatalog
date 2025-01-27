export type user = {
    uid: string;
    username: string;
    email: string;
    profilePicture: string;
    catalogs: catalog[];
    lists: [];
}

export type catalog = {
    cid: string;
    catalogItems: catalogItem[];
    catalogTitle: string;
    catalogDescription: string;
    catalogImage: string;
}

export type catalogItem = {
    iid: string;
    itemCoverArt: string;
    itemTitle: string;
    itemArtist: string;
    itemTracks: track[];
    itemReview: string;
    itemRating: number;
}

export type track = {
    tid: string;
    trackTitle: string;
    trackDuration: string;
    trackRating: number;
}