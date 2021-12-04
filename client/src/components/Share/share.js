import { Dialog, IconButton } from "@mui/material";
import React, { useRef } from "react";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import { DialogActions } from "@mui/material";
import { TextField } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Alert } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Share = ({ url, openShareDialog, handleCloseShareDialog }) => {
  const inputRef = useRef();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCloseDialog = () => {
    setIsCopied(false);
    handleCloseShareDialog();
  };

  return (
    <Dialog open={openShareDialog} onClose={() => handleCloseDialog()} >
      <Grid container direction="row" justifyContent="space-between" >
        <Grid item>
          <DialogTitle>Share</DialogTitle>
        </Grid>
        <Grid item>
          {" "}
          <DialogActions sx={{ m: 0 }}>
            <IconButton onClick={() => handleCloseDialog()}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Grid>
      </Grid>
      {isCopied ? (
        <Alert
          sx={{ mx: 3, my: 1 }}
          iconMapping={{
            success: <CheckCircleOutline fontSize="inherit" />,
          }}
        >
          Url successfully copied!
        </Alert>
      ) : null}
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <TextField
              disabled
              ref={inputRef}
              value={url}
              id="name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            
            alignSelf="center"
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
              <Button variant="contained">Copy</Button>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Share;
