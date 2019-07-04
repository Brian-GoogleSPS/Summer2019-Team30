/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'css/userPage.css';
import { HIDDEN } from 'constants/css.js';
import { MESSAGE } from 'constants/links.js';
import Message from 'components/ui/Message.js';
import {
  ABOUT_ME_SERVLET,
  PROFILE_UPLOAD_SERVLET,
  PROFILE_PIC_SERVLET
} from '../../constants/links';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import samPic from 'statics/images/SamsPic2.JPG';

/** Gets the parameters from the url. Parameters are after the ? in the url. */
const urlParams = new URLSearchParams(window.location.search);
/** The email of the currently displayed user. */
const userEmailParam = urlParams.get('user');
/** Message url */
const url1 = MESSAGE + '?user=' + userEmailParam;
/** About url */
const url2 = ABOUT_ME_SERVLET + '?user=' + userEmailParam;
/**profile pic url */
const url3 = PROFILE_PIC_SERVLET + '?user=' + userEmailParam;
/** Promises */
const promises = Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
/* User-Entered Message */
var editorMessage = null;
/* User-Entered About */
var editorAbout = 'This is your about me.';
/**User-entered photo url */
var editorPhotoUrl = null;

const styles = function() {
  return {
    a: {
      marginLeft: 30,
      marginTop: 10,
      width: 100,
      height: 100,
      justify: 'center',
      marginBottom: 20
    },
    submit: {
      marginTop: 10
    },
    words: {
      fontSize: 18,
      marginLeft: 8
    },
    header: {
      fontSize: 35,
      marginTop: 30,
      fontFamily: 'PT Sans'
    }
  };
};

/**
 * @param message A message sent from a user with a timestamp.
 * @return The html representation of a contributor's intro.
 */
const createMessageUi = function(message) {
  return (
    <Message
      key={message.id}
      user={message.user}
      timestamp={message.timestamp}
      text={message.text}
    />
  );
};

const submitMessage = function() {
  fetch(MESSAGE, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'text=' + editorMessage
  });
  window.location.reload();
};

const submitAboutMe = function() {
  fetch(ABOUT_ME_SERVLET, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'text=' + editorAbout
  });
  window.location.reload();
};
/** 
const submitPic = function(url) {
  var inputFileImage = document.getElementById('image');
  if (inputFileImage !== null) {
    var file = inputFileImage.files[0];
    var data = new FormData();
    data.append('image', file);
    fetch(url, {
      method: 'POST',
      body: file
    }).then(response => {
      //window.location.reload();
    });
  }
};
*/

/** Renders the /user-page page. */
class UserPage extends Component {
  state = {
    messages: null,
    about: null,
    profPic: '',
    photoURL: null
  };

  componentDidMount() {
    promises
      .then(results => Promise.all(results.map(r => r.clone().json())))
      .then(results => {
        const [messages, about, profPic] = results;
        this.setState({ messages, about, profPic });
      });
    this.fetchUrl();
  }

  fetchUrl() {
    fetch(PROFILE_UPLOAD_SERVLET)
      .then(response => {
        return response.text();
      })
      .then(imageUploadUrl => {
        this.setState({ photoURL: imageUploadUrl });
      });
  }

  render() {
    const { messages, about, profPic, photoURL } = this.state;

    const { userEmail } = this.props.userData;
    const { classes } = this.props;

    // A boolean that checks whether the current logged in user is viewing
    // another user's page. Some controls such as the message form will hide if
    // the user is not viewing their own page.

    const hiddenIfViewingOther = userEmail !== userEmailParam ? HIDDEN : null;
    const hiddenIfHasMessages = messages > 0 ? HIDDEN : null;

    const messagesUi = messages
      ? messages.map(message => createMessageUi(message))
      : null;

    const aboutUi = about ? about.content : null;

    return (
      <div className='container' style={{ margin: 10 }}>
        <Grid container spacing={10}>
          <Grid item xs={2}>
            <Avatar
              className={classes.a}
              alt='My profile'
              src={profPic.content}
              //src='://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
            />
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.header}>{userEmailParam}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ height: 30, marginTop: 10, marginLeft: 60 }}>
            <div className={hiddenIfViewingOther}>
              <CKEditor
                editor={ClassicEditor}
                onInit={editor => {}}
                onChange={(event, editor) => {
                  editorAbout = editor.getData();
                }}
              />
              <Button
                onClick={submitAboutMe}
                className={classes.submit}
                variant='contained'
                color='primary'>
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={2}>
            <form
              className={hiddenIfViewingOther}
              encType='multipart/form-data'
              //onSubmit={submitPic(photoURL)}
              method='POST'
              action={photoURL}>
              Upload Profile Picture
              <input type='file' name='image' id='image' />
              <input type='submit' value='Submit' />
            </form>
          </Grid>
          <Grid item xs={3}>
            {aboutUi}
          </Grid>
        </Grid>
        <br />
        <div className={hiddenIfViewingOther}>
          <Typography variant='h6' className={classes.words}>
            Enter a new message:
          </Typography>
          <CKEditor
            editor={ClassicEditor}
            onInit={editor => {}}
            onChange={(event, editor) => {
              editorMessage = editor.getData();
            }}
          />
          <Button
            onClick={submitMessage}
            className={classes.submit}
            color='primary'
            variant='contained'>
            Submit
          </Button>
        </div>
        <br />
        <hr />
        <p className={hiddenIfHasMessages}>This user has no posts yet.</p>
        {messagesUi}
      </div>
    );
  }
}

UserPage.propTypes = {
  /** A json of the user data. */
  userData: PropTypes.object,
  /**required by material-ui */
  classes: PropTypes.object.isRequired
};

/** Maps user data from redux to UserPage. */
const mapStateToProps = function(state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(withStyles(styles)(UserPage));
