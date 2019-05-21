import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SocialLoginForm from "./socialLoginForm";
import { ValidatePassword, ValidateEmail } from "../_helpers/validator";
import ApiUsers from "../apiServices/apiUsers";
import Notifier, { openSnackbar } from "./notifier";

function FormDialog(props) {
  const msgRegister = "Registrate facilmente a través de tus redes sociales o rellená los campos con tus datos";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [source, setSource] = useState("");
  const [isSocialRegister, setIsSocialRegister] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState(msgRegister);
  const { open, onClose, onLogIn } = props;

  const api = new ApiUsers();

  const onSocialRegisterConfirm = () => {
    const socialUser = { userID, source: "facebook" };
    api.registerUserService(name, email, password, socialUser).then(() => {
      // show Message account created and redirecting to admin
      console.log("Register and Login Successful");
      onLogIn();
    });
  };

  const onSocialRegisterCallback = (
    nameParam,
    emailParam,
    userIDParam,
    sourceParam,
    pictureParam
  ) => {
    setEmail(emailParam);
    setName(nameParam);
    setUserID(userIDParam);
    setProfilePicUrl(pictureParam);
    setSource(sourceParam);
    setIsSocialRegister(true);
    const msgSocialRegister = `Hola ${nameParam}! Ingresa tu password personal para la cuenta ${emailParam}`;
    setRegistrationMessage(msgSocialRegister);
  };

  const cleanScreen = () => {
    setEmail("");
    setName("");
    setUserID("");
    setProfilePicUrl("");
    setSource("");
    setRegistrationMessage(msgRegister);
  };

  const onRegister = () => {
    if (!ValidatePassword(password, confirmPassword)) {
      openSnackbar({ message: "El password es incorrecto o no coincide", variant: "error" });
      return false;
    }
    if (isSocialRegister) {
      onSocialRegisterConfirm();
      return false;
    }
    if (!ValidateEmail(email)) {
      openSnackbar({ message: "El email ingresado es incorrecto", variant: "error" });
      return false;
    }
    if (name.length === 0) {
      openSnackbar({ message: "El nombre ingresado es incorrecto", variant: "error" });
      return false;
    }
    api
      .registerUserService(name, email, password)
      .then(() => {
        // show Message account created and redirecting to admin
        console.log("Register and Login Successful");
        onLogIn();
      })
      .catch((message) => {
        openSnackbar({ message, variant: "error" });
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          cleanScreen();
          onClose();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrarme</DialogTitle>
        <DialogContent>
          <DialogContentText>{registrationMessage}</DialogContentText>
          <SocialLoginForm onLogIn={onSocialRegisterCallback} onlyRegister />
          {!isSocialRegister ? (
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                name="name"
                label="Nombre"
                type="text"
                onChange={({ target: { value } }) => setName(value)}
                value={name}
                fullWidth
                hidden
              />
              <TextField
                required
                margin="dense"
                name="email"
                label="Email"
                type="email"
                onChange={({ target: { value } }) => setEmail(value)}
                value={email}
                fullWidth
              />
            </div>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="password"
            label="Password"
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
            value={password}
            fullWidth
          />
          <TextField
            margin="dense"
            required
            name="confirmPassword"
            label="Confirmar Password"
            onChange={({ target: { value } }) => setConfirmPassword(value)}
            type="password"
            value={confirmPassword}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onRegister} color="primary">
            Registrarme
          </Button>
        </DialogActions>
      </Dialog>
      <Notifier />
    </div>
  );
}
FormDialog.defaultProps = {
  name: ""
};
FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  name: PropTypes.string
};
export default FormDialog;
