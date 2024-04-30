import React from 'react';
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation("notFound");
  return (
    <div>
      <h1>{t("not-found-title")}</h1>
      <p>{t("not-found-text")}</p>
    </div>
  );
};

export default NotFound;
