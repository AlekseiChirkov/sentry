import {initializeOrg} from 'sentry-test/initializeOrg';
import {mountWithTheme, screen, userEvent} from 'sentry-test/reactTestingLibrary';

import DatePageFilter from 'sentry/components/datePageFilter';
import OrganizationStore from 'sentry/stores/organizationStore';
import PageFiltersStore from 'sentry/stores/pageFiltersStore';
import {OrganizationContext} from 'sentry/views/organizationContext';

describe('DatePageFilter', function () {
  const {organization, router, routerContext} = initializeOrg({
    organization: undefined,
    project: undefined,
    projects: undefined,
    router: {
      location: {query: {}},
      params: {orgId: 'org-slug'},
    },
  });
  OrganizationStore.onUpdate(organization, {replace: true});
  PageFiltersStore.onInitializeUrlState({
    projects: [],
    environments: [],
    datetime: {
      period: '7d',
      start: null,
      end: null,
      utc: null,
    },
  });

  it('can change period', function () {
    mountWithTheme(
      <OrganizationContext.Provider value={organization}>
        <DatePageFilter />
      </OrganizationContext.Provider>,
      {
        context: routerContext,
      }
    );

    expect(screen.getByText('7D')).toBeInTheDocument();
    userEvent.click(screen.getByText('7D'));

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({query: {statsPeriod: '7d'}})
    );
    expect(PageFiltersStore.getState()).toEqual({
      isReady: true,
      pinnedFilters: new Set(),
      selection: {
        datetime: {
          period: '7d',
          utc: null,
          start: null,
          end: null,
        },
        environments: [],
        projects: [],
      },
    });
  });
});