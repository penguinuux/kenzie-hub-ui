import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { Close } from "@mui/icons-material";

import {
  Box,
  Button,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  DialogTitle,
  Dialog,
  TextField,
  DialogContent,
} from "@mui/material";

import * as yup from "yup";

const TechModal = ({ open, handleModal }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // api
    //   .post("/users", data)
    //   .then((response) => {
    //     console.log(response.data);
    //     history.push("/");
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleButton = () => {
    if (!errors.title && !errors.status) {
      return handleModal();
    }
  };

  return (
    <Dialog open={open} onClose={handleModal} maxWidth="sm" fullWidth="true">
      <DialogTitle sx={{ m: 0, p: 2 }}>Cadastrar Tecnologia</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleModal}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="dense"
            label="Cadastrar tecnologia"
            fullWidth
            {...register("title")}
          />
          <InputLabel id="register technology">Status:</InputLabel>
          <Select
            error={!!errors.status}
            labelId="register technology"
            label="Módulo"
            defaultValue="Iniciante"
            {...register("status")}
            sx={{ width: 140 }}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value={"Inciante"}>Iniciante</MenuItem>
            <MenuItem value={"Intermediário"}>Intermediário</MenuItem>
            <MenuItem value={"Avançado"}>Avançado</MenuItem>
          </Select>
          <Button
            type="submit"
            onClick={handleButton}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1.5, mb: 2.5 }}
          >
            Cadastrar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TechModal;