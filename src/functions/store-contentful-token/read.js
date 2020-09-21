/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  const { token } = event.queryStringParameters
  console.dir(`Function 'read' invoked. Read id: ${token}`)
  return client
    .query(
      q.Get(
        q.Match(
          q.Index(`users_by_token`),
          token
        )
      )
    )
    .then(response => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch(error => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
