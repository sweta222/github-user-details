export const changeUsername = (e) => {
  //console.log('received request');
  return {
    type: 'CHANGE',
    e: e,
  };
};
export const getUserData = (e, username) => {
  e.preventDefault();
  return async (dispatch) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      //console.log(data);
      dispatch({
        type: 'SUBMIT',
        e: e,
        data,
      });
    } catch (er) {
      console.log(er);
    }
  };
};
