import React, {useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '../graphql/Queries-Anilist'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function HomeAnilist() {
    const [citySearched, setCitySearched] = useState('')
    const [AnimeDetail, {data, error }] = useLazyQuery(GET_ANIME_LIST, {
        variables: { page: 1, perPage: 10, search: citySearched }
    })
    if (error) return <h1> Error found</h1>
    if (data) {
        console.log(data);
    }
    return (
        <div>
            <InputGroup className="mb-3" onChange={(event) => setCitySearched(event.target.value)}>
                <Form.Control
                    placeholder="Anime name..."
                    aria-label="Anime name..."
                    aria-describedby="basic-addon2"
                />
                <Button variant="primary" id="button-addon2"  onClick={() => AnimeDetail()}>
                    Search
                </Button>
            </InputGroup>
            {data && (
                <>
                    <ImageList
                        variant="standard" cols={5}
                    >
                        {data.Page.media.map((anime, index) => (
                            <ImageListItem key={anime.coverImage.large}>
                                <img
                                    src={`${anime.coverImage.large}?w=248&fit=crop&auto=format`}
                                    srcSet={`${anime.coverImage.large}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={anime.title.native}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={anime.title.native}
                                    subtitle={<span>by: {anime.title.native}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>
            )}
        </div>
    )
}

export default HomeAnilist