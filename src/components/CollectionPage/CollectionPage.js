import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, rem, Image, Tooltip } from "@mantine/core";
import { IconHeart, IconPlus, IconCheck, IconBrandSpotifyFilled } from "@tabler/icons-react";
import { removeFromCollection, addToWishlist } from "../../store/slices/albumsSlice";
import { useTranslation } from "react-i18next";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collection = useSelector(state => state.albums.filter(album => album.iconVariant === "filled"));
  const { t } = useTranslation("collection");

  const handleRemoveFromCollection = (albumId) => {
    dispatch(removeFromCollection({ albumId }));
  };

  const handleAddToWishlist = (albumId, wishlistVariant) => {
    dispatch(addToWishlist({ albumId, wishlistVariant }));
  };

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
                  <ActionIcon
                    onClick={() => handleAddToWishlist(album.id, album.wishlistVariant)}
                    variant={album.wishlistVariant === "default" ? "default" : "filled"}
                    size="lg"
                    color="violet"
                    aria-label="Add to Wishlist"
                  >
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

export default CollectionPage;
