import {gql} from '@apollo/client'

export const GET_ENTERTAINME = gql`
  query entertainme {
    entertainme {
      movies {
        _id,
        title,
        overview,
        popularity,
        poster_path,
        tags
      }
      series {
        _id,
        title,
        overview,
        popularity,
        poster_path,
        tags
      }
    }
  }
`

export const GET_MOVIES = gql`
  query Movies{
    movies{
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query Movie ($id: String){
    movie(_id: $id){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation addMovie ($movie: AddMovie){
    addMovie (data: $movie){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie ($movie: UpdateMovie){
    updateMovie(data: $movie){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie ($id: String!){
    deleteMovie(_id: $id){
      message
    }
  }
`

export const GET_SERIES = gql`
  query Series{
    series{
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const GET_SERIE = gql`
  query Serie ($id: String){
    serie(_id: $id){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const ADD_SERIE = gql`
  mutation addSerie ($serie: AddSerie){
    addSerie (data: $serie){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const UPDATE_SERIE = gql`
  mutation updateSerie ($serie: UpdateSerie){
    updateSerie(data: $serie){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const DELETE_SERIE = gql`
  mutation deleteSerie ($id: String){
    deleteSerie(_id: $id){
      message
    }
  }
`

export const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`