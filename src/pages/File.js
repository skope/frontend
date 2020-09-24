import React, { Fragment, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Image, Segment, List, Icon } from 'semantic-ui-react'
import moment from 'moment'
import UserContext from '../contexts/UserContext'

const FILE = gql`
  query fileByFilename($filename: UUID!) {
    fileByFilename(filename: $filename) {
      id
      createdAt
      description
      extension
      filename
      title
      updatedAt
      userUuid
    }
  }
`

const File = () => {
  const { state: { data: user }} = useContext(UserContext)
  const { id: filename } = useParams()
  const {
    loading,
    error,
    data: {
      fileByFilename: {
        extension,
        title,
        description,
        createdAt,
        userUuid
      } = {}
    } = {}
  } = useQuery(FILE, {
    variables: {
      filename
    }
  })

  return (
    <Grid padded>
      <Grid.Column width={11}>
        {loading ? (
          'Loading'
        ) : (
          <Image
            src={`http://localhost:5050/${filename}.${extension}`}
            as='a'
            href={`http://localhost:5050/${filename}.${extension}`}
            centered
          />
        )}
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
          {error && 'Error'}
          {loading && !error ? (
            'Loading'
          ) : (
            <List>
              <List.Item>
                <List.Header>{title}</List.Header>
              </List.Item>
                <List.Item>
                  {description.split('\n').map((item, key) =>
                    <Fragment key={key}>{item}<br /></Fragment>
                  )}
                </List.Item>
              <List.Item>
                <List.Header>Created</List.Header>
                {moment(createdAt).local().format('MMMM Do YYYY, HH:mm')}
              </List.Item>
            </List>
          )}
        </Segment>
        {userUuid === user.uuid &&
          <Segment>
            <List selection verticalAlign='middle'>
              <List.Item>
                <Icon name='edit' size='large' color='blue' />
                <List.Content>
                  <List.Header as='a'>Edit</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name='delete' size='large' color='red' />
                <List.Content>
                  <List.Header as='a'>Delete</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        }
      </Grid.Column>
    </Grid>
  )
}

export default File
