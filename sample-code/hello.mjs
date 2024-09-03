// hello 関数
export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, Serverless Hands On!',
    })
  };
};
