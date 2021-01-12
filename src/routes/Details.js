import axios from 'axios';
import React, { Component } from 'react';
import { LoadButton, HeaderDetails, ActorList} from '../components';
import { API_URL, API_KEY } from '../config'


class Details extends Component{
    state = {
        loading: true,
        actors: [
            {
                name: "Julien Jojoba"
            },
            {
                name: "Tyler Durden"
            },
            {
                name: "Jean Valjean"
            },
            {
                name: "Jimmy Page"
            }
        ],
        mTitle: "Batmen",
        mDesc: "Description du fils Batman",
        imgSrc: "./images/Fast_small.jpg",
        runtime: "2h30",
        revenue: "$135151",
        status: "Released",
        vote: ""
    }

    async componentDidMount(){
        try{
            const movieId = this.props.match.params.id
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            const { 
                data : { 
                    revenue, 
                    runtime, 
                    title, 
                    overview, 
                    status, 
                    vote_average, 
                    poster_path
                }
            } = await this.loadInfos(url);

            this.setState({
                revenue: revenue,
                runtime: runtime,
                mTitle: title,
                mDesc: overview,
                status: status,
                imgSrc: poster_path,
                vote: vote_average
            }, async () => {
                const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`;
                const { data : { cast }} = await this.loadInfos(url);
                this.setState({ actors: [...cast], loading: false })
            })

        }catch(e){
            console.log('e', e)
        }
    }

    loadInfos = url => axios.get(url);

    render(){
        const{ loading, actors, mTitle, mDesc, imgSrc, runtime, revenue, status, vote} = this.state;
        return(
            <div className="app">
                {loading ? (
                    <div className="fullscreenLoad">
                        <LoadButton loading={loading}/>
                    </div>
                ) : (
                    <>
                        <HeaderDetails
                            mTitle={mTitle}
                            mDesc={mDesc}
                            imgSrc={imgSrc}
                            runtime={runtime}
                            revenue={revenue}
                            status={status}
                            vote={vote}
                        />
                        <ActorList actors={this.state.actors} />
                    </>
                )}

            </div>
        )
    }
}

export { Details }