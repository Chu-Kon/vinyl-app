import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { JsonInput, TextInput, Button, Group, Code, Dialog, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setIsAuth } from "../../store/slices/authSlice";
import "./SettingsPage.scss";

export default function SettingsPage() {
  const [submittedValues, setSubmittedValues] = useState("");
  const [albumIdToDelete, setAlbumIdToDelete] = useState("");
  const [deletedAlbumId, setDeletedAlbumId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [dialogOpened, setDialogOpened] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth); 
  const { t } = useTranslation("settings");

  const login = () => {
    setIsAuth(true); 
  };
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      type: "album",
      id: "",
      title: "",
      artist: "",
      artistLink: "",
      upc: "",
      releaseDate: "",
      nbTracks: "",
      albumLink: "",
      picture: ""
    }
  });

  const generateUniqueId = () => {
    return `${Date.now()}`;
  };

  const sendDataToServer = async (data) => {
    data.id = generateUniqueId();
    try {
      const response = await fetch("http://localhost:3000/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Failed to add album");
      }
      const responseData = await response.json();
      setSubmittedValues(JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlbumById = async () => {
    try {
      const response = await fetch(`http://localhost:3000/albums/${albumIdToDelete}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete album");
      }
      setDeletedAlbumId(albumIdToDelete);
      setDialogOpened(true);
      setAlbumIdToDelete("");
      setDeleteError("");
    } catch (error) {
      console.error(error.message);
      setDeleteError(t("settings-delete-error"));
    }
  };

  return (
    <div className="settings-content">
      {!isAuth && (
        <div className="settings-message">
          <p>{t("settings-message")}</p>
        </div>
      )}
      {isAuth && ( 
        <>
      <h1>{t("settings-title")}</h1>
      <p>{t("settings-text")}</p>
      <JsonInput
        disabled
        defaultValue='{ 
          "type": "album",
          "id": "7s5gKFHMzzMHyLE2KFXNkR",
          "title": "Crying in the Club",
          "artist": "Camila Cabello",
          "artistLink": "https:/open.spotify.com/artist/4nDoRrQiYLoBzwC5BhVJzF",
          "upc": "886446504209",
          "releaseDate": "1495065600",
          "nbTracks": "1",
          "albumLink": "https:/open.spotify.com/album/7s5gKFHMzzMHyLE2KFXNkR",
          "picture": "https:/i.scdn.co/image/ab67616d00001e02cec62b81146fe4d116fbb2fa"
        }'
        label={t("settings-template")}
        placeholder="Disabled" />

      <form onSubmit={form.onSubmit((values) => sendDataToServer(values))}>
        <TextInput
          label={t("settings-input-type")}
          placeholder="album"
          defaultValue="album"
          key={form.key("album")}
          {...form.getInputProps("type")}
        />
        <TextInput
          label={t("settings-input-id")}
          placeholder={t("settings-input-id-text")}
          mt="md"
          key={form.key("id")}
          {...form.getInputProps("id")}
          disabled
        />
        <TextInput
          label={t("settings-input-title")}
          placeholder="Crying in the Club"
          defaultValue=""
          mt="md"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          label={t("settings-input-artist")}
          placeholder="Camila Cabello"
          defaultValue=""
          mt="md"
          key={form.key("artist")}
          {...form.getInputProps("artist")}
        />
        <TextInput
          label={t("settings-input-artist-link")}
          placeholder="https://open.spotify.com/artist/4nDoRrQiYLoBzwC5BhVJzF"
          defaultValue=""
          mt="md"
          key={form.key("artistLink")}
          {...form.getInputProps("artistLink")}
        />
        <TextInput
          label={t("settings-input-upc")}
          placeholder="886446504209"
          defaultValue=""
          mt="md"
          key={form.key("upc")}
          {...form.getInputProps("upc")}
        />
        <TextInput
          label={t("settings-input-release-date")}
          placeholder="1495065600"
          defaultValue=""
          mt="md"
          key={form.key("releaseDate")}
          {...form.getInputProps("releaseDate")}
        />
        <TextInput
          label={t("settings-input-tracks-numbers")}
          placeholder="10"
          defaultValue=""
          mt="md"
          key={form.key("nbTracks")}
          {...form.getInputProps("nbTracks")}
        />
        <TextInput
          label={t("settings-input-album-link")}
          placeholder="https://open.spotify.com/album/7s5gKFHMzzMHyLE2KFXNkR"
          defaultValue=""
          mt="md"
          key={form.key("albumLink")}
          {...form.getInputProps("albumLink")}
        />
        <TextInput
          label={t("settings-input-picture")}
          placeholder="https://i.scdn.co/image/ab67616d00001e02cec62b81146fe4d116fbb2fa"
          defaultValue=""
          mt="md"
          key={form.key("picture")}
          {...form.getInputProps("picture")}
        />
        <Group>
          <Button type="submit" mt="md" color="violet">{t("settings-submit-button")}</Button>
          <Button mt="md" color="violet" onClick={() => form.reset()}>{t("settings-reset-button")}</Button>
        </Group>
      </form>

      {submittedValues && (
        <div>
          <p>{t("settings-last-added-album")}</p>
          <Code block mt="md">
            {submittedValues}
          </Code>
        </div>
      )}
      
      <TextInput
        label={t("settings-delete-title")}
        placeholder={t("settings-delete-placeholder")}
        value={albumIdToDelete}
        onChange={(event) => setAlbumIdToDelete(event.target.value)}
        mt="md"
        error={deleteError}
      />
      <Button
        variant="outline"
        color="red"
        onClick={deleteAlbumById}
        mt="sm"
      >
        {t("settings-delete-button")}
      </Button>
      <Dialog
        withCloseButton 
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
        size="sm"
        title={t("settings-dialog-title")}
      >
        <Text size="sm" mb="xs" fw={500} c="green">
          {t("settings-dialog-text-1")} {deletedAlbumId} {t("settings-dialog-text-2")} 
        </Text>
      </Dialog>
      </>
      )}
    </div>
  );
}
