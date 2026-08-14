import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const songService = {
    getSongs: () => API.get("/get_songs"),

    getLikedSongs: () => API.get("/get_favorite_songs"),

    getSongById: (songId) =>
        API.get(`/search_by_id/${songId}`),

    searchSongByTitle: (title) =>
        API.get(`/search_by_title/${encodeURIComponent(title)}`),

    updateSong: (songId, data) =>
        API.put(`/update_songs_data/${songId}`, data),

    deleteSong: (songId) =>
        API.delete(`/remove_song/${songId}`),

    getPlaylists: () =>
        API.get("/show_playlists"),

    createPlaylist: (name) =>
        API.post(`/create_playlist/${encodeURIComponent(name)}`),

    deletePlaylist: (playlistId) =>
        API.delete(`/remove_playlist/${playlistId}`),

    addSongToPlaylist: (playlistId, songId) =>
        API.post(`/playlists/${playlistId}/songs/${songId}`),

    getPlaylistSongs: (playlistId) =>
        API.get(`/playlist_songs/${playlistId}`),

    removeSongFromPlaylist: (playlistId, songId) =>
        API.delete(`/remove_song_from_playlists/${playlistId}/songs/${songId}`),
};