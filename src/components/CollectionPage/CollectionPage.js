import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, rem } from '@mantine/core';
import { IconPlus, IconCheck } from '@tabler/icons-react';
import { removeFromCollection } from '../../store/slices/albumsSlice';
import './CollectionPage.scss';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collectionAlbums = useSelector(state => state.albums.filter(album => album.iconVariant === "filled"));

  return (
    <div className='collection-content'>
      <h1>Collection</h1>
      <div className="collection-container">
        {collectionAlbums.map(album => (
          <div key={album.id} className="collection-card">
            <img src={album.picture} alt={album.title} />
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <a href={album.albumLink} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
            <div className="buttons-container">
                <ActionIcon onClick={() => dispatch(removeFromCollection(album.id))} variant="filled" color="violet" size="lg" aria-label="Remove from Collection">
                  {album.iconVariant === "filled" ? <IconCheck style={{ width: rem(26), height: rem(26) }} stroke={2} /> : <IconPlus stroke={2} />}
                </ActionIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
