import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, rem, Image, Tooltip } from '@mantine/core';
import { IconHeart, IconPlus, IconCheck, IconBrandSpotifyFilled } from '@tabler/icons-react';
import { addToCollection, removeFromWishlist } from '../../store/slices/albumsSlice';
import { useTranslation } from 'react-i18next';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.albums.filter(album => album.wishlistVariant === 'filled'));
  const { i18n } = useTranslation();
  const { t } = useTranslation('wishlist');

  const handleRemoveFromWishlist = (albumId) => {
    dispatch(removeFromWishlist({ albumId }));
  };

  const handleAddToCollection = (albumId, iconVariant) => {
    dispatch(addToCollection({ albumId, iconVariant }));
  };

  const logAlbumsInfo = () => {
    console.log('Albums in wishlist array', wishlist.length);
    console.log('Albums deatils:', wishlist);
  };
  
  useEffect(() => {
    logAlbumsInfo();
  }, [wishlist]);

  return (
    <div>
      <h1>{t('wishlist-title')}</h1>
      {wishlist.length === 0 ? (
        <p>{t('wishlist-text')}</p>
      ) : (
        <div className="albums-container">
          {wishlist.map(album => (
            <div key={album.id} className="album-card">
              <Image src={album.picture} alt={album.title} />
              <div>
                <Tooltip 
                  label={album.title}
                  color="violet"
                  position="top-start" 
                  offset={0}
                  transitionProps={{ transition: 'skew-up', duration: 300 }}> 
                  <h2>{album.title}</h2>
                </Tooltip>
                <p>{album.artist}</p>
              </div>
              <a href={album.albumLink} target="_blank">Listen on Spotify <IconBrandSpotifyFilled /></a>
              <div className="buttons-container">
                <ActionIcon.Group>
                  <ActionIcon 
                    onClick={() => handleAddToCollection(album.id, album.iconVariant)} 
                    variant={album.iconVariant} 
                    size="lg" 
                    color="violet" 
                    aria-label="Add to Collection">
                    {album.iconVariant === "default" ? <IconPlus stroke={2} /> : <IconCheck stroke={2} />}
                  </ActionIcon>
                  <ActionIcon 
                    onClick={() => handleRemoveFromWishlist(album.id)} 
                    variant="filled"
                    size="lg" 
                    color="violet" 
                    aria-label="Remove from Wishlist">
                    <IconHeart style={{ width: rem(26), height: rem(26) }} stroke={2}/>
                  </ActionIcon>
                </ActionIcon.Group>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
