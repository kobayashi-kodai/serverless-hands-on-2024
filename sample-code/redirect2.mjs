import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDBと通信するためのクライアントを生成
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// redirect関数（DynamoDBからurlを取得）
export const handler = async (event, context) => {
  const params = {
    // DynamoDBのテーブル名を指定
    TableName: 'YOUR DDB TABLE NAME',
    Key: {
      // DynamoDBのKeyを指定
      'id': 'YOUR KEY',
    },
  };

  let redirectUrl;
  try {
    // DynamoDBのテーブルにurlというKeyを追加し、その値に任意のリダイレクト先を指定
    const result = await docClient.send(new GetCommand(params));
    redirectUrl = result.Item.url;
  } catch (e) {
    // 失敗した場合はエラーメッセージを出力してデフォルトのリダイレクト先を指定
    console.error(e, e.stack);
    redirectUrl = 'https://www.google.co.jp';
  }

  return {
    statusCode: 302,
    headers: {
      location: redirectUrl
    }
  };
}
