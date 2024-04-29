import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Image, Tooltip } from "@mantine/core";
import { IconPlus, IconCheck, IconBrandSpotifyFilled } from "@tabler/icons-react";
import { removeFromCollection } from "../../store/slices/albumsSlice";
import { useTranslation } from "react-i18next";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collection = useSelector(state => state.albums.collection);
  const { t } = useTranslation("collection");

  const handleRemoveFromCollection = (albumId) => {
    dispatch(removeFromCollection({ albumId }));
  };

  const logAlbumsInfo = () => {
    console.log("Albums in collection array", collection.length);
    console.log("Albums details:", collection);
  };
  
  useEffect(() => {
    logAlbumsInfo();
  }, [collection]);

  return (
    <div>
      <h1>{t("collection-title")}</h1>
      {collection.length === 0 ? (
        <p>{t("collection-text")}</p>
      ) : (
        <div className="albums-container">
          {collection.map(album => (
            <div key={album.id} className="album-card">
              <Image src={album.picture} alt={album.title} />
              <div>
                <Tooltip 
                  label={album.title}
                  color="violet"
                  position="top-start" 
                  offset={0}
                  transitionProps={{ transition: "skew-up", duration: 300 }}> 
                  <h2>{album.title}</h2>
                </Tooltip>
                <p>{album.artist}</p>
              </div>
              <a href={album.albumLink} target="_blank">Listen on Spotify <IconBrandSpotifyFilled /></a>
              <div className="buttons-container">
                <ActionIcon.Group>
                  <ActionIcon 
                    onClick={() => handleRemoveFromCollection(album.id)} 
                    variant="filled"
                    size="lg" 
                    color="violet" 
                    aria-label="Remove from Collection"
                  >
                    {album.iconVariant === "default" ? <IconPlus stroke={2} /> : <IconCheck stroke={2} />}
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

export default CollectionPage;
