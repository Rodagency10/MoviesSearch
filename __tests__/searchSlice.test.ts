import searchReducer, { setSearchTerm } from '../src/store/searchSlice';
import '@testing-library/jest-dom';

describe('search reducer', () => {
  const initialState = {
    searchTerm: '',
  };

  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      searchTerm: '',
    });
  });

  it('should handle setSearchTerm', () => {
    const actual = searchReducer(initialState, setSearchTerm('test'));
    expect(actual.searchTerm).toEqual('test');
  });
});
