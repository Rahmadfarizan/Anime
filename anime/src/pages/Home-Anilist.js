import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '../graphql/Queries-Anilist'       
import { GET_ANIME_TRENDS } from '../graphql/Queries-Anilist'       
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

function HomeAnilist() {
    const [citySearched, setCitySearched] = useState('Naruto')
    const [AnimeDetail, { data, error }] = useLazyQuery(GET_ANIME_LIST, {
        variables: { page: 1, perPage: 10, search: citySearched }
    })
    const [AnimeTrend, { dataTrend, errorTrend }] = useLazyQuery(GET_ANIME_TRENDS, {
        variables: { page: 1, perPage: 11}
    })
    useEffect(() => {
        AnimeDetail();
        AnimeTrend();
    }, [AnimeDetail, AnimeTrend]);
    // if (error) return <h1> Error found</h1>
    // if (data) {
    //     console.log(data);
    // }
    if (errorTrend) return <h1> Error found</h1>
    if (dataTrend) {
        console.log(dataTrend);
    }

    return (
        <Container  class="w-75 p-3 d-flex justify-content-around" >
             {dataTrend && (
                <>
                    <ImageList 
                        variant="standard" cols={5}
                    >
                        {dataTrend.Page.media.map((anime, index) => (
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
            <InputGroup Style="padding-bottom:30px"  onChange={(event) => setCitySearched(event.target.value)}>
                <Form.Control
                    placeholder="Search Anime..."
                    aria-label="Search Anime..."
                    aria-de scribedby="basic-addon2"
                />
                <Button variant="primary" id="button-addon2" onClick={() => AnimeDetail()}>
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
        </Container>
    )
}

export default HomeAnilist