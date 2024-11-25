import React from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Typography, CardActions, Button } from '@mui/material';



type EditProfileModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
  color: 'black'
};


const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, setOpen }) => {

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className='box-content'>
            <div className='headLines'>
              <h3> Edit  profile</h3>
              <p className='sub-comment'> Make changes to your profile here.</p>
            </div>
            <TextField className='TextField' id="outlined-basic" label="User Name" variant="outlined" />
            <TextField className='TextField' multiline={true} rows={3} id="outlined-basic" label="Description" variant="outlined" />
            <input
              accept="image/*"

              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label className='imageUploadLabel' htmlFor="raised-button-file">
              <h4 className='imageUpload'>
                image upload
              </h4>
            </label>

            <div className='footer'>
              <Button variant="contained" component="span" >
                Save Changes
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default EditProfileModal;
