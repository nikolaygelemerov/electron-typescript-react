import { shallow } from 'enzyme';

import App from '../App';

describe('<App />', () => {
  it('Mounts without errors', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toBeDefined();
  });
});
