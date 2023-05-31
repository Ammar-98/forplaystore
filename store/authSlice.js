import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isAuth: false,
    atHome: true,
    // totalPictures: 0,
    // pictures: [],
    // picturesList: [],
    // takePhotoClicked: false,
  },
  reducers: {
    setAuth: state => {
      state.isAuth = !state.isAuth;
    },
      setAtHome: (state, action) => {
        
      state.atHome = action.payload;
    },
    // addPhoto: (state, action) => {
    //   const picture = action.payload;
    //   state.picturesList.push(picture);
    //   state.pictures.push({id: state.totalPictures, source: picture});
    //   state.pictures[pictureId]={"imagePath":picture};
    // },
    // increaseCount: state => {
    //   state.totalPictures += 1;
    // },
    // clearCount: state => {
    //   state.totalPictures = 0;
    // },
    // clearPicturesList: state => {
    //   state.picturesList = [];
    // },
    // clearPictures: state => {
    //   state.pictures = [];
    // },
    // setTakePhotoClicked: (payload, state) => {
    //   state.takePhotoClicked = payload;
    // },
  },
});
