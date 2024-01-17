const fetchMessages = async (groupId, page) => {
  // console.log(messages);
  return await fetch(
    `${
      import.meta.env.VITE_SERVERURL
    }/user/fetchmessages?groupId=${groupId}&&page=${page}`,
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export default fetchMessages;
