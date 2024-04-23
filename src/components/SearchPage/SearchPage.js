
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, rem, Drawer, Group, Button, Mark, Text, Image, TextInput, NativeSelect, Modal, Tooltip } from '@mantine/core';
import { IconHeart, IconPlus, IconCheck, IconBrandSpotifyFilled } from '@tabler/icons-react';
import { setAlbums, addToCollection, addToWishlist } from '../../store/slices/albumsSlice';
import { setCurrentPage } from '../../store/slices/currentPageSlice';
import './SearchPage.scss';

const SearchPage = () => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums);
  const currentPage = useSelector(state => state.currentPage);
  const albumsPerPage = 8;
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isNextPageEnabled, setIsNextPageEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('default');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

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
        if (data.length === 0) {
          setIsNextPageEnabled(false);
          setDrawerOpened(true);
        } else {
          setIsNextPageEnabled(true);
          setDrawerOpened(false);
          dispatch(setAlbums(data));
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchAlbums();
  }, [currentPage, dispatch]);

  const prevPage = () => {
    const newPage = currentPage - 1;
    dispatch(setCurrentPage(newPage));
    console.log('Current page:', newPage);
  };

  const nextPage = () => {
    if (isNextPageEnabled) {
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage));
      console.log('Current page:', newPage);
    }
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.currentTarget.value);
  };

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let sortedAlbums = [...filteredAlbums];

  switch (sortingOption) {
    case 'alphabetical':
      sortedAlbums = [...filteredAlbums].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'reverseAlphabetical':
      sortedAlbums = [...filteredAlbums].sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      sortedAlbums = [...filteredAlbums];
  }

  const openModal = (album) => {
    setSelectedAlbum(album);
    setModalOpened(true);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    setModalOpened(false);
  };

  return (
    <div>
      <h1>Albums</h1>
      <TextInput
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        placeholder="&#128269; Search albums..."
      />
      <NativeSelect
        className='sort-selector'
        label="Sorted by"
        value={sortingOption}
        onChange={handleSortingChange}
        data={[
          { value: 'default', label: 'Default' },
          { value: 'alphabetical', label: 'Alphabetical' },
          { value: 'reverseAlphabetical', label: 'Reverse Alphabetical' },
        ]}
      />
      <div className="albums-container">
        {sortedAlbums.map(album => (
          <div key={album.id} className="album-card">
            <Image
              src={album.picture}
              alt={album.title}
              onClick={() => openModal(album)}
              style={{ cursor: 'pointer' }}
            />
            <div onClick={() => openModal(album)} style={{ cursor: 'pointer' }}>
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
                className='add-collection-btn'
                onClick={() => dispatch(addToCollection({ albumId: album.id, iconVariant: album.iconVariant }))} 
                variant={album.iconVariant} 
                size="lg" 
                color="violet" 
                aria-label="Add to Collection">
                  {album.iconVariant === "default" ? <IconPlus stroke={2} /> : <IconCheck stroke={2} />}
                </ActionIcon>
                <ActionIcon 
                className='add-wishlist-btn'
                onClick={() => dispatch(addToWishlist({ albumId: album.id, wishlistVariant: album.wishlistVariant }))} 
                variant={album.wishlistVariant} 
                size="lg" 
                color="violet" 
                aria-label="Add to Wishlist">
                  <IconHeart style={{ width: rem(26), height: rem(26) }} stroke={2}/>
                </ActionIcon>
              </ActionIcon.Group>
            </div>
          </div>
        ))}
      </div>
      <Group className='nav-buttons'>
        <Button
          variant="outline" 
          color="violet"
          radius="sm"
          onClick={prevPage} disabled={currentPage === 1}
        >
          &#8592;Back
        </Button>
        <Button
          variant="outline" 
          color="violet"
          radius="sm"
          onClick={nextPage} disabled={!isNextPageEnabled}
        >
          Next&#8594;
        </Button>
      </Group>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        title="Oops!.."
      >
        <Text>Unfortunately,  these are all the albums available in our database at the moment.</Text>
        <Text>To return to the previous page, close this notification and <Mark color="violet">press the <b>Back</b> 2 times.</Mark></Text>
        <p></p>
        <Image
          radius="xl"
          src="https://avatars.dzeninfra.ru/get-zen_doc/50840/pub_5c863e3846ebf300b3df0246_5c863e466508fd00b373cf97/scale_1200"
        />
      </Drawer>

      <Modal
      opened={modalOpened}
      onClose={closeModal}
      title={<p className='modal-title'>{selectedAlbum ? selectedAlbum.title : ''}</p>}
      >
        {selectedAlbum && (
          <div>
            <div className='modal-image'>
              <Image src={selectedAlbum.picture} alt={selectedAlbum.title} />
            </div>
            <p><strong>Album title:</strong> <a href={selectedAlbum.albumLink} target="_blank">{selectedAlbum.title}</a></p>
            <p><strong>Artist:</strong> <a href={selectedAlbum.artistLink} target="_blank">{selectedAlbum.artist}</a></p>
            <p><strong>Release Date:</strong> {new Date(selectedAlbum.releaseDate * 1000).toLocaleDateString()}</p>
            <p><strong>Number of Tracks:</strong> {selectedAlbum.nbTracks}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchPage;