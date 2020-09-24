import React, { useCallback, useState } from 'react'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Grid, Form, Input, TextArea, Message, Button } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'

const UPLOAD = gql`
  mutation Upload(
    $extension: String!,
    $title: String!,
    $description: String
  ) {
    createFile(input: {
      file: {
        extension: $extension,
        title: $title,
        description: $description
      }
    }) {
      file {
        id
        filename
        extension
        createdAt
      }
    }
  }
`

const getExtension = name => name.substr(name.lastIndexOf('.') + 1)

const Upload = () => {
  const [ files, setFiles ] = useState([])
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop: useCallback(files => {
      if (files.length > 1) return false

      setFiles(files)
    }, [])
  })

  const [ upload, { loading } ] = useMutation(UPLOAD)
  const history = useHistory()

  return (
    <Grid padded centered columns={3}>
      <Grid.Column>
        <Form onSubmit={async (event) => {
          const { title, description } = event.target
          const body = new FormData()

          body.append('file', files[0])

          try {
            const { data: { createFile: { file } }} = await upload({
              variables: {
                extension: getExtension(files[0].name),
                title: title.value,
                description: description.value
              }
            })

            body.append('uuid', file.filename)

            await fetch('http://localhost:5050/upload', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body
            })

            history.push(`/${file.filename}`)
          } catch (error) {
            console.log(error)
          }
        }}>
          <Form.Field>
            <label>Title</label>
            <Input name='title' placeholder='Title' size='large' fluid/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea name='description' placeholder='Description' size='large' />
          </Form.Field>
          <Form.Field>
            <label>File</label>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Message
                icon='upload'
                content={files.length === 0 ?
                  'Drop here or click to add a file' :
                  files.map(({ name }) => name).join(' ')
                }
              />
            </div>
          </Form.Field>
          <Button
            type='submit'
            size='large'
            loading={loading}
            disabled={loading}
            primary
            fluid
          >Upload</Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Upload
