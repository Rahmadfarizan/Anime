// import Header from './components/Header';
// import { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';
// function App() {
//     const [animeList, SetAnimeList] = useState([]);
//     const [topAnime, SetTopAnime] = useState([]);
//     const [search, SetSearch] = useState("");

//     const GetTopAnime = async() => {
//         const temp = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity').then(res => res.json());
//         SetTopAnime(temp.top.slice(0,5));
//     }
//     const HandleSearch = e =>{
//         e.preventDefault();
//         FetchAnime(search);
//     }
//     const FetchAnime = async (query, order_by) => {
//         const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`).then(res => res.json()); 
//         SetAnimeList(temp.results);

//     }
//     useEffect(() => {
//         GetTopAnime();
//     }, []);

//     return (
//         <div className="App" >
//             <Header />
//             <div className='content-wrap' >
//                 <Sidebar 
//                     topAnime={topAnime} />
//                     <MainContent
//                         HandleSearch={HandleSearch}
//                         search={search}
//                         SetSearch={SetSearch}
//                         animeList={animeList}
//                     />
//             </div> 
//         </div>
//     );
// }

// export default App;

import HomeAnilist from './pages/Home-Anilist';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { useLazyQuery } from '@apollo/client';
import { GET_ANIME_DETAIL } from './graphql/Queries-Anilist'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "https://graphql.anilist.co/",
    })

    const [animeList, SetAnimeList] = useState([]);
    const [topAnime, SetTopAnime] = useState([]);
    const [search, SetSearch] = useState("");



    const GetTopAnime = async () => {
        const temp = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity').then(res => res.json());
        SetTopAnime(temp.top.slice(0, 5));
    }
    const HandleSearch = e => {
        e.preventDefault();
        FetchAnime(search);
    }
    const FetchAnime = async (query, order_by) => {
        const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`).then(res => res.json());
        //const temp = await fetch(AnimeDetail()).then(res => res.json());
        SetAnimeList(temp.results);
    }
    useEffect(() => {
        GetTopAnime();
    }, []);

    var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
      }
    }
  }
}
`;

    var variables = {
        search: "Fate/Zero",
        page: 1,
        perPage: 3
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }
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