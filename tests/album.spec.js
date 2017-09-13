//getAlbum
//getAlbumTracks

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStupPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStupPromise(sinon);

import {getAlbum, getAlbums, getAlbumTracks} from "../src/album";


global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchedStub;
  let promise;


  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    //verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('08td7MxkoHQkXnWAYD8d6Q');

      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/08td7MxkoHQkXnWAYD8d6Q');

      const album2 = getAlbum('08td7MxkoHQkXnWAYD8d62');

      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/08td7MxkoHQkXnWAYD8d62');
    });

    //verifica se o dado é recebido pela promise
    it('should return the correct Data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('08td7MxkoHQkXnWAYD8d6Q');

      expect(album.resolveValue).to.be.eql({album: 'name'});
    });

  });
  describe('getAlbums', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    //verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['08td7MxkoHQkXnWAYD8d6Q', '08td7MxkoHQkXnWAYD8d61']);

      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=08td7MxkoHQkXnWAYD8d6Q,08td7MxkoHQkXnWAYD8d61');
    });

    //verifica se o dado é recebido pela promise
    it('should return the correct Data from Promise', () => {
      promise.resolves({album: 'name'});
      const albums = getAlbums(['08td7MxkoHQkXnWAYD8d6Q', '08td7MxkoHQkXnWAYD8d61']);

      expect(albums.resolveValue).to.be.eql({album: 'name'});
    });

  });
  describe('getAlbumsTracks', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    //verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct URL', () => {
      const albums = getAlbumTracks('08td7MxkoHQkXnWAYD8d6Q');

      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/08td7MxkoHQkXnWAYD8d6Q/tracks');
    });

    //verifica se o dado é recebido pela promise
    it('should return the correct Data from Promise', () => {
      promise.resolves({album: 'name'});
      const albums = getAlbumTracks('08td7MxkoHQkXnWAYD8d6Q');

      expect(albums.resolveValue).to.be.eql({album: 'name'});
    });
  });
});
