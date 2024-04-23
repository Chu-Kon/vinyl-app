import { createSlice } from '@reduxjs/toolkit';

const albumsSlice = createSlice({
  name: 'albums',
  initialState: [],
  reducers: {
    setAlbums: (state, action) => {
      return action.payload.map(album => ({
        ...album,
        iconVariant: 'default',
        wishlistVariant: 'default',
      }));
    },
    addToCollection: (state, action) => {
      const { albumId, iconVariant } = action.payload;
      return state.map(album => {
        if (album.id === albumId) {
          const newIconVariant = album.iconVariant === "default" ? "filled" : "default";
          const action = album.iconVariant === "default" ? "Added" : "Removed";
          console.log(`${action} album with id ${albumId} to/from collection`);
          return { ...album, iconVariant: newIconVariant };
        }
        return album;
      });
    },
    addToWishlist: (state, action) => {
      const { albumId, wishlistVariant } = action.payload;
      return state.map(album => {
        if (album.id === albumId) {
          const newWishlistVariant = album.wishlistVariant === "default" ? "filled" : "default";
          const action = album.wishlistVariant === "default" ? "Added" : "Removed";
          console.log(`${action} album with id ${albumId} to/from wishlist`);
          return { ...album, wishlistVariant: newWishlistVariant };
        }
        return album;
      });
    },
    // removeFromWishlist: (state, action) => {
    //   const { albumId } = action.payload;
    //   return state.map(album => {
    //     if (album.id === albumId) {
    //       console.log(`Removed album with id ${albumId} from wishlist`);
    //       return { ...album, wishlistVariant: 'default' };
    //     }
    //     return album;
    //   });
    // },
    // removeFromCollection: (state, action) => {
    //   const { albumId } = action.payload;
    //   return state.map(album => {
    //     if (album.id === albumId) {
    //       console.log(`Removed album with id ${albumId} from collection`);
    //       return { ...album, iconVariant: 'default' };
    //     }
    //     return album;
    //   });
    // },
  },
});

export const { setAlbums, addToCollection, addToWishlist, removeFromWishlist, removeFromCollection } = albumsSlice.actions;
export default albumsSlice.reducer;
