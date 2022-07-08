import React from 'react'
import AnimeCard from './AnimeCard'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainContent(props) {
    return (
        <main className="mw-100" alt="Max-width 100%">
            <div className='main-head'>
                <form className='search-box'
                    onSubmit={props.HandleSearch}>
                    <input
                        type="search"
                        placeholder="Search for an anime..."
                        required
                        value={props.search}
                        onChange={e => props.SetSearch(e.target.value)} />
                </form>
            </div>
            <div className='anime-list'>
                {props.animeList.map(anime => (
                    <AnimeCard
                        anime={anime}
                        key = {anime.mal_id} />
                ))}
            </div>
        </main>

    )
}

export default MainContent