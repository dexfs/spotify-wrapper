import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStupPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStupPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('SpotifyWrapper Library', function () {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  it('should create an instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'blablabla'
    });
    expect(spotify.apiURL).to.be.equal('blablabla');
  });

  it('should use the default apiURL if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo'
    });
    expect(spotify.token).to.be.equal('foo');
  })

  describe('request method', () => {
    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({
        token:'foo'
      });

      spotify.request('url');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the right url passed', () => {
      let spotify = new SpotifyWrapper({
        token:'foo'
      });

      spotify.request('url');

      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call fetch with the right headers passed', () => {
      let spotify = new SpotifyWrapper({
        token:'foo'
      });

      const headers = {
        headers: {
          Authorization: `'Bearer foo'`,
        },
      };

      spotify.request('url');

      expect(fetchedStub).to.have.been.calledWith('url', headers);
    });


  })

});
