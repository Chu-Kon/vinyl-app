import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../store/slices/authSlice";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Title, Paper, Group, Button, Container, Anchor, Stack, Progress, Popover, Box, Dialog, rem } from "@mantine/core";
import { useTranslation } from "react-i18next";
import "./LoginPage.scss";


export default function LoginPage(props) {
  const [type, setType] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [dialogOpened, setDialogOpened] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const { t } = useTranslation("login");

  const requirements = [
    { re: /[0-9]/, label: t("login-require-2") },
    { re: /[a-z]/, label: t("login-require-3") },
    { re: /[A-Z]/, label: t("login-require-4") },
    { re: /[$&+,:;=?@#|"<>.^*()%!-]/, label: t("login-require-5") },
  ];

  function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;
  
    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
  
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }
  
  function PasswordRequirement({ meets, label }) {
    return (
      <Text
        style={{ display: "flex", alignItems: "center" }}
        c={meets ? "teal" : "red"}
        size="sm"
      >
        {meets ? (
          <IconCheck style={{ width: rem(14), height: rem(14) }} />
        ) : (
          <IconX style={{ width: rem(14), height: rem(14) }} />
        )}{" "}
        {label}
      </Text>
    );
  }


  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    }
  });
  
  const dispatch = useDispatch();

  const initialState = useSelector(state => state.auth);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/logins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.values.email,
          password: form.values.password
        }),
      });

      if (response.ok) {
        setRegisteredEmail(form.values.email); 
        setRegisteredPassword(form.values.password); 
        setDialogOpened(true);
        console.log(`User ${registeredEmail} registered successfully`);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (type === "Register") {
        await handleRegister();
      } else {
        const { email, password } = form.values;
        if (email === initialState.user.email && password === initialState.user.password) {
          dispatch(setIsAuth(true));
        } else {
          setError(t("login-error"));
          console.error("Incorrect email or password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    form.setFieldValue(fieldName, value);
    setError("");
  };


  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  if (initialState.isAuth) {
    return <Navigate to="/settings" />;
  }

  return (
    <div className="login-content">
      <Container size={420} my={40} {...props}>
        <div style={{ textAlign: "center" }}>
          <Title>{t("login-title")}</Title>
        </div>
        <Paper shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                required
                label={t("login-email")}
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => handleInputChange("email", event.currentTarget.value)}
                error={form.errors.email || error}
                radius="md"
              />

              {type === "Register" && (
                <Popover
                  opened={popoverOpened}
                  position="bottom"
                  width="target"
                  transitionProps={{ transition: "pop" }}
                >
                  <Popover.Target>
                    <Box
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        required
                        label={t("login-password")}
                        placeholder={t("login-password-placeholder-reg")}
                        value={value}
                        onChange={(event) => {
                          setValue(event.currentTarget.value);
                          handleInputChange("password", event.currentTarget.value);
                        }}
                        error={error}
                      />
                    </Box>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5}/>
                    <PasswordRequirement label={t("login-require-1")} meets={form.values.password.length > 5}/>
                    {checks}
                  </Popover.Dropdown>
                </Popover>
              )}

              {type === "Login" && (
                <PasswordInput
                  withAsterisk
                  label={t("login-password")}
                  placeholder={t("login-password-placeholder-log")}
                  value={form.values.password}
                  onChange={(event) => handleInputChange("password", event.currentTarget.value)}
                  error={error}
                />
              )}
            </Stack>
            <Group justify="space-between" mt="xl">
              <Anchor component="button" type="button" c="dimmed" onClick={() => setType(type === "Login" ? "Register" : "Login")} size="xs">
                {type === "Register"
                  ? t("login-toggle-text-log")
                  : t("login-toggle-text-reg")}
              </Anchor>
              <Button type="submit" radius="xl" color="violet" loading={loading} loaderProps={{ type: "dots" }}>
                {type === "Login" ? "Login" : "Register"}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>

      <Dialog
        withCloseButton 
        opened={dialogOpened}
        onClose={() => setDialogOpened(false)}
        size="sm"
        title={t("login-dialog-title")}
      >
        <Text size="sm" mb="xs" fw={500} c="green">
          {t("login-dialog-text")} {registeredEmail} {t("login-dialog-text-2")} 
        </Text>
      </Dialog>
    </div>
  );
}
