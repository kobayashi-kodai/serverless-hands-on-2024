// redirect 関数
export const handler = async (event, context) => {
  return {
    statusCode: 302,
    headers: {
      location: 'https://www.google.co.jp',
    },
  };
};