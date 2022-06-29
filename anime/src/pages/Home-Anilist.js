

















import React, { useState } from 'react'
import "../css/style.css";
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME_DETAIL } from '../graphql/Queries-Anilist'
import { GET_ANIME_LIST } from '../graphql/Queries-Anilist'
function HomeAnilist() {
    const [citySearched, setCitySearched] = useState('')
    const [AnimeDetail, { loading, data, error }] = useLazyQuery(GET_ANIME_LIST, {
        variables: { page: 1, perPage: 10, search: citySearched }
    })
    if (error) return <h1> Error found</h1>
    if (data) {
        console.log(data);
    }
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (

        <div className='home'>

            <input type="text" placeholder="Anime name..." onChange={(event) => setCitySearched(event.target.value)}></input>
            <button onClick={() => AnimeDetail()}> Search</button>


                {data && (
                    <>
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