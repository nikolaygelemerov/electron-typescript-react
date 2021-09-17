import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { mount, ReactWrapper } from 'enzyme';

export const MockRouter = ({
  children,
  history
}: {
  children: TChildren;
  history: MemoryHistory;
}): JSX.Element => <Router history={history}>{children}</Router>;

export const mountWithRouter = (
  component: JSX.Element,
  { history }: { history: MemoryHistory }
): ReactWrapper =>
  mount(component, {
    wrappingComponent: ({ children }) => <MockRouter history={history}>{children}</MockRouter>
  });
