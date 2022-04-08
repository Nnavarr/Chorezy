import React from 'react';
import coverImage from "../../assets/images/chores-image.jpg";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  imageContainer: {
    display: 'flex',
    minHeight: '600px',
    padding: '30px',
    flexDirection: 'column',
    flexGrow: 1,
  }
}))

const AdminProfile = () => {

  const classes = useStyles();
  const imageBackground = {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundImage: 'url("' + coverImage + '")',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    <div className={classes.imageContainer} style={imageBackground}> 
      <section className="w-100 mt-auto bg-secondary p-4">
        <div className="container"></div>
        {/* <img src={coverImage} className="background" style={{ width: "100%" }} alt="cover" /> */}
      </section>
    </div>
  );
};



export default AdminProfile;