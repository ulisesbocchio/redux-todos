import { namedStore } from '../lib/storesEnhancer';

class VisibilityFilterStore {
    initialState() {
        return {filter: 'SHOW_ALL'};
    }

    setVisibilityFilter(filter, state) {
        state.filter = filter;
    }
}

export default namedStore('visibilityFilter')(VisibilityFilterStore);
