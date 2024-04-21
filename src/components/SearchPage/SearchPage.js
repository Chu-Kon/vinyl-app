import React, { useState, useEffect } from 'react';
import { ActionIcon, rem, Pagination, Anchor } from '@mantine/core';
import { IconHeart, IconPlus, IconCheck } from '@tabler/icons-react';
import './SearchPage.scss';

const SearchPage = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const albumsPerPage = 8;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const startIndex = (currentPage - 1) * albumsPerPage;
        const response = await fetch(`http://localhost:3000/albums?_start=${startIndex}&_limit=${albumsPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        console.log('Fetched albums:', data);
        const albumsWithState = data.map(album => ({...album, iconVariant: "default", wishlistVariant: "default"}));
        setAlbums(albumsWithState);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3000/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch total albums count');
        }
        const data = await response.json();
        setTotalAlbums(data.length);
      } catch (error) {
        console.error('Error fetching total albums count:', error);
      }
    };

    fetchTotalAlbums();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const addToCollection = (albumId) => {
    setAlbums(prevAlbums => prevAlbums.map(album => {
      if (album.id === albumId) {
        const newIconVariant = album.iconVariant === "default" ? "filled" : "default";
        const action = album.iconVariant === "default" ? "Added" : "Removed";
        console.log(`${action} album with id ${albumId} to/from collection`);
        return {...album, iconVariant: newIconVariant};
      }
      return album;
    }));
  };
  
  const addToWishlist = (albumId) => {
    setAlbums(prevAlbums => prevAlbums.map(album => {
      if (album.id === albumId) {
        const newWishlistVariant = album.wishlistVariant === "default" ? "filled" : "default";
        const action = album.wishlistVariant === "default" ? "Added" : "Removed";
        console.log(`${action} album with id ${albumId} to/from wishlist`);
        return {...album, wishlistVariant: newWishlistVariant};
      }
      return album;
    }));
  };
  

  return (
    <div>
      <h1>Albums</h1>
      <div className="albums-container">
        {albums.map(album => (
          <div key={album.id} className="album-card">
            <img src={album.picture} alt={album.title} />
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <a href={album.albumLink} target="_blank">Listen on Spotify</a>
            <div className="buttons-container">
                <ActionIcon.Group>
                    <ActionIcon onClick={() => addToCollection(album.id)} variant={album.iconVariant} size="lg" color="violet" aria-label="Add to Collection">
                        {album.iconVariant === "default" ? <IconPlus stroke={2} /> : <IconCheck stroke={2} />}
                    </ActionIcon>
                    
                    <ActionIcon onClick={() => addToWishlist(album.id)} variant={album.wishlistVariant} size="lg" color="violet" aria-label="Add to Wishlist">
                        <IconHeart style={{ width: rem(26), height: rem(26) }} stroke={2}/>
                    </ActionIcon>
                </ActionIcon.Group>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={currentPage}
        onChange={handlePageChange}
        total={Math.ceil(totalAlbums / albumsPerPage)}
        color="violet"
        withEdges
        siblings={1}
        boundaries={1}
      />
    </div>
  );
};

export default SearchPage;
