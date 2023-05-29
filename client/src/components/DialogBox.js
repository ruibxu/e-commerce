import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

const DialogBox = ({diaglogTitle, errorMessage, onClose }) => {
    return (
    <Dialog open={!!errorMessage} onClose={onClose}>
      <DialogTitle >{diaglogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    )
}
export default DialogBox
