import React, { useState } from 'react'
import "../css/style.css";
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME_DETAIL } from '../graphql/Queries-Anilist'
import { GET_ANIME_LIST } from '../graphql/Queries-Anilist'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];
function HomeAnilist() {
    const [citySearched, setCitySearched] = useState('')
    const [AnimeDetail, { loading, data, error }] = useLazyQuery(GET_ANIME_LIST, {
        variables: { page: 1, perPage: 10, search: citySearched }
    })
    if (error) return <h1> Error found</h1>
    if (data) {
        console.log(data);
    }
    return (
        <div className='home'>
           
            
            <input type="text" placeholder="Anime name..." onChange={(event) => setCitySearched(event.target.value)}></input>
            <button onClick={() => AnimeDetail()}> Search</button>


            {data && (
                <>
                <ImageList >
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
                    {data.Page.media.map((anime, index) => {
                        return (

                            <>
                                <tr key={index} >
                                    <td> <img
                                        src={anime.coverImage.large} className="photo"
                                        alt="new"
                                    /></td>
                                    <td>  <div>{anime.title.native} </div></td>
                                </tr>


                            </>
                        )
                    }
                    )}
                </>
            )}

        </div>


    )
}

export default HomeAnilist