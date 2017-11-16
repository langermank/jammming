import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
      		searchResults : [{ name: 'album name', artist: 'artist name', album: 'album name' }],
      		playlistName: "My Playlist",
      		playlistTracks:[{ name: 'name', artist: 'artist', album: 'album' }]
    	}

    	this.addTrack = this.addTrack.bind(this);
    	this.removeTrack = this.removeTrack.bind(this);
    	this.updatePlaylistName = this.updatePlaylistName.bind(this);
    	this.savePlaylist = this.savePlaylist.bind(this);
    	this.search = this.search.bind(this);
	}

	addTrack(track) {
		if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
			this.setState(prevState => ({
				playlistTracks: [...prevState.playlistTracks, track]
			}));
		}
	}

	removeTrack(track) {
		this.setState({
			playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
		});
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

	savePlaylist() {
		const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
		Spotify.savePlaylist(this.state.playlistName, trackURIs);
		this.setState({
			playlistName: 'My Playlist',
			searchResults: [],
			playlistTracks: []
		});
	}

	search(term) {
		Spotify.search(term)
			.then(searchResults => this.setState({
				searchResults: searchResults
			}));
		//this.setState({Results: ''});
	}

	render() {
	    return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
					<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
					<Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} name={this.state.PlaylistName} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} />

					</div>
				</div>
			</div>
		)
	}
}

export default App;