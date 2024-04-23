import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, rem } from '@mantine/core';
import { IconHeart, IconPlus, IconCheck } from '@tabler/icons-react';
import { removeFromWishlist, addToCollection } from '../../store/slices/albumsSlice';
import './WishlistPage.scss';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistAlbums = useSelector(state => state.albums.filter(album => album.wishlistVariant === "filled"));

  return (
    <div className='wishlist-content'>
      <h1>Wishlist</h1>
      <div className="wishlist-container">
        {wishlistAlbums.map(album => (
          <div key={album.id} className="wishlist-card">
            <img src={album.picture} alt={album.title} />
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <a href={album.albumLink} target="_blank">Listen on Spotify</a>
            <div className="buttons-container">
              <ActionIcon.Group>
                <ActionIcon onClick={() => dispatch(removeFromWishlist(album.id))} variant="filled" color="violet" size="lg" aria-label="Remove from Wishlist">
                  <IconHeart style={{ width: rem(26), height: rem(26) }} stroke={2}/>
                </ActionIcon>

                <ActionIcon onClick={() => dispatch(addToCollection({ albumId: album.id, iconVariant: album.iconVariant }))} variant={album.iconVariant} size="lg" color="violet" aria-label="Add to Collection">
                  {album.iconVariant === "default" ? <IconPlus stroke={2} /> : <IconCheck stroke={2} />}
                </ActionIcon>
              </ActionIcon.Group>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
