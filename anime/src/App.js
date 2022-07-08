import HomeAnilist from './pages/Home-Anilist';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "https://graphql.anilist.co/",
    })
    const [topAnime, SetTopAnime] = useState([]);
    const GetTopAnime = async () => {
        const temp = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity').then(res => res.json());
        SetTopAnime(temp.top.slice(0, 5));
    }
    useEffect(() => {
        GetTopAnime();
    }, []);

    return (
        <ApolloProvider client={client}>
            <div className="App" >

                <Header />
                <handleData />
                <div className='content-wrap' >
                    <Sidebar
                        topAnime={topAnime} />
                <HomeAnilist />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App;