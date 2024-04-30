import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  collection: [],
  wishlist: []
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {

    setAlbums: (state, action) => {
      state.albums = action.payload.map(album => ({
        ...album,
        iconVariant: album.collectionVariant === 'filled' ? 'filled' : 'default',
        wishlistVariant: album.wishlistVariant === 'filled' ? 'filled' : 'default',
      }));
    },

    addToCollection: (state, action) => {
      const { albumId } = action.payload;
      const albumIndex = state.albums.findIndex(album => album.id === albumId);
      if (albumIndex !== -1) {
        const album = state.albums[albumIndex];
        const isInCollection = state.collection.some(item => item.id === albumId);
        if (!isInCollection) {
          state.albums[albumIndex].iconVariant = 'filled';
          state.collection.push(album);
          console.log(`Added album with id ${albumId} to collection`);
        }
      }
    },
    
    removeFromCollection: (state, action) => {
      const { albumId } = action.payload;
      const albumIndex = state.collection.findIndex(album => album.id === albumId);
      if (albumIndex !== -1) {
        const album = state.collection[albumIndex];
        state.albums.find(item => item.id === albumId).iconVariant = 'default';
        state.collection.splice(albumIndex, 1);
        console.log(`Removed album with id ${albumId} from collection`);
      }
    },    
    
    addToWishlist: (state, action) => {
      const { albumId } = action.payload;
      const albumIndex = state.albums.findIndex(album => album.id === albumId);
      
      if (albumIndex !== -1) {
        const isInWishlist = state.wishlist.some(item => item.id === albumId);
        if (!isInWishlist) {
          state.albums[albumIndex].wishlistVariant = 'filled';
          state.wishlist.push(state.albums[albumIndex]);
          console.log(`Added album with id ${albumId} to wishlist`);
        }
      }
    },
    
    removeFromWishlist: (state, action) => {
      const { albumId } = action.payload;
      const albumIndex = state.wishlist.findIndex(album => album.id === albumId);
      if (albumIndex !== -1) {
        state.albums.find(album => album.id === albumId).wishlistVariant = 'default';
        state.wishlist.splice(albumIndex, 1);
        console.log(`Removed album with id ${albumId} from wishlist`);
      }
    },
    
  },
});

export const { setAlbums, addToCollection, addToWishlist, removeFromWishlist, removeFromCollection } = albumsSlice.actions;
export default albumsSlice.reducer;