import React from "react";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";
import "./Footer.scss";

export default function Footer() {
  const { t } = useTranslation("footer");
  return (
    <footer className="footer">
        <p className="footer__copyright">&#9400;{t("footer-copyright")}</p>
        <Tooltip 
                  label={t("footer__github")}
                  color="violet"
                  position="top-start" 
                  offset={0}
                  transitionProps={{ transition: "skew-up", duration: 300 }}>
          <a className="footer__github" href="https://github.com/Chu-Kon/vinyl-app/pull/1" target="_blank"><IconBrandGithubFilled stroke={1.5} /></a>
        </Tooltip>
    </footer>
  )
}
