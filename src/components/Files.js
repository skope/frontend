import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import { useSubscription } from '@apollo/react-hooks'
import { Grid, Image } from 'semantic-ui-react'

const SUBSCRIBE_FILES = gql`
  subscription SubscribeAllFiles {
    listen(topic: "files") {
      query {
        allFiles(orderBy: CREATED_AT_DESC) {
          nodes {
            id
            userUuid
            filename
            extension
            title
            description
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`

const Files = () => {
  const { loading, error, data } = useSubscription(SUBSCRIBE_FILES)

  return (
    <Fragment>
      {error &&
        'ERROR'
      }
      {loading ? (
        'Loading'
      ) : (
        <Grid columns={5} padded doubling>
          {data.listen.query.allFiles.nodes.map(file =>
            <Grid.Column key={file.id}>
              <Image
                src={`http://localhost:5050/thumbnail/${file.filename}.png`}
                as={Link}
                to={`/${file.filename}`}
              />
            </Grid.Column>
          )}
        </Grid>
      )}
    </Fragment>
  )
}

export default Files
